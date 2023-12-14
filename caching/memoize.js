'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = memoize;
function memoize(fn) {
  var resolver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  var has_resolver = typeof resolver === 'function';
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