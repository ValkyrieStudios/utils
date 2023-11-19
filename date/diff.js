'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = diff;
var _is = _interopRequireDefault(require("./is.js"));
var _isNotEmpty = _interopRequireDefault(require("../string/isNotEmpty.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SECOND_IN_MILLISECONDS = 1000;
var MINUTE_IN_MILLISECONDS = SECOND_IN_MILLISECONDS * 60;
var HOUR_IN_MILLISECONDS = MINUTE_IN_MILLISECONDS * 60;
var DAY_IN_MILLISECONDS = HOUR_IN_MILLISECONDS * 24;
var WEEK_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 7;
function diff(val_a, val_b) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
  if (!(0, _is["default"])(val_a) || !(0, _is["default"])(val_b)) throw new Error('Diff requires date objects for both values');
  if (key !== !1 && !(0, _isNotEmpty["default"])(key)) throw new Error('Key needs to be a string or false');
  var diff_in_ms = val_a.valueOf() - val_b.valueOf();
  switch (key) {
    case 'week':
    case 'weeks':
      return diff_in_ms / WEEK_IN_MILLISECONDS;
    case 'day':
    case 'days':
      return diff_in_ms / DAY_IN_MILLISECONDS;
    case 'hour':
    case 'hours':
      return diff_in_ms / HOUR_IN_MILLISECONDS;
    case 'minute':
    case 'minutes':
      return diff_in_ms / MINUTE_IN_MILLISECONDS;
    case 'second':
    case 'seconds':
      return diff_in_ms / SECOND_IN_MILLISECONDS;
    case 'millisecond':
    case 'milliseconds':
    default:
      return diff_in_ms;
  }
}