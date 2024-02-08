'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isNotEmptyObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]' && Object.keys(val).length > 0;
}
exports.default = isNotEmptyObject;
