'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = endOfUTC;
var _is = _interopRequireDefault(require("./is"));
var _isNotEmpty = _interopRequireDefault(require("../string/isNotEmpty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function endOfUTC(val, key) {
  if (!(0, _is["default"])(val)) throw new Error('Date To UTC requires a date object');
  if (!(0, _isNotEmpty["default"])(key)) throw new Error('Key needs to be a string with content');
  switch (key) {
    case 'year':
      return new Date(Date.UTC(val.getUTCFullYear(), 11, 31, 23, 59, 59, 999));
    case 'quarter':
      {
        var new_quarter = val.getUTCMonth() - val.getUTCMonth() % 3;
        return new Date(Date.UTC(val.getUTCFullYear(), new_quarter >= 0 ? new_quarter + 3 : 3, 0, 23, 59, 59, 999));
      }
    case 'month':
      return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth() + 1, 0, 23, 59, 59, 999));
    case 'week':
      {
        var date = new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), 23, 59, 59, 999));
        var day = date.getUTCDay();
        if (day !== 0) date.setUTCDate(date.getUTCDate() + (7 - day));
        return date;
      }
    case 'week_sun':
      {
        var _date = new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), 23, 59, 59, 999));
        var _day = _date.getUTCDay();
        if (_day !== 6) _date.setUTCDate(_date.getUTCDate() + (6 - _day));
        return _date;
      }
    case 'day':
      return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), 23, 59, 59, 999));
    case 'hour':
      return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), 59, 59, 999));
    case 'minute':
      return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), 59, 999));
    case 'second':
      return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), val.getUTCSeconds(), 999));
    default:
      return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), val.getUTCSeconds(), val.getUTCMilliseconds()));
  }
}