import {merge} from '../object/merge';

type MapOptions<T, U = T> = {
    /**
     * Allow merging existing keys or not, if not keys will be overriden if they exist
     * (default=false)
     *
     * Example:
     *  mapKey([{uid: 12, a: 'hi'}, {uid: 12, b: 'ho'}], 'uid', {merge: true})
     * Output:
     *  {12: {uid: 12, a: 'hi', b: 'ho'}}
     * Output if merge is false
     *  {12: {uid: 12, b: 'ho'}}
     */
    merge?:boolean;
    /**
     * Pass a custom filter function which will be run in O(n) while iterating
     */
    filter_fn?: (el: T) => boolean;
    /**
     * A custom transformer function to modify each element before mapping.
     * Its output type `U` becomes the value type of the resulting map.
     */
    transform_fn?: (el: T) => U;
}

/**
 * Map an object array into a Map by passing a common key that exists on the objects. Objects for
 * which the key doesn't exist will be filtered out automatically
 *
 * Example:
 *  mapKey([{uid: 12, name: 'Peter'}, {uid: 15, name: 'Jonas'}], 'uid');
 * Output:
 *  new Map([
 *    [12, {uid: 12, name: 'Peter'}],
 *    [15, {uid: 15, name: 'Jonas'}],
 *  ])
 *
 * @param {Record<string,any>[]} val - Array to map
 * @param {string} key - Key to map by
 * @param {MapOptions?} opts - Options object to override built-in defaults
 */
function mapKeyAsMap <
    T extends Record<string, any>,
    U extends Record<string, any> = T,
    TKey extends keyof T = string,
> (
    arr:T[],
    key:TKey,
    opts?:MapOptions<T, U>
):Map<T[TKey], U> {
    if (
        !Array.isArray(arr) ||
        !arr.length ||
        typeof key !== 'string' ||
        !key.length
    ) return new Map();

    /* Check options */
    const FILTER_FN = opts?.filter_fn;
    const MERGE = opts?.merge === true;
    const TRANSFORMER = opts?.transform_fn;

    const map:Map<T[TKey], U> = new Map();
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];

        /* Key check */
        const el_key = el?.[key];
        if (el_key !== undefined && (!FILTER_FN || FILTER_FN(el))) {
            const transformed: U = (TRANSFORMER ? TRANSFORMER(el) : el) as unknown as U;
            map.set(el_key, MERGE && map.has(el_key) ? merge(map.get(el_key)!, transformed, {union: true}) : transformed);
        }
    }

    return map;
}

export {mapKeyAsMap, mapKeyAsMap as default};
