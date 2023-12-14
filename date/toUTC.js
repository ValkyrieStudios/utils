'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = toUTC;
var _is = _interopRequireDefault(require("./is.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function toUTC(val) {
  if (!(0, _is["default"])(val)) throw new TypeError('toUTC requires a date object');
  return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), val.getUTCSeconds(), val.getUTCMilliseconds()));
}