'use strict';

import deepGet from '../deep/get';
import deepSet from '../deep/set';

/**
 * Returns a new object with the keys picked from the passed object
 *
 * @param obj - Object to pick from
 * @param keys - Array of keys to pick from object
 *
 * @returns Object containing the picked keys from source object
 */
export default function pick (
    obj:{[key:string]:any},
    keys:string[]
):{[key:string]:any} {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' ||
        !Array.isArray(keys) ||
        keys.length === 0
    ) throw new TypeError('Please pass an object to pick from and a keys array');

    const map:{[key:string]:any} = {};
    let key_deep = false;
    let val;
    for (const key of keys) {
        if (typeof key !== 'string') continue;

        const sanitized = key.trim();
        if (sanitized.length === 0) continue;

        key_deep = /(\.|\[)/g.test(sanitized);
        val = key_deep
            ? deepGet(obj, sanitized)
            : obj[sanitized];
        if (val === undefined) continue;

        if (key_deep) {
            deepSet(map, sanitized, val);
        } else {
            map[sanitized] = val;
        }
    }
    return map;
}
