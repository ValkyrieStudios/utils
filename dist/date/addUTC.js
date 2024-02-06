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

// lib/date/addUTC.mjs
var addUTC_exports = {};
__export(addUTC_exports, {
  default: () => addUTC
});
module.exports = __toCommonJS(addUTC_exports);

// lib/date/is.mjs
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" && !isNaN(val);
}

// lib/date/addUTC.mjs
function addUTC(val, amount = 0, key = "millisecond") {
  if (!isDate(val))
    throw new TypeError("addUTC requires a date object");
  if (!Number.isInteger(amount))
    throw new TypeError("Amount needs to be an integer");
  if (typeof key !== "string")
    throw new TypeError("Key needs to be a string with content");
  const copy = new Date(Date.UTC(
    val.getUTCFullYear(),
    val.getUTCMonth(),
    val.getUTCDate(),
    val.getUTCHours(),
    val.getUTCMinutes(),
    val.getUTCSeconds(),
    val.getUTCMilliseconds()
  ));
  switch (key) {
    case "years":
    case "year": {
      copy.setUTCFullYear(copy.getUTCFullYear() + amount);
      return copy;
    }
    case "months":
    case "month": {
      copy.setUTCMonth(copy.getUTCMonth() + amount);
      return copy;
    }
    case "days":
    case "day": {
      copy.setUTCDate(copy.getUTCDate() + amount);
      return copy;
    }
    case "hours":
    case "hour": {
      copy.setUTCHours(copy.getUTCHours() + amount);
      return copy;
    }
    case "minutes":
    case "minute": {
      copy.setUTCMinutes(copy.getUTCMinutes() + amount);
      return copy;
    }
    case "seconds":
    case "second": {
      copy.setUTCSeconds(copy.getUTCSeconds() + amount);
      return copy;
    }
    case "milliseconds":
    case "millisecond": {
      copy.setUTCMilliseconds(copy.getUTCMilliseconds() + amount);
      return copy;
    }
    default:
      return copy;
  }
}
