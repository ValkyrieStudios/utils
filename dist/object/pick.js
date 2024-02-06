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

// lib/object/pick.mjs
var pick_exports = {};
__export(pick_exports, {
  default: () => pick
});
module.exports = __toCommonJS(pick_exports);

// lib/deep/get.mjs
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

// lib/deep/set.mjs
function deepSet(obj, path, value = null, define = false) {
  if (Object.prototype.toString.call(obj) !== "[object Object]" && !Array.isArray(obj))
    throw new TypeError("Deepset is only supported for objects");
  if (typeof path !== "string")
    throw new TypeError("No path was given");
  const path_s = path.trim();
  if (path_s.length === 0)
    throw new TypeError("No path was given");
  if (/(^|\.){0,}(__proto__|constructor|prototype)(\.|\[|$){1,}/.test(path_s))
    throw new Error("Malicious path provided");
  const parts = path_s.replace(/\[/g, ".").replace(/(\.){2,}/g, ".").replace(/(^\.|\.$|\])/g, "").split(".");
  for (let i = 0; i < parts.length - 1; i++) {
    if (parts[i] === "")
      continue;
    if (!obj[parts[i]])
      obj[parts[i]] = {};
    obj = obj[parts[i]];
  }
  if (!Array.isArray(obj) && Object.prototype.toString.call(obj) !== "[object Object]")
    return false;
  if (define) {
    Object.defineProperty(obj, parts[parts.length - 1], value);
  } else {
    obj[parts[parts.length - 1]] = value;
  }
  return true;
}

// lib/object/pick.mjs
function pick(obj, keys) {
  if (Object.prototype.toString.call(obj) !== "[object Object]" || !Array.isArray(keys) || keys.length === 0)
    throw new TypeError("Please pass an object to pick from and a keys array");
  const map = {};
  let key_deep = false;
  let val;
  for (const key of keys) {
    if (typeof key !== "string")
      continue;
    const sanitized = key.trim();
    if (sanitized.length === 0)
      continue;
    key_deep = sanitized.match(/(\.|\[)/g);
    val = key_deep ? deepGet(obj, sanitized) : obj[sanitized];
    if (val === void 0)
      continue;
    if (key_deep) {
      deepSet(map, sanitized, val);
    } else {
      map[sanitized] = val;
    }
  }
  return map;
}
