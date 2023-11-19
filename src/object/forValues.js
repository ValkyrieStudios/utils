'use strict';

import noopreturn   from '../function/noopreturn.js';
import isObject     from './is.js';

export default function forValues (obj = {}, next = noopreturn) {
    if (!isObject(obj)) throw new TypeError('Please pass an object to forValues');

    Object.keys(obj).forEach((key, index) => {
        obj[key] = next(key, obj[key], index);
    });
    return obj;
}
