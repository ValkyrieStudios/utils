interface mapOptions {
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
 * @param {mapOptions?} opts - Options object to override built-in defaults
 *
 * @returns {Record<string, T>} KV-Map object
 */
function mapKey <T extends Record<string, any>> (arr:T[], key:string, opts?:mapOptions):Record<string, T> {
    if (!Array.isArray(arr) || typeof key !== 'string') return {};

    const key_s = key.trim();
    if (!key_s.length) return {};

    const len = arr.length;
    if (!len) return {};

    const MERGE:boolean = opts?.merge === true;

    const map:Record<string, T> = {};
    for (let i = 0; i < len; i++) {
        const el = arr[i];
        const el_key = el?.[key_s];
        if (el_key === undefined) continue;
        map[el_key] = MERGE && el_key in map ? {...map[el_key], ...el} : el;
    }

    return map;
}

export {mapKey, mapKey as default};
