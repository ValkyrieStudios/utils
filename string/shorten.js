'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = shorten;
var _is = _interopRequireDefault(require("./is"));
var _isNotEmpty = _interopRequireDefault(require("./isNotEmpty"));
var _isAbove = _interopRequireDefault(require("../number/isAbove"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function shorten(val, length) {
  var postfix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';
  if (!(0, _isNotEmpty["default"])(val) || !(0, _is["default"])(postfix) || !(0, _isAbove["default"])(length, 0)) return !1;
  if (val.trim().length <= length) return val.trim();
  return "".concat(val.trim().substr(0, length)).concat(postfix);
}