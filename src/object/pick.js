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
    for (const key of keys) {
        if (!isNotEmptyString(key)) continue;
        const val = deepGet(obj, key.trim());
        if (val !== undefined) deepSet(map, key.trim(), val);
    }
    return map;
}
