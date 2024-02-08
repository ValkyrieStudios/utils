'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const PROTO_OBJ = '[object Object]';
function isObject(val) {
    return Object.prototype.toString.call(val) === PROTO_OBJ;
}
exports.default = isObject;
