'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = deepGet;
var _isNotEmpty = _interopRequireDefault(require("../string/isNotEmpty.js"));
var _is = require("../object/is.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function deepGet(obj, path) {
  var get_parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
  if (Object.prototype.toString.call(obj) !== _is.PROTO_OBJ && !Array.isArray(obj)) throw new TypeError('Deepget is only supported for objects');
  if (!(0, _isNotEmpty["default"])(path)) throw new TypeError('No path was given');
  var parts = path.replace(/\[/g, '.').replace(/(\.){2,}/g, '.').replace(/(^\.|\.$|\])/g, '').split('.');
  if (parts.length === 0 || parts.length === 1 && get_parent) return obj;
  if (get_parent) parts.pop();
  var cursor = obj;
  while (parts.length > 0) {
    if (Array.isArray(cursor)) {
      var ix = parseInt(parts.shift());
      if (!Number.isInteger(ix) || ix < 0 || ix > cursor.length - 1) return undefined;
      cursor = cursor[ix];
    } else if (Object.prototype.toString.call(cursor) === _is.PROTO_OBJ) {
      var key = parts.shift();
      if (!cursor.hasOwnProperty(key)) return undefined;
      cursor = cursor[key];
    }
    if (!Array.isArray(cursor) && Object.prototype.toString.call(cursor) !== _is.PROTO_OBJ && parts.length > 0) return undefined;
  }
  return cursor;
}