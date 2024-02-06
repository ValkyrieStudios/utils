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

// lib/deep/get.mjs
var get_exports = {};
__export(get_exports, {
  default: () => deepGet
});
module.exports = __toCommonJS(get_exports);
function deepGet(obj, path, get_parent = false) {
  if (Object.prototype.toString.call(obj) !== "[object Object]" && !Array.isArray(obj))
    throw new TypeError("Deepget is only supported for objects");
  if (typeof path !== "string")
    throw new TypeError("No path was given");
  const path_s = path.trim();
  if (path_s.length === 0)
    throw new TypeError("No path was given");
  const parts = path_s.replace(/\[/g, ".").replace(/(\.){2,}/g, ".").replace(/(^\.|\.$|\])/g, "").split(".");
  if (parts.length === 0 || parts.length === 1 && get_parent)
    return obj;
  if (get_parent)
    parts.pop();
  let cursor = obj;
  while (parts.length > 0) {
    if (Array.isArray(cursor)) {
      const ix = parseInt(parts.shift());
      if (!Number.isInteger(ix) || ix < 0 || ix > cursor.length - 1)
        return void 0;
      cursor = cursor[ix];
    } else if (Object.prototype.toString.call(cursor) === "[object Object]") {
      const key = parts.shift();
      if (!Object.prototype.hasOwnProperty.call(cursor, key))
        return void 0;
      cursor = cursor[key];
    }
    if (!Array.isArray(cursor) && Object.prototype.toString.call(cursor) !== "[object Object]" && parts.length > 0)
      return void 0;
  }
  return cursor;
}
