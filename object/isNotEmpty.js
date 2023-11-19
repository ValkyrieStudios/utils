'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isNotEmptyObject;
function isNotEmptyObject(val) {
  if (val === null || Object.prototype.toString.call(val) !== '[object Object]') return !1;
  return Object.keys(val).length !== 0;
}