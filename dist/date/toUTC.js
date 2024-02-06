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

// lib/date/toUTC.mjs
var toUTC_exports = {};
__export(toUTC_exports, {
  default: () => toUTC
});
module.exports = __toCommonJS(toUTC_exports);

// lib/date/is.mjs
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" && !isNaN(val);
}

// lib/date/toUTC.mjs
function toUTC(val) {
  if (!isDate(val))
    throw new TypeError("toUTC requires a date object");
  return new Date(Date.UTC(
    val.getUTCFullYear(),
    val.getUTCMonth(),
    val.getUTCDate(),
    val.getUTCHours(),
    val.getUTCMinutes(),
    val.getUTCSeconds(),
    val.getUTCMilliseconds()
  ));
}
