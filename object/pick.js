'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;
var _get = _interopRequireDefault(require("../deep/get"));
var _set = _interopRequireDefault(require("../deep/set"));
var _is = _interopRequireDefault(require("../array/is"));
var _is2 = _interopRequireDefault(require("./is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!(0, _is2["default"])(obj) || (0, _is["default"])(obj)) {
    throw new TypeError('Please pass an object to pick as the value for obj');
  }
  if (!(0, _is["default"])(keys)) {
    throw new TypeError('Please pass an array as the value for keys');
  }
  return keys.reduce(function (acc, key) {
    var val = (0, _get["default"])(obj, key);
    if (val !== undefined) (0, _set["default"])(acc, key, val);
    return acc;
  }, {});
}