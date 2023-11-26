'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isNotEmptyObject;
var _is = require("./is.js");
function isNotEmptyObject(val) {
  return Object.prototype.toString.call(val) === _is.PROTO_OBJ && Object.keys(val).length > 0;
}