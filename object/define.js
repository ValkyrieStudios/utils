'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = define;
var _is = _interopRequireDefault(require("./is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function define() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!(0, _is["default"])(props) || !(0, _is["default"])(obj)) throw new TypeError('Please pass an object as the value for props and obj');
  return Object.defineProperties(obj, props);
}