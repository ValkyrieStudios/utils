'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;
var _is = _interopRequireDefault(require("../array/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default() {
  var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var default_to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (!(0, _is["default"])(keys)) {
    throw new TypeError('Please pass an array as value for keys');
  }
  if (!(0, _is["default"])(values) && values !== !1) {
    throw new TypeError('Please pass an array or false as value for values');
  }
  return keys.reduce(function (acc, key, index) {
    acc[key] = values ? values[index] || default_to : default_to;
    return acc;
  }, {});
}