'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function merge(target, source = {}) {
    if (Object.prototype.toString.call(target) !== '[object Object]' ||
        Object.prototype.toString.call(source) !== '[object Object]')
        throw new TypeError('Please pass a target and object to merge');
    return Object.keys(target).reduce((acc, key) => {
        if (Object.prototype.toString.call(target[key]) === '[object Object]' &&
            !Array.isArray(target[key])) {
            acc[key] = source[key] ? merge(target[key], source[key]) : target[key];
        }
        else {
            acc[key] = Object.prototype.hasOwnProperty.call(source, key)
                ? source[key]
                : target[key];
        }
        return acc;
    }, {});
}
exports.default = merge;