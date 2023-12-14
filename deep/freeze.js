'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = deepFreeze;
function deep(obj) {
  for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (Object.prototype.toString.call(obj[key]) === '[object Object]' || Array.isArray(obj[key])) deep(obj[key]);
  }
  return Object.freeze(obj);
}
function deepFreeze(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]' && !Array.isArray(obj)) throw new TypeError('Only objects/arrays can be frozen');
  return deep(obj);
}