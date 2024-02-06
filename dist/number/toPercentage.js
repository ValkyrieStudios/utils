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

// lib/number/toPercentage.mjs
var toPercentage_exports = {};
__export(toPercentage_exports, {
  default: () => toPercentage
});
module.exports = __toCommonJS(toPercentage_exports);

// lib/number/round.mjs
function round(val, precision = 0) {
  if (!Number.isFinite(val))
    throw new TypeError("Value should be numeric");
  const exp = Math.pow(10, Number.isInteger(precision) && precision > 0 ? precision : 0);
  const num = val * exp * (1 + Number.EPSILON);
  return Math.round(num) / exp;
}

// lib/number/toPercentage.mjs
function toPercentage(val, precision = 0, min = 0, max = 1) {
  if (!Number.isFinite(val) || !Number.isFinite(min) || !Number.isFinite(max))
    throw new TypeError("value/min/max should be numeric");
  return round((val - min) / (max - min) * 100, precision);
}
