import {merge} from '../object/merge';

type MapOptions<T> = {
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
    TKey extends keyof T,
> (
    arr:T[],
    key:TKey,
    opts?:MapOptions<T>
):Map<T[TKey], T> {
    if (
        !Array.isArray(arr) ||
        !arr.length ||
        typeof key !== 'string' ||
        !key.length
    ) return new Map();

    /* Check options */
    const FILTER_FN = opts?.filter_fn;
    const MERGE = opts?.merge === true;

    const map:Map<T[TKey], T> = new Map();
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];

        /* Key check */
        const el_key = el?.[key];
        if (
            el_key !== undefined &&
            (!FILTER_FN || FILTER_FN(el))
        ) map.set(el_key, MERGE && map.has(el_key) ? merge(map.get(el_key)!, el, {union: true}) : el);
    }

    return map;
}

export {mapKeyAsMap, mapKeyAsMap as default};
