'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.isBoolean = isBoolean;
function isBoolean(val) {
    return val === !0 || val === !1 || typeof val === 'boolean' || val instanceof Boolean;
}