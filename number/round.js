'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;

var _is = _interopRequireDefault(require("./is"));

var _isNumericalNaN = _interopRequireDefault(require("./isNumericalNaN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(val) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!(0, _is["default"])(val) || (0, _isNumericalNaN["default"])(val)) {
    throw new TypeError('Value should be numeric');
  }

  if (precision === !1 || precision < 1) {
    return Math.round(val);
  }

  var exp = Math.pow(10, Math.round(precision));
  return Math.round(val * exp) / exp;
}