'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = humanizeBytes;
var _is = _interopRequireDefault(require("../number/is"));
var _isInteger = _interopRequireDefault(require("../number/isInteger"));
var _is2 = _interopRequireDefault(require("../string/is"));
var _isNotEmpty = _interopRequireDefault(require("../string/isNotEmpty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var units = [{
  abbreviation: 'bytes'
}, {
  abbreviation: 'KB'
}, {
  abbreviation: 'MB'
}, {
  abbreviation: 'GB'
}, {
  abbreviation: 'TB'
}, {
  abbreviation: 'PB'
}, {
  abbreviation: 'EB'
}, {
  abbreviation: 'ZB'
}, {
  abbreviation: 'YB'
}];
function humanizeBytes(val) {
  if (!((0, _is["default"])(val) || (0, _isNotEmpty["default"])(val))) return '0 bytes';
  var n = parseInt((0, _is2["default"])(val) ? val.trim() : val) || 0;
  if (!(0, _isInteger["default"])(n) || n === 0) return '0 bytes';
  var sign = n < 0 ? '-' : '';
  n = Math.abs(n);
  var l = 0;
  while (n >= 1024 && ++l && l < units.length) n = n / 1024;
  return "".concat(sign).concat(n.toFixed(l > 0 ? 1 : 0), " ").concat(units[l].abbreviation);
}