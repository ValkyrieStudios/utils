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

type kvMap = Record<string, Record<string, any>>;

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
 * @returns {kvMap} KV-Map object
 */
export default function mapKey (arr:Record<string,any>[], key:string, opts?:mapOptions):kvMap {
    if (
        (!Array.isArray(arr) || !arr.length) ||
        typeof key !== 'string'
    ) return {};

    const key_s = key.trim();
    if (!key_s.length) return {};

    let MERGE:boolean = false;
    if (opts && Object.prototype.toString.call(opts) === '[object Object]') {
        if (opts.merge === true) MERGE = true;
    }

    const map:kvMap = {};
    for (const el of arr) {
        if (
            Object.prototype.toString.call(el) !== '[object Object]' ||
            !Object.prototype.hasOwnProperty.call(el, key_s)
        ) continue;

        map[el[key_s]] = MERGE && map.hasOwnProperty(el[key_s]) ? {...map[el[key_s]], ...el} : el;
    }

    return map;
}
