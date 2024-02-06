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

// lib/array/mapFn.mjs
var mapFn_exports = {};
__export(mapFn_exports, {
  default: () => mapFn
});
module.exports = __toCommonJS(mapFn_exports);
function mapFn(arr, fn, opts) {
  if (!Array.isArray(arr) || arr.length === 0 || typeof fn !== "function")
    return {};
  const OPTS = Object.assign({
    merge: false
  }, Object.prototype.toString.call(opts) === "[object Object]" ? opts : {});
  const map = {};
  let hash = false;
  for (const el of arr) {
    if (Object.prototype.toString.call(el) !== "[object Object]")
      continue;
    hash = fn(el);
    if (!Number.isFinite(hash) && !(typeof hash === "string" && hash.trim().length > 0))
      continue;
    if (OPTS.merge === true && map.hasOwnProperty(hash)) {
      map[hash] = Object.assign(map[hash], el);
    } else {
      map[hash] = el;
    }
  }
  return map;
}
