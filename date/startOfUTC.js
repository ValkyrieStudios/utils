'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = startOfUTC;
var _is = _interopRequireDefault(require("./is"));
var _isNotEmpty = _interopRequireDefault(require("../string/isNotEmpty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function startOfUTC(val, key) {
  if (!(0, _is["default"])(val)) throw new Error('Date To UTC requires a date object');
  if (!(0, _isNotEmpty["default"])(key)) throw new Error('Key needs to be a string with content');
  switch (key) {
    case 'year':
      return new Date(Date.UTC(val.getUTCFullYear(), 0, 1, 0, 0, 0, 0));
    case 'quarter':
      {
        var new_quarter = val.getUTCMonth() - val.getUTCMonth() % 3;
        return new Date(Date.UTC(val.getUTCFullYear(), new_quarter >= 0 ? new_quarter : 0, 1, 0, 0, 0, 0));
      }
    case 'month':
      return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), 1, 0, 0, 0, 0));
    case 'week':
      {
        var date = new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), 0, 0, 0, 0));
        var subtract = date.getUTCDay() || 7;
        if (subtract !== 1) date.setUTCDate(date.getUTCDate() - subtract + 1);
        return date;
      }
    case 'week_sun':
      {
        var _date = new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), 0, 0, 0, 0));
        var _subtract = _date.getUTCDay();
        if (_subtract !== 0) _date.setUTCDate(_date.getUTCDate() - _subtract);
        return _date;
      }
    case 'day':
      return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), 0, 0, 0, 0));
    case 'hour':
      return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), 0, 0, 0));
    case 'minute':
      return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), 0, 0));
    case 'second':
      return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), val.getUTCSeconds(), 0));
    default:
      return val;
  }
}