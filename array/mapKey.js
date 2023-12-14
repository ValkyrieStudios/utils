'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = mapKey;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: !0 }; return { done: !1, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = !0, didErr = !1, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = !0; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function mapKey(arr, key, opts) {
  if (!Array.isArray(arr) || arr.length === 0 || typeof key !== 'string') return {};
  var key_s = key.trim();
  if (key_s.length === 0) return {};
  var OPTS = Object.assign({
    merge: !1
  }, Object.prototype.toString.call(opts) === '[object Object]' ? opts : {});
  var map = {};
  var _iterator = _createForOfIteratorHelper(arr),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var el = _step.value;
      if (Object.prototype.toString.call(el) !== '[object Object]' || !Object.prototype.hasOwnProperty.call(el, key_s)) continue;
      if (OPTS.merge === !0 && map.hasOwnProperty(el[key_s])) {
        map[el[key_s]] = Object.assign(map[el[key_s]], el);
      } else {
        map[el[key_s]] = el;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return map;
}