'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;

var _is = _interopRequireDefault(require("../object/is"));

var _isNotEmpty = _interopRequireDefault(require("./isNotEmpty"));

var _is2 = _interopRequireDefault(require("../function/is"));

var _isNotEmpty2 = _interopRequireDefault(require("../string/isNotEmpty"));

var _is3 = _interopRequireDefault(require("../number/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: !0 }; return { done: !1, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = !0, didErr = !1, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = !0; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _default(arr, fn) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!(0, _isNotEmpty["default"])(arr) || !(0, _is2["default"])(fn)) return {};
  var OPTS = Object.assign({
    merge: !1
  }, (0, _is["default"])(opts) ? opts : {});
  var map = {};
  var hash = !1;

  var _iterator = _createForOfIteratorHelper(arr),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var el = _step.value;
      if (!(0, _is["default"])(el)) continue;
      hash = fn(el);
      if (!(0, _is3["default"])(hash) && !(0, _isNotEmpty2["default"])(hash)) continue;

      if (OPTS.merge === !0 && map.hasOwnProperty(hash)) {
        map[hash] = Object.assign(map[hash], el);
      } else {
        map[hash] = el;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return map;
}