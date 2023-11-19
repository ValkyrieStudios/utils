'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = deepFreeze;
var _is = _interopRequireDefault(require("../object/is.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function deep(obj) {
  var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.seal;
  (Object.keys(obj) || []).forEach(function (key) {
    if ((0, _is["default"])(obj[key]) || Array.isArray(obj[key])) {
      deep(obj[key], next);
    }
  });
  return next(obj);
}
function deepFreeze(obj) {
  if (!(0, _is["default"])(obj) && !Array.isArray(obj)) throw new TypeError('Only objects can be frozen');
  return deep(obj, Object.freeze);
}