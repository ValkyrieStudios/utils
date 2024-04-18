'use strict';

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
    if (
        (!Array.isArray(arr) || !arr.length) ||
        typeof key !== 'string'
    ) return {};

    const key_s = key.trim();
    if (!key_s.length) return {};

    const MERGE:boolean = opts && Object.prototype.toString.call(opts) === '[object Object]' && opts.merge === true;

    const map:Record<string, T> = {};
    for (const el of arr) {
        if (
            Object.prototype.toString.call(el) !== '[object Object]' ||
            !Object.prototype.hasOwnProperty.call(el, key_s)
        ) continue;

        map[el[key_s]] = MERGE && map.hasOwnProperty(el[key_s]) ? {...map[el[key_s]], ...el} : el;
    }

    return map;
}

export {mapKey, mapKey as default};
