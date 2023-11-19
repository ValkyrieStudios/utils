'use strict';

import isObject from '../object/is.js';

function deep (obj) {
    for (const key of Object.keys(obj)) {
        if (isObject(obj[key]) || Array.isArray(obj[key])) deep(obj[key]);
    }
    return Object.freeze(obj);
}

//  Freeze nested structures
export default function deepFreeze (obj) {
    if (!isObject(obj) && !Array.isArray(obj)) throw new TypeError('Only objects/arrays can be frozen');
    return deep(obj);
}
