'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;
var _is = _interopRequireDefault(require("../number/is"));
var _isInteger = _interopRequireDefault(require("../number/isInteger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default(val, ref) {
  if (!(0, _isInteger["default"])(val) || !(0, _is["default"])(ref)) return !1;
  return val < ref;
}