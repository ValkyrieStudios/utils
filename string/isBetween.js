'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;

var _is = _interopRequireDefault(require("./is"));

var _is2 = _interopRequireDefault(require("../number/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(val, min, max) {
  var trimmed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
  if (!(0, _is["default"])(val)) return !1;
  if (!(0, _is2["default"])(min) || !(0, _is2["default"])(max)) return !1;
  if (min >= max) return !1;
  var length = (trimmed === !0 ? val.trim() : val).length;
  return length >= min && length <= max;
}