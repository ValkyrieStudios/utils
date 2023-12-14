'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = define;
function define(props) {
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (Object.prototype.toString.call(props) !== '[object Object]' || Object.prototype.toString.call(obj) !== '[object Object]') throw new TypeError('Please pass an object as the value for props and obj');
  return Object.defineProperties(obj, props);
}