'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isBelow;
var _is = _interopRequireDefault(require("../number/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function isBelow(val, ref) {
  if (!(0, _is["default"])(val) || !(0, _is["default"])(ref)) return !1;
  return val < ref;
}