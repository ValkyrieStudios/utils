'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isNotEmptyObject;
var _is = _interopRequireDefault(require("./is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function isNotEmptyObject(val) {
  if (!(0, _is["default"])(val)) return !1;
  return Object.keys(val).length !== 0;
}