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

// lib/array/mapKey.mjs
var mapKey_exports = {};
__export(mapKey_exports, {
  default: () => mapKey
});
module.exports = __toCommonJS(mapKey_exports);
function mapKey(arr, key, opts) {
  if (!Array.isArray(arr) || arr.length === 0 || typeof key !== "string")
    return {};
  const key_s = key.trim();
  if (key_s.length === 0)
    return {};
  const OPTS = Object.assign({
    merge: false
  }, Object.prototype.toString.call(opts) === "[object Object]" ? opts : {});
  const map = {};
  for (const el of arr) {
    if (Object.prototype.toString.call(el) !== "[object Object]" || !Object.prototype.hasOwnProperty.call(el, key_s))
      continue;
    if (OPTS.merge === true && map.hasOwnProperty(el[key_s])) {
      map[el[key_s]] = Object.assign(map[el[key_s]], el);
    } else {
      map[el[key_s]] = el;
    }
  }
  return map;
}
