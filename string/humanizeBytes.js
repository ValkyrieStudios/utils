'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = humanizeBytes;
var _isNotEmpty = _interopRequireDefault(require("../array/isNotEmpty"));
var _isIntegerAboveOrEqual = _interopRequireDefault(require("../number/isIntegerAboveOrEqual"));
var _is = _interopRequireDefault(require("../object/is"));
var _is2 = _interopRequireDefault(require("../string/is"));
var _isNotEmpty2 = _interopRequireDefault(require("../string/isNotEmpty"));
var _humanizeNumber = _interopRequireDefault(require("./humanizeNumber"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function humanizeBytes(val) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _humanizeNumber["default"])(val, {
    delim: (0, _is["default"])(options) && (0, _is2["default"])(options.delim) ? options.delim : ',',
    separator: (0, _is["default"])(options) && (0, _isNotEmpty2["default"])(options.separator) ? options.separator : '.',
    precision: (0, _is["default"])(options) && (0, _isIntegerAboveOrEqual["default"])(options.precision, 0) ? options.precision : 2,
    units: (0, _is["default"])(options) && (0, _isNotEmpty["default"])(options.units) ? options.units.filter(_isNotEmpty2["default"]) : [' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'],
    divider: 1024,
    real: !0
  });
}