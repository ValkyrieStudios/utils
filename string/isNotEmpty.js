'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;

var _is = _interopRequireDefault(require("./is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(val) {
  var trimmed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
  if (!(0, _is["default"])(val)) return !1;
  return (trimmed ? val.trim() : val).length !== 0;
}