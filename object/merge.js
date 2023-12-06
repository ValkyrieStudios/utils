'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;
var _is = require("./is.js");
var merge = function merge(target) {
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (Object.prototype.toString.call(target) !== _is.PROTO_OBJ || Object.prototype.toString.call(source) !== _is.PROTO_OBJ) throw new TypeError('Please pass a target and object to merge');
  return Object.keys(target).reduce(function (acc, key) {
    if (Object.prototype.toString.call(target[key]) === _is.PROTO_OBJ && !Array.isArray(target[key])) {
      acc[key] = merge(target[key], source[key] || {});
    } else {
      acc[key] = Object.prototype.hasOwnProperty.call(source, key) ? source[key] : target[key];
    }
    return acc;
  }, {});
};
var _default = exports["default"] = merge;