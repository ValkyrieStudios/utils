'use strict';

import noopreturn   from '../function/noopreturn';
import isArray      from '../array/is';
import isObject     from './is';

export default function (obj = {}, next = noopreturn) {
    if (!isObject(obj) || isArray(obj)) {
        throw new TypeError('Please pass an object to forValues');
    }

    Object.keys(obj).forEach((key, index) => {
        obj[key] = next(key, obj[key], index);
    });
    return obj;
}
