'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = fnv1A;
var _is = _interopRequireDefault(require("../string/is.js"));
var _is2 = _interopRequireDefault(require("../date/is.js"));
var _is3 = _interopRequireDefault(require("../object/is.js"));
var _isNumericalNaN = _interopRequireDefault(require("../number/isNumericalNaN.js"));
var _is4 = _interopRequireDefault(require("../regexp/is.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var FNV_32 = 2166136261;
var REPL_NAN = 'nan';
var REPL_TRUE = 'true';
var REPL_FALSE = 'false';
var REPL_UNDEF = 'undefined';
var REPL_NULL = 'null';
function fnv1A(data) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FNV_32;
  var hash = offset;
  var sanitized;
  if ((0, _is["default"])(data)) {
    sanitized = data;
  } else if (Number.isFinite(data)) {
    sanitized = "".concat(data);
  } else if (Array.isArray(data) || (0, _is3["default"])(data)) {
    sanitized = JSON.stringify(data);
  } else if ((0, _is4["default"])(data)) {
    sanitized = data.toString();
  } else if ((0, _is2["default"])(data)) {
    sanitized = "".concat(data.getTime());
  } else if ((0, _isNumericalNaN["default"])(data)) {
    sanitized = REPL_NAN;
  } else if (data === !1) {
    sanitized = REPL_FALSE;
  } else if (data === !0) {
    sanitized = REPL_TRUE;
  } else if (data === null) {
    sanitized = REPL_NULL;
  } else if (data === undefined) {
    sanitized = REPL_UNDEF;
  } else {
    throw new TypeError('An FNV1A Hash could not be calculated for this datatype');
  }
  for (var i = 0; i < sanitized.length; i++) {
    hash ^= sanitized.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}