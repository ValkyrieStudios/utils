'use strict';

import deepGet          from '../deep/get.js';
import deepSet          from '../deep/set.js';
import isNotEmptyString from '../string/isNotEmpty.js';
import {PROTO_OBJ}      from './is.js';

export default function pick (obj, keys) {
    if (
        Object.prototype.toString.call(obj) !== PROTO_OBJ ||
        !Array.isArray(keys) ||
        keys.length === 0
    ) throw new TypeError('Please pass an object to pick from and a keys array');

    const map = {};
    let key_deep = false;
    let val;
    for (const key of keys) {
        if (!isNotEmptyString(key)) continue;
        key_deep = key.match(/(\.|\[)/g);
        val = key_deep
            ? deepGet(obj, key.trim())
            : obj[key.trim()];
        if (val === undefined) continue;

        if (key_deep) {
            deepSet(map, key.trim(), val);
        } else {
            map[key.trim()] = val;
        }
    }
    return map;
}
