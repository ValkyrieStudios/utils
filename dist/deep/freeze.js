'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function deep(obj) {
    if (Array.isArray(obj)) {
        for (const el of obj)
            deep(el);
    }
    else {
        for (const key of Object.keys(obj)) {
            if (Object.prototype.toString.call(obj[key]) === '[object Object]' ||
                Array.isArray(obj[key]))
                deep(obj[key]);
        }
    }
    return Object.freeze(obj);
}
function deepFreeze(obj) {
    if (Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj))
        throw new TypeError('Only objects/arrays can be frozen');
    return deep(obj);
}
exports.default = deepFreeze;
