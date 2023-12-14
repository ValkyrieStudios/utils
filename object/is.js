'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isObject;
var PROTO_OBJ = '[object Object]';
function isObject(val) {
  return Object.prototype.toString.call(val) === PROTO_OBJ;
}