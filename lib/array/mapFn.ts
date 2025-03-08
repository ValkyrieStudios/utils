import {merge} from '../object/merge';

type MapOptions = {
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
function mapFn <T extends Record<string, any>> (arr:T[], fn:MapFn<T>, opts?:MapOptions):Record<string, T> {
    if (
        (!Array.isArray(arr) || !arr.length) ||
        typeof fn !== 'function'
    ) return {};

    const MERGE = opts?.merge === true;

    const map:Record<string, T> = {};
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (Object.prototype.toString.call(el) !== '[object Object]') continue;

        /* Get hash */
        let hash = fn(el);
        if (
            Number.isFinite(hash) ||
            (typeof hash === 'string' && hash.length)
        ) {
            /* Normalize hash to string */
            hash = hash + '';
            map[hash] = MERGE && hash in map ? merge(map[hash], el, {union: true}) : el;
        }
    }

    return map;
}

export {mapFn, mapFn as default};
