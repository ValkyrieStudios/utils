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
        !keys.length
    ) throw new TypeError('Please pass an object to pick from and a keys array');

    const map:{[key:string]:any} = {};
    let val;
    let sanitized;
    for (const key of keys) {
        if (typeof key !== 'string') continue;

        sanitized = key.trim();
        if (!sanitized.length) continue;

        if (/(\.|\[)/g.test(sanitized)) {
            val = deepGet(obj, sanitized);
            if (val === undefined) continue;
            deepSet(map, sanitized, val);
        } else if (obj[sanitized] !== undefined) {
            map[sanitized] = obj[sanitized];
        }
    }
    return map;
}
