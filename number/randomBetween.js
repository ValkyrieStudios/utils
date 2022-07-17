'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;

var _is = _interopRequireDefault(require("./is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  if (!(0, _is["default"])(min)) throw new TypeError('Min should be numeric');
  if (!(0, _is["default"])(max)) throw new TypeError('Max should be numeric');
  return Math.random() * max + min;
}