'use strict';

import deepGet from '../deep/get.mjs';
import deepSet from '../deep/set.mjs';

export default function pick (obj, keys) {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' ||
        !Array.isArray(keys) ||
        keys.length === 0
    ) throw new TypeError('Please pass an object to pick from and a keys array');

    const map = {};
    let key_deep = false;
    let val;
    for (const key of keys) {
        if (typeof key !== 'string') continue;

        const sanitized = key.trim();
        if (sanitized.length === 0) continue;

        key_deep = sanitized.match(/(\.|\[)/g);
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
