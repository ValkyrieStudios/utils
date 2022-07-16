'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;

function _default(fn) {
  var cache = {};
  return function memoized() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var key = JSON.stringify(args);
    if (key in cache) return cache[key];
    cache[key] = fn.apply(void 0, args);
    return cache[key];
  };
}