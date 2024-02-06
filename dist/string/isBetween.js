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

// lib/string/isBetween.mjs
var isBetween_exports = {};
__export(isBetween_exports, {
  default: () => isStringBetween
});
module.exports = __toCommonJS(isBetween_exports);
function isStringBetween(val, min, max, trimmed = true) {
  if (typeof val !== "string" || !Number.isFinite(min) || min < 0 || !Number.isFinite(max) || max < 0 || min >= max)
    return false;
  const length = (trimmed === true ? val.trim() : val).length;
  return length >= min && length <= max;
}
