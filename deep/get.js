'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = deepGet;
var _isNotEmpty = _interopRequireDefault(require("../string/isNotEmpty.js"));
var _is = require("../object/is.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function interpolatePath(path) {
  if (Array.isArray(path)) return _toConsumableArray(path);
  if ((0, _isNotEmpty["default"])(path)) return path.replace('[', '.').replace(']', '').split('.');
  throw new TypeError('No Path was given');
}
function deepGet(obj, path) {
  var get_parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
  if (Object.prototype.toString.call(obj) !== _is.PROTO_OBJ && !Array.isArray(obj)) throw new TypeError('Deepget is only supported for objects');
  var parts = interpolatePath(path);
  if (parts.length === 0 || parts.length === 1 && get_parent) return obj;
  if (get_parent) parts.pop();
  var cursor = obj;
  while (parts.length > 0) {
    cursor = Array.isArray(cursor) ? cursor[parseInt(parts.shift())] : cursor[parts.shift()];
  }
  return cursor || cursor === !1 || cursor === 0 ? cursor : undefined;
}