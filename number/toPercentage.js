'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = toPercentage;
var _is = _interopRequireDefault(require("./is"));
var _round = _interopRequireDefault(require("./round"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function toPercentage(val) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  if (!(0, _is["default"])(val) || !(0, _is["default"])(min) || !(0, _is["default"])(max)) throw new TypeError('Value should be numeric');
  return (0, _round["default"])((val - min) / (max - min) * 100, precision);
}