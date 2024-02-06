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

// lib/deep/seal.mjs
var seal_exports = {};
__export(seal_exports, {
  default: () => deepSeal
});
module.exports = __toCommonJS(seal_exports);
function deep(obj) {
  for (const key of Object.keys(obj)) {
    if (Object.prototype.toString.call(obj[key]) === "[object Object]" || Array.isArray(obj[key]))
      deep(obj[key]);
  }
  return Object.seal(obj);
}
function deepSeal(obj) {
  if (Object.prototype.toString.call(obj) !== "[object Object]" && !Array.isArray(obj))
    throw new TypeError("Only objects/arrays can be sealed");
  return deep(obj);
}
