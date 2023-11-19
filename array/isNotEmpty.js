'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isNotEmptyArray;
function isNotEmptyArray(val) {
  return Array.isArray(val) && val.length !== 0;
}