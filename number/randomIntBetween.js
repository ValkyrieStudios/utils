'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = randomIntBetween;
var _is = _interopRequireDefault(require("./is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function randomIntBetween() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  if (!(0, _is["default"])(min) || !(0, _is["default"])(max)) throw new TypeError('Min/Max should be numeric');
  return Math.floor(Math.random() * (max - min) + min);
}