'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = toUTC;
function toUTC(val) {
  if (!(val instanceof Date)) throw new TypeError('toUTC requires a date object');
  return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), val.getUTCSeconds(), val.getUTCMilliseconds()));
}