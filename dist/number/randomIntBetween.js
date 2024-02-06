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

// lib/number/randomIntBetween.mjs
var randomIntBetween_exports = {};
__export(randomIntBetween_exports, {
  default: () => randomIntBetween
});
module.exports = __toCommonJS(randomIntBetween_exports);
function randomIntBetween(min = 0, max = 10) {
  if (!Number.isFinite(min) || !Number.isFinite(max))
    throw new TypeError("Min/Max should be numeric");
  return Math.floor(Math.random() * (max - min) + min);
}
