'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = humanizeNumber;
var _is = _interopRequireDefault(require("../boolean/is.js"));
var _is2 = _interopRequireDefault(require("../string/is.js"));
var _isNotEmpty = _interopRequireDefault(require("../string/isNotEmpty.js"));
var _round = _interopRequireDefault(require("../number/round.js"));
var _is3 = require("../object/is.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function humanizeNumber(val) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var has_opts = Object.prototype.toString.call(options) === _is3.PROTO_OBJ;
  var OPTS = {
    delim: has_opts && (0, _is2["default"])(options.delim) ? options.delim : ',',
    separator: has_opts && (0, _isNotEmpty["default"])(options.separator) ? options.separator : '.',
    precision: has_opts && Number.isInteger(options.precision) && options.precision >= 0 ? options.precision : 2,
    units: has_opts && (Array.isArray(options.units) && options.units.length > 0 || options.units === !1) ? options.units ? options.units.filter(_is2["default"]) : !1 : ['', 'k', 'm', 'b', 't', 'q'],
    divider: has_opts && Number.isInteger(options.divider) && options.divider > 1 ? options.divider : 1000,
    real: has_opts && (0, _is["default"])(options.real) ? options.real : !1
  };
  if (!(Number.isFinite(val) || (0, _isNotEmpty["default"])(val))) {
    return "0".concat(OPTS.units.length > 0 ? OPTS.units[0] : '');
  }
  var normalized;
  if (OPTS.real) {
    normalized = parseInt((0, _is2["default"])(val) ? val.trim() : val) || 0;
  } else {
    normalized = parseFloat((0, _is2["default"])(val) ? val.trim() : val) || 0;
  }
  if (!Number.isFinite(normalized) || normalized === 0) {
    return "0".concat(OPTS.units.length > 0 ? OPTS.units[0] : '');
  }
  var sign = normalized < 0 ? '-' : '';
  normalized = Math.abs(normalized);
  var postfix = '';
  if (OPTS.units) {
    var unit_ix = 0;
    while (normalized >= OPTS.divider) {
      unit_ix++;
      normalized = normalized / OPTS.divider;
      if (unit_ix === OPTS.units.length - 1) break;
    }
    postfix = OPTS.units[unit_ix];
  }
  normalized = (0, _round["default"])(normalized, OPTS.precision);
  normalized = normalized.toLocaleString('en-US', {
    maximumFractionDigits: OPTS.precision
  }).split('.');
  normalized[0] = "".concat(normalized[0]).replace(/,/g, OPTS.delim);
  normalized = normalized.join(OPTS.separator);
  return "".concat(sign).concat(normalized).concat(postfix);
}