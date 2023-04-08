'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;
var _is = _interopRequireDefault(require("../function/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default(fn) {
  var resolver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  var has_resolver = (0, _is["default"])(resolver);
  var memoized = function memoized() {
    var key = has_resolver ? resolver.apply(this, arguments) : arguments[0];
    if (memoized.cache.has(key)) return memoized.cache.get(key);
    var result = fn.apply(this, arguments);
    memoized.cache.set(key, result);
    return result;
  };
  memoized.cache = new Map();
  return memoized;
}