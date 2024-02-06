"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/date/diff.mjs
var diff_exports = {};
__export(diff_exports, {
  default: () => diff
});
module.exports = __toCommonJS(diff_exports);

// lib/date/is.mjs
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" && !isNaN(val);
}

// lib/date/diff.mjs
var SECOND_IN_MILLISECONDS = 1e3;
var MINUTE_IN_MILLISECONDS = SECOND_IN_MILLISECONDS * 60;
var HOUR_IN_MILLISECONDS = MINUTE_IN_MILLISECONDS * 60;
var DAY_IN_MILLISECONDS = HOUR_IN_MILLISECONDS * 24;
var WEEK_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 7;
function diff(val_a, val_b, key = "millisecond") {
  if (!isDate(val_a) || !isDate(val_b))
    throw new TypeError("Diff requires date objects for both values");
  if (typeof key !== "string")
    throw new TypeError("Key needs to be a string");
  const diff_in_ms = val_a.valueOf() - val_b.valueOf();
  switch (key) {
    case "week":
    case "weeks":
      return diff_in_ms / WEEK_IN_MILLISECONDS;
    case "day":
    case "days":
      return diff_in_ms / DAY_IN_MILLISECONDS;
    case "hour":
    case "hours":
      return diff_in_ms / HOUR_IN_MILLISECONDS;
    case "minute":
    case "minutes":
      return diff_in_ms / MINUTE_IN_MILLISECONDS;
    case "second":
    case "seconds":
      return diff_in_ms / SECOND_IN_MILLISECONDS;
    case "millisecond":
    case "milliseconds":
    default:
      return diff_in_ms;
  }
}
