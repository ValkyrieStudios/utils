'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.isFormData = isFormData;
function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
}