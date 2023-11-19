'use strict';

import isObject from '../object/is.js';

function deep (obj, next = Object.seal) {
    (Object.keys(obj) || []).forEach(key => {
        if (isObject(obj[key]) || Array.isArray(obj[key])) {
            deep(obj[key], next);
        }
    });
    return next(obj);
}

//  Freeze nested structures
export default function deepSeal (obj) {
    if (!isObject(obj) && !Array.isArray(obj)) throw new TypeError('Only objects can be sealed');
    return deep(obj, Object.seal);
}
