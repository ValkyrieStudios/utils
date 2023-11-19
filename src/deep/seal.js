'use strict';

import isObject from '../object/is.js';

function deep (obj) {
    for (const key of Object.keys(obj)) {
        if (isObject(obj[key]) || Array.isArray(obj[key])) deep(obj[key]);
    }
    return Object.seal(obj);
}

//  Seal nested structures
export default function deepSeal (obj) {
    if (!isObject(obj) && !Array.isArray(obj)) throw new TypeError('Only objects/arrays can be sealed');
    return deep(obj);
}
