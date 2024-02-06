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

// lib/array/mapPrimitive.mjs
var mapPrimitive_exports = {};
__export(mapPrimitive_exports, {
  default: () => mapPrimitive
});
module.exports = __toCommonJS(mapPrimitive_exports);
function mapPrimitive(arr, opts) {
  if (!Array.isArray(arr) || arr.length === 0)
    return {};
  const OPTS = Object.assign({
    valtrim: false,
    keyround: false,
    valround: false
  }, Object.prototype.toString.call(opts) === "[object Object]" ? opts : {});
  const map = {};
  for (const el of arr) {
    if (Number.isFinite(el)) {
      if (OPTS.keyround === true) {
        map[Math.round(el)] = OPTS.valround ? Math.round(el) : el;
      } else {
        map[el] = OPTS.valround ? Math.round(el) : el;
      }
    } else if (typeof el === "string" && el.trim().length > 0) {
      map[el.trim()] = OPTS.valtrim ? el.trim() : el;
    }
  }
  return map;
}
