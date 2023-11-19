'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = sort;
var _is = _interopRequireDefault(require("../boolean/is.js"));
var _isNotEmpty = _interopRequireDefault(require("./isNotEmpty.js"));
var _is2 = _interopRequireDefault(require("../object/is.js"));
var _isNotEmpty2 = _interopRequireDefault(require("../object/isNotEmpty.js"));
var _isNotEmpty3 = _interopRequireDefault(require("../string/isNotEmpty.js"));
var _is3 = _interopRequireDefault(require("../function/is.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: !0 }; return { done: !1, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = !0, didErr = !1, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = !0; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function partition(arr, start_ix, end_ix) {
  var pivot_val = arr[Math.floor((start_ix + end_ix) / 2)].t;
  while (start_ix <= end_ix) {
    while (arr[start_ix].t < pivot_val) {
      start_ix++;
    }
    while (arr[end_ix].t > pivot_val) {
      end_ix--;
    }
    if (start_ix <= end_ix) {
      var temp = arr[start_ix];
      arr[start_ix] = arr[end_ix];
      arr[end_ix] = temp;
      start_ix++;
      end_ix--;
    }
  }
  return start_ix;
}
function quickSort(arr) {
  var start_ix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end_ix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : arr.length - 1;
  if (start_ix < end_ix) {
    var ix = partition(arr, start_ix, end_ix);
    quickSort(arr, start_ix, ix - 1);
    quickSort(arr, ix, end_ix);
  }
  return arr;
}
function sort(arr, by) {
  var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'asc';
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (!(0, _isNotEmpty["default"])(arr)) return [];
  if (!(0, _isNotEmpty3["default"])(by) && !(0, _is3["default"])(by)) throw new Error('Sort by should be either a string or a function');
  if (dir !== 'asc' && dir !== 'desc') throw new Error('dir should be either asc or desc');
  var OPTS = {
    filter_fn: (0, _is2["default"])(options) && (0, _is3["default"])(options.filter_fn) ? options.filter_fn : _isNotEmpty2["default"],
    nokey_hide: (0, _is2["default"])(options) && (0, _is["default"])(options.nokey_hide) ? options.nokey_hide : !1,
    nokey_atend: (0, _is2["default"])(options) && (0, _is["default"])(options.nokey_atend) ? options.nokey_atend : !0
  };
  var prepared_arr = [];
  var nokey_arr = [];
  if ((0, _isNotEmpty3["default"])(by)) {
    var _iterator = _createForOfIteratorHelper(arr),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        if (!OPTS.filter_fn(el)) continue;
        if (!el.hasOwnProperty(by) || el[by] === undefined) {
          nokey_arr.push(el);
        } else {
          prepared_arr.push({
            t: el[by],
            el: el
          });
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    var key;
    var _iterator2 = _createForOfIteratorHelper(arr),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _el = _step2.value;
        if (!OPTS.filter_fn(_el)) continue;
        key = by(_el);
        if (key === undefined) {
          nokey_arr.push(_el);
        } else {
          prepared_arr.push({
            t: by(_el),
            el: _el
          });
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  quickSort(prepared_arr);
  if (dir === 'desc') prepared_arr.reverse();
  if (OPTS.nokey_hide) {
    return prepared_arr.map(function (obj) {
      return obj.el;
    });
  } else if (OPTS.nokey_atend) {
    return [].concat(_toConsumableArray(prepared_arr.map(function (obj) {
      return obj.el;
    })), nokey_arr);
  } else {
    return [].concat(nokey_arr, _toConsumableArray(prepared_arr.map(function (obj) {
      return obj.el;
    })));
  }
}