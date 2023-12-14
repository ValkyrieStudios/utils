'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = humanizeBytes;
var _humanizeNumber = _interopRequireDefault(require("./humanizeNumber.js"));
var _isNotEmpty = _interopRequireDefault(require("../string/isNotEmpty.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function humanizeBytes(val) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var has_opts = Object.prototype.toString.call(options) === '[object Object]';
  return (0, _humanizeNumber["default"])(val, {
    delim: has_opts && typeof options.delim === 'string' ? options.delim : ',',
    separator: has_opts && typeof options.separator === 'string' && options.separator.trim().length > 0 ? options.separator : '.',
    precision: has_opts && Number.isInteger(options.precision) && options.precision >= 0 ? options.precision : 2,
    units: has_opts && Array.isArray(options.units) && options.units.length > 0 ? options.units.filter(_isNotEmpty["default"]) : [' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'],
    divider: 1024,
    real: !0
  });
}