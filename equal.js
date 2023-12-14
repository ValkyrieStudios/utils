'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;
var _isNumericalNaN = _interopRequireDefault(require("./number/isNumericalNaN.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function isArrayEqual(a, b) {
  if (a.length !== b.length) return !1;
  for (var i = a.length - 1; i >= 0; i--) {
    if (equal(a[i], b[i])) continue;
    return !1;
  }
  return !0;
}
function isObjectEqual(a, b) {
  var keys_a = Object.keys(a);
  if (keys_a.length !== Object.keys(b).length) return !1;
  for (var i = keys_a.length - 1; i >= 0; i--) {
    if (equal(a[keys_a[i]], b[keys_a[i]])) continue;
    return !1;
  }
  return !0;
}
function equal(a, b) {
  if (a instanceof Date && b instanceof Date) return a.valueOf() === b.valueOf();
  if (Object.prototype.toString.call(a) === '[object RegExp]' && Object.prototype.toString.call(b) === '[object RegExp]') return String(a) === String(b);
  if (Array.isArray(a) && Array.isArray(b)) return isArrayEqual(a, b);
  if (Object.prototype.toString.call(a) === '[object Object]' && Object.prototype.toString.call(b) === '[object Object]') return isObjectEqual(a, b);
  if ((0, _isNumericalNaN["default"])(a)) {
    return (0, _isNumericalNaN["default"])(b);
  }
  return a === b;
}
var _default = exports["default"] = equal;