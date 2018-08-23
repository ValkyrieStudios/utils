'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.isString = isString;
function isString(val) {
    return typeof val === 'string' || val instanceof String;
}