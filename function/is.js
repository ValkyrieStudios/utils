'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isFunction;
function isFunction(val) {
  return !!(val && val.constructor && val.call && val.apply);
}