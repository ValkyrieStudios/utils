'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const isNumericalNaN_1 = require("./number/isNumericalNaN");
function isArrayEqual(a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = a.length - 1; i >= 0; i--) {
        if (equal(a[i], b[i]))
            continue;
        return false;
    }
    return true;
}
function isObjectEqual(a, b) {
    const keys_a = Object.keys(a);
    if (keys_a.length !== Object.keys(b).length)
        return false;
    for (let i = keys_a.length - 1; i >= 0; i--) {
        if (equal(a[keys_a[i]], b[keys_a[i]]))
            continue;
        return false;
    }
    return true;
}
function equal(a, b) {
    if (a instanceof Date &&
        b instanceof Date)
        return a.valueOf() === b.valueOf();
    if (Object.prototype.toString.call(a) === '[object RegExp]' &&
        Object.prototype.toString.call(b) === '[object RegExp]')
        return String(a) === String(b);
    if (Array.isArray(a) &&
        Array.isArray(b))
        return isArrayEqual(a, b);
    if (Object.prototype.toString.call(a) === '[object Object]' &&
        Object.prototype.toString.call(b) === '[object Object]')
        return isObjectEqual(a, b);
    if ((0, isNumericalNaN_1.default)(a)) {
        return (0, isNumericalNaN_1.default)(b);
    }
    return a === b;
}
exports.default = equal;
