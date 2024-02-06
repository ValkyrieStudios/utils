'use strict';

function deep (obj) {
    for (const key of Object.keys(obj)) {
        if (
            Object.prototype.toString.call(obj[key]) === '[object Object]' ||
            Array.isArray(obj[key])
        ) deep(obj[key]);
    }
    return Object.freeze(obj);
}

//  Freeze nested structures
export default function deepFreeze (obj) {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj)
    ) throw new TypeError('Only objects/arrays can be frozen');
    return deep(obj);
}
