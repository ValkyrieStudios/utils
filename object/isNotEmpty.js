'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isNotEmptyObject;
function isNotEmptyObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]' && Object.keys(val).length > 0;
}