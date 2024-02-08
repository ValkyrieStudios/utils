'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isRegExp(val) {
    return Object.prototype.toString.call(val) === '[object RegExp]';
}
exports.default = isRegExp;
