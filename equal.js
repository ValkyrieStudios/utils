'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;

var _is = _interopRequireDefault(require("./object/is"));

var _is2 = _interopRequireDefault(require("./array/is"));

var _isNumericalNaN = _interopRequireDefault(require("./number/isNumericalNaN"));

var _is3 = _interopRequireDefault(require("./regexp/is"));

var _is4 = _interopRequireDefault(require("./date/is"));

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
  if ((0, _is4["default"])(a) && (0, _is4["default"])(b)) {
    return a.valueOf() === b.valueOf();
  }

  if ((0, _is3["default"])(a) || (0, _is3["default"])(b)) {
    return String(a) === String(b);
  }

  if ((0, _is2["default"])(a) && (0, _is2["default"])(b)) {
    return isArrayEqual(a, b);
  }

  if ((0, _is["default"])(a) && (0, _is["default"])(b)) {
    return isObjectEqual(a, b);
  }

  if ((0, _isNumericalNaN["default"])(a)) {
    return (0, _isNumericalNaN["default"])(b);
  }

  return a === b;
}

var _default = equal;
exports["default"] = _default;