'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = deepDefine;
var _set = _interopRequireDefault(require("./set"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function deepDefine(obj, path) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return (0, _set["default"])(obj, path, value, !0);
}