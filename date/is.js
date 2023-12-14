'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isDate;
function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val);
}