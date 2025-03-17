import {merge} from '../object/merge';

type MapOptions<T, U = T> = {
    /**
     * Allow merging existing keys or not, if not keys will be overriden if they exist
     * (default=false)
     *
     * Example:
     *  mapFn([{uid: 12, a: 'hi'}, {uid: 12, b: 'ho'}], el => el.uid, {merge: true})
     * Output:
     *  {12: {uid: 12, a: 'hi', b: 'ho'}}
     * Output if merge is false
     *  {12: {uid: 12, b: 'ho'}}
     */
    merge?:boolean;
    /**
     * A custom transform function that is applied to each element before mapping.
     * Its output type `U` becomes the value type of the resulting map.
     */
    transform_fn?: (el: T) => U;
}

type MapFn<T extends Record<string, any>>= (entry:T) => (string|number|boolean);

/**
 * Map an object array into a kv-object through a function that generates a key. Returning a non-string,
 * non-numeric value from the function (eg: false) will filter out the object.
 *
 * Example:
 *  mapFn([{uid: 12, name: 'Peter'}, {uid: 15, name: 'Jonas'}], el => el.uid);
 * Output:
 *  {12: {uid: 12, name: 'Peter'}, 15: {uid: 15, name: 'Jonas'}}
 *
 * @param {Record<string, any>[]} val - Array to map
 * @param {MapFn} fn - Handler function which is run for each of the objects and should return a string or number
 * @param {MapOptions?} opts - Options object to override built-in defaults
 */
function mapFn<T extends Record<string, any>, U extends Record<string, any> = T> (
    arr:T[],
    fn:MapFn<T>,
    opts?:MapOptions<T, U>
):Record<string, U> {
    if (
        (!Array.isArray(arr) || !arr.length) ||
        typeof fn !== 'function'
    ) return {};

    const MERGE = opts?.merge === true;
    const TRANSFORM_FN = opts?.transform_fn;

    const map:Record<string, U> = {};
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (Object.prototype.toString.call(el) !== '[object Object]') continue;

        /* Get hash */
        let hash = fn(el);
        if (Number.isFinite(hash) || (typeof hash === 'string' && hash.length)) {
            hash = hash + '';
            const transformed: U = TRANSFORM_FN ? TRANSFORM_FN(el) : (el as unknown as U);
            map[hash] = MERGE && hash in map ? merge(map[hash], transformed, {union: true}) : transformed;
        }
    }

    return map;
}

export {mapFn, mapFn as default};
