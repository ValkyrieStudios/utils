'use strict';

import noopreturn   from '../function/noopreturn';
import isArray      from '../array/is';
import isObject     from './is';

export default function (obj = {}, cb = noopreturn) {
    if (!isObject(obj) || isArray(obj)) {
        throw new TypeError('Please pass an object to forValues');
    }

    Object.keys(obj).forEach((key, index) => {
        obj[key] = cb(key, obj[key], index);
    });
    return obj;
}
