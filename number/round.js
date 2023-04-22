'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = round;
var _is = _interopRequireDefault(require("./is"));
var _isIntegerAbove = _interopRequireDefault(require("./isIntegerAbove"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function round(val) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!(0, _is["default"])(val)) throw new TypeError('Value should be numeric');
  if (!(0, _isIntegerAbove["default"])(precision, 0)) return Math.round(val);
  return Number(Math.round(val + 'e' + precision) + 'e-' + precision);
}