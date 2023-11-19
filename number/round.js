'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = round;
var _isIntegerAbove = _interopRequireDefault(require("./isIntegerAbove.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function round(val) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!Number.isFinite(val)) throw new TypeError('Value should be numeric');
  var exp = Math.pow(10, (0, _isIntegerAbove["default"])(precision, 0) ? precision : 0);
  var num = val * exp * (1 + Number.EPSILON);
  return Math.round(num) / exp;
}