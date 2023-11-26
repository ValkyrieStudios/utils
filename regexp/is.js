'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports.PROTO_RGX = void 0;
exports["default"] = isRegExp;
var PROTO_RGX = exports.PROTO_RGX = '[object RegExp]';
function isRegExp(val) {
  return Object.prototype.toString.call(val) === PROTO_RGX;
}