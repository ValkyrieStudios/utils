'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.isRegExp = isRegExp;
function isRegExp(val) {
    return Object.prototype.toString.call(val) === '[object RegExp]';
}