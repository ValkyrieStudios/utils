'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = toUnix;
var _is = _interopRequireDefault(require("./is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function toUnix(val) {
  if (!(0, _is["default"])(val)) throw new Error('toUnix requires a date object');
  return Math.floor(val.valueOf() / 1000);
}