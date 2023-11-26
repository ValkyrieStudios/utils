'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = deepSeal;
var _is = require("../object/is.js");
function deep(obj) {
  for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (Object.prototype.toString.call(obj[key]) === _is.PROTO_OBJ || Array.isArray(obj[key])) deep(obj[key]);
  }
  return Object.seal(obj);
}
function deepSeal(obj) {
  if (Object.prototype.toString.call(obj) !== _is.PROTO_OBJ && !Array.isArray(obj)) throw new TypeError('Only objects/arrays can be sealed');
  return deep(obj);
}