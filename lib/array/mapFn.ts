interface mapOptions {
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

type mapFn<T extends Record<string, any>>= (entry:T) => (string|number|boolean);

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
 * @param {mapFn} fn - Handler function which is run for each of the objects and should return a string or number
 * @param {mapOptions?} opts - Options object to override built-in defaults
 *
 * @returns {Record<string, T>} KV-Map object
 */
function mapFn <T extends Record<string, any>> (arr:T[], fn:mapFn<T>, opts?:mapOptions):Record<string, T> {
    if (
        (!Array.isArray(arr) || !arr.length) ||
        typeof fn !== 'function'
    ) return {};

    const MERGE:boolean = opts && Object.prototype.toString.call(opts) === '[object Object]' && opts.merge === true;

    const map:Record<string, T> = {};
    let hash:(string|number|boolean) = false;
    for (const el of arr) {
        if (Object.prototype.toString.call(el) !== '[object Object]') continue;

        /* Get hash */
        hash = fn(el);
        if (!Number.isFinite(hash) && !(typeof hash === 'string' && hash.trim().length)) continue;

        /* Normalize hash to string */
        hash = `${hash}`;

        map[hash] = MERGE && map.hasOwnProperty(hash) ? {...map[hash], ...el} : el;
    }

    return map;
}

export {mapFn, mapFn as default};
