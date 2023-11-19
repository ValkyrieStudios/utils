'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = defineFrozen;
var _define = _interopRequireDefault(require("./define.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function defineFrozen() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.freeze((0, _define["default"])(props, obj));
}