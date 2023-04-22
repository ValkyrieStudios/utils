'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isIntegerBetween;
var _is = _interopRequireDefault(require("../number/is"));
var _isInteger = _interopRequireDefault(require("../number/isInteger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function isIntegerBetween(val, min, max) {
  if (!(0, _isInteger["default"])(val) || !(0, _is["default"])(min) || !(0, _is["default"])(max) || min >= max) return !1;
  return val >= min && val <= max;
}