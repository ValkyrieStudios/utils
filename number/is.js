'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;
var _isNumericalNaN = _interopRequireDefault(require("./isNumericalNaN"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default(val) {
  if ((0, _isNumericalNaN["default"])(val)) return !1;
  return typeof val === 'number' || val instanceof Number;
}