'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isInteger;
var _is = _interopRequireDefault(require("./is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function isInteger(val) {
  if (!(0, _is["default"])(val)) return !1;
  return Number.isInteger(val);
}