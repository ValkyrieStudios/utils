'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = deepSeal;
var _is = _interopRequireDefault(require("../object/is"));
var _is2 = _interopRequireDefault(require("../array/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function deep(obj) {
  var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.seal;
  (Object.keys(obj) || []).forEach(function (key) {
    if ((0, _is["default"])(obj[key]) || (0, _is2["default"])(obj[key])) {
      deep(obj[key], next);
    }
  });
  return next(obj);
}
function deepSeal(obj) {
  if (!(0, _is["default"])(obj) && !(0, _is2["default"])(obj)) throw new TypeError('Only objects can be sealed');
  return deep(obj, Object.seal);
}