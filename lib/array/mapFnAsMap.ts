import {merge} from '../object/merge';

type MapOptions = {
    /**
     * Allow merging existing keys or not, if not keys will be overriden if they exist
     * (default=false)
     *
     * Example:
     *  mapFnAsMap([{uid: 12, a: 'hi'}, {uid: 12, b: 'ho'}], el => el.uid, {merge: true})
     * Output:
     *  {12: {uid: 12, a: 'hi', b: 'ho'}}
     * Output if merge is false
     *  {12: {uid: 12, b: 'ho'}}
     */
    merge?:boolean;
}

type MapFn<T extends Record<string, any>>= (entry:T) => string|number|null;

/**
 * Map an object array into a Map through a function that generates a key. Returning a non-string,
 * non-numeric value from the function (eg: null) will filter out the object.
 *
 * Example:
 *  mapFnAsMap([{uid: 12, name: 'Peter'}, {uid: 15, name: 'Jonas'}], el => el.uid);
 * Output:
 *  new Map([
 *    [12, {uid: 12, name: 'Peter'}],
 *    [15, {uid: 15, name: 'Jonas'}],
 *  ])
 *
 * @param {Record<string, any>[]} val - Array to map
 * @param {MapFn} fn - Handler function which is run for each of the objects and should return a string or number
 * @param {MapOptions?} opts - Options object to override built-in defaults
 */
function mapFnAsMap <
    T extends Record<string, any>,
    TFN extends MapFn<T>
> (arr:T[], fn:TFN, opts?:MapOptions):Map<NonNullable<ReturnType<TFN>>, T> {
    if (
        (!Array.isArray(arr) || !arr.length) ||
        typeof fn !== 'function'
    ) return new Map();

    const MERGE = opts?.merge === true;

    const map:Map<NonNullable<ReturnType<TFN>>, T> = new Map();
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (Object.prototype.toString.call(el) !== '[object Object]') continue;

        /* Get hash */
        const hash = fn(el) as NonNullable<ReturnType<TFN>>;
        if (
            Number.isFinite(hash) ||
            (typeof hash === 'string' && hash.trim().length)
        ) map.set(hash, MERGE && map.has(hash) ? merge(map.get(hash)!, el, {union: true}) : el);
    }

    return map;
}

export {mapFnAsMap, mapFnAsMap as default};
