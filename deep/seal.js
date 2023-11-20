'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = deepSeal;
var _is = _interopRequireDefault(require("../object/is.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function deep(obj) {
  for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if ((0, _is["default"])(obj[key]) || Array.isArray(obj[key])) deep(obj[key]);
  }
  return Object.seal(obj);
}
function deepSeal(obj) {
  if (!(0, _is["default"])(obj) && !Array.isArray(obj)) throw new TypeError('Only objects/arrays can be sealed');
  return deep(obj);
}