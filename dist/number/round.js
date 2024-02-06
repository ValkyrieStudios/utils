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

// lib/number/round.mjs
var round_exports = {};
__export(round_exports, {
  default: () => round
});
module.exports = __toCommonJS(round_exports);
function round(val, precision = 0) {
  if (!Number.isFinite(val))
    throw new TypeError("Value should be numeric");
  const exp = Math.pow(10, Number.isInteger(precision) && precision > 0 ? precision : 0);
  const num = val * exp * (1 + Number.EPSILON);
  return Math.round(num) / exp;
}
