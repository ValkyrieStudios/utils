'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = pick;
var _get = _interopRequireDefault(require("../deep/get.js"));
var _set = _interopRequireDefault(require("../deep/set.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: !0 }; return { done: !1, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = !0, didErr = !1, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = !0; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function pick(obj, keys) {
  if (Object.prototype.toString.call(obj) !== '[object Object]' || !Array.isArray(keys) || keys.length === 0) throw new TypeError('Please pass an object to pick from and a keys array');
  var map = {};
  var key_deep = !1;
  var val;
  var _iterator = _createForOfIteratorHelper(keys),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      if (typeof key !== 'string') continue;
      var sanitized = key.trim();
      if (sanitized.length === 0) continue;
      key_deep = sanitized.match(/(\.|\[)/g);
      val = key_deep ? (0, _get["default"])(obj, sanitized) : obj[sanitized];
      if (val === undefined) continue;
      if (key_deep) {
        (0, _set["default"])(map, sanitized, val);
      } else {
        map[sanitized] = val;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return map;
}