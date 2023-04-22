'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isObject;
function isObject(val) {
  return val !== null && Object.prototype.toString.call(val) === '[object Object]';
}