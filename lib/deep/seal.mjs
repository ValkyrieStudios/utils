'use strict';

function deep (obj) {
    for (const key of Object.keys(obj)) {
        if (
            Object.prototype.toString.call(obj[key]) === '[object Object]' ||
            Array.isArray(obj[key])
        ) deep(obj[key]);
    }
    return Object.seal(obj);
}

//  Seal nested structures
export default function deepSeal (obj) {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj)
    ) throw new TypeError('Only objects/arrays can be sealed');
    return deep(obj);
}
