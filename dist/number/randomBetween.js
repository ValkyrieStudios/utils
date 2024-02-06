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

// lib/number/randomBetween.mjs
var randomBetween_exports = {};
__export(randomBetween_exports, {
  default: () => randomBetween
});
module.exports = __toCommonJS(randomBetween_exports);
function randomBetween(min = 0, max = 10) {
  if (!Number.isFinite(min) || !Number.isFinite(max))
    throw new TypeError("Min/Max should be numeric");
  return Math.random() * (max - min) + min;
}
