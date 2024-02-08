'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isNotEmptyArray(val) {
    return Array.isArray(val) && val.length !== 0;
}
exports.default = isNotEmptyArray;
