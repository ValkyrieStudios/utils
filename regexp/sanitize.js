'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = sanitizeRegExp;
var _isNotEmpty = _interopRequireDefault(require("../string/isNotEmpty.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function sanitizeRegExp(val) {
  if (!(0, _isNotEmpty["default"])(val)) return !1;
  return val.trim().replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}