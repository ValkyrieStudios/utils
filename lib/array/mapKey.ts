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
 * Map an object array into a kv-object by passing a common key that exists on the objects. Objects for
 * which the key doesn't exist will be filtered out automatically
 *
 * Example:
 *  mapKey([{uid: 12, name: 'Peter'}, {uid: 15, name: 'Jonas'}], 'uid');
 * Output:
 *  {12: {uid: 12, name: 'Peter'}, 15: {uid: 15, name: 'Jonas'}}
 *
 * @param {Record<string,any>[]} val - Array to map
 * @param {string} key - Key to map by
 * @param {MapOptions?} opts - Options object to override built-in defaults
 */
function mapKey <
    T extends Record<string, any>,
    TKey extends keyof T,
> (
    arr:T[],
    key:TKey,
    opts?:MapOptions<T>
):Record<string, T> {
    if (
        !Array.isArray(arr) ||
        !arr.length ||
        typeof key !== 'string' ||
        !key.length
    ) return {};

    /* Check options */
    const FILTER_FN = opts?.filter_fn;
    const MERGE = opts?.merge === true;

    const map:Record<string, T> = {};
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];

        /* Key check */
        const el_key = el?.[key];
        if (
            el_key !== undefined &&
            (!FILTER_FN || FILTER_FN(el))
        ) map[el_key] = (MERGE && el_key in map ? merge(map[el_key], el, {union: true}) : el) as T;
    }

    return map;
}

export {mapKey, mapKey as default};
