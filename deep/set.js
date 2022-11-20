'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;
var _is = _interopRequireDefault(require("../object/is"));
var _is2 = _interopRequireDefault(require("../array/is"));
var _isNotEmpty = _interopRequireDefault(require("../string/isNotEmpty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function interpolatePath(path) {
  if (!(0, _isNotEmpty["default"])(path) && !(0, _is2["default"])(path)) throw new TypeError('No Path was given');
  if ((0, _is2["default"])(path)) return _toConsumableArray(path);
  return path.replace('[', '.').replace(']', '').split('.');
}

function _default(obj, path) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var define = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
  if (!(0, _is["default"])(obj) && !(0, _is2["default"])(obj)) throw new TypeError('Deepset is only supported for objects');
  var parts = interpolatePath(path);

  for (var i = 0; i < parts.length - 1; i++) {
    if (parts[i] === '') continue;
    if (!obj[parts[i]]) obj[parts[i]] = {};

    obj = obj[parts[i]];

    if (!(0, _is2["default"])(obj)) continue;

    if (i < parts.length - 2) {
      obj = obj[parts[i + 1]];
      i++;
    }
  }

  if (define) {
    Object.defineProperty(obj, parts[parts.length - 1], value);
  } else {
    obj[parts[parts.length - 1]] = value;
  }
  return !0;
}