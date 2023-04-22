'use strict';

import deepGet          from '../deep/get';
import deepSet          from '../deep/set';
import isArray          from '../array/is';
import isNotEmptyString from '../string/isNotEmpty';
import isObject         from './is';

export default function pick (obj = {}, keys = []) {
    if (!isObject(obj)) throw new TypeError('Please pass an object to pick as the value for obj');
    if (!isArray(keys)) throw new TypeError('Please pass an array as the value for keys');

    const map = {};
    for (const key of keys) {
        if (!isNotEmptyString(key)) continue;
        const val = deepGet(obj, key.trim());
        if (val !== undefined) deepSet(map, key.trim(), val);
    }
    return map;
}
