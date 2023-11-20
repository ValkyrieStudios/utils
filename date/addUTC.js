'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = addUTC;
var _isNotEmpty = _interopRequireDefault(require("../string/isNotEmpty.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function addUTC(val, amount, key) {
  if (!(val instanceof Date)) throw new TypeError('addUTC requires a date object');
  if (!Number.isInteger(amount)) throw new TypeError('Amount needs to be an integer');
  if (!(0, _isNotEmpty["default"])(key)) throw new TypeError('Key needs to be a string with content');
  var copy = new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), val.getUTCSeconds(), val.getUTCMilliseconds()));
  switch (key) {
    case 'years':
    case 'year':
      {
        copy.setUTCFullYear(copy.getUTCFullYear() + amount);
        return copy;
      }
    case 'months':
    case 'month':
      {
        copy.setUTCMonth(copy.getUTCMonth() + amount);
        return copy;
      }
    case 'days':
    case 'day':
      {
        copy.setUTCDate(copy.getUTCDate() + amount);
        return copy;
      }
    case 'hours':
    case 'hour':
      {
        copy.setUTCHours(copy.getUTCHours() + amount);
        return copy;
      }
    case 'minutes':
    case 'minute':
      {
        copy.setUTCMinutes(copy.getUTCMinutes() + amount);
        return copy;
      }
    case 'seconds':
    case 'second':
      {
        copy.setUTCSeconds(copy.getUTCSeconds() + amount);
        return copy;
      }
    case 'milliseconds':
    case 'millisecond':
      {
        copy.setUTCMilliseconds(copy.getUTCMilliseconds() + amount);
        return copy;
      }
    default:
      return copy;
  }
}