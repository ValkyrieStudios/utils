'use strict';

import deepGet  from '../deep/get';
import deepSet  from '../deep/set';
import isArray  from '../array/is';
import isObject from './is';

export default function pick (obj = {}, keys = []) {
    if (!isObject(obj)) throw new TypeError('Please pass an object to pick as the value for obj');
    if (!isArray(keys)) throw new TypeError('Please pass an array as the value for keys');

    return keys.reduce((acc, key) => {
        const val = deepGet(obj, key);
        if (val !== undefined) deepSet(acc, key, val);
        return acc;
    }, {});
}
