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

// lib/deep/define.mjs
var define_exports = {};
__export(define_exports, {
  default: () => deepDefine
});
module.exports = __toCommonJS(define_exports);

// lib/deep/set.mjs
function deepSet(obj, path, value = null, define = false) {
  if (Object.prototype.toString.call(obj) !== "[object Object]" && !Array.isArray(obj))
    throw new TypeError("Deepset is only supported for objects");
  if (typeof path !== "string")
    throw new TypeError("No path was given");
  const path_s = path.trim();
  if (path_s.length === 0)
    throw new TypeError("No path was given");
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

// lib/deep/define.mjs
function deepDefine(obj, path, value = null) {
  return deepSet(obj, path, value, true);
}
