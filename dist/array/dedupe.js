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

// lib/array/dedupe.mjs
var dedupe_exports = {};
__export(dedupe_exports, {
  default: () => dedupe
});
module.exports = __toCommonJS(dedupe_exports);

// lib/hash/fnv1A.mjs
var FNV_32 = 2166136261;
var REPL_NAN = "nan";
var REPL_TRUE = "true";
var REPL_FALSE = "false";
var REPL_UNDEF = "undefined";
var REPL_NULL = "null";
function fnv1A(data, offset = FNV_32) {
  let hash = offset;
  let sanitized;
  if (typeof data === "string") {
    sanitized = data;
  } else if (Number.isFinite(data)) {
    sanitized = `${data}`;
  } else if (Array.isArray(data) || Object.prototype.toString.call(data) === "[object Object]") {
    sanitized = JSON.stringify(data);
  } else if (Object.prototype.toString.call(data) === "[object RegExp]") {
    sanitized = data.toString();
  } else if (data instanceof Date) {
    sanitized = `${data.getTime()}`;
  } else if (Number.isNaN(data) || data === Infinity) {
    sanitized = REPL_NAN;
  } else if (data === false) {
    sanitized = REPL_FALSE;
  } else if (data === true) {
    sanitized = REPL_TRUE;
  } else if (data === null) {
    sanitized = REPL_NULL;
  } else if (data === void 0) {
    sanitized = REPL_UNDEF;
  } else {
    throw new TypeError("An FNV1A Hash could not be calculated for this datatype");
  }
  for (let i = 0; i < sanitized.length; i++) {
    hash ^= sanitized.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

// lib/array/dedupe.mjs
function dedupe(val) {
  if (!Array.isArray(val) || val.length === 0)
    return [];
  const map = /* @__PURE__ */ new Map();
  const acc = [];
  let hash;
  for (const item of val) {
    hash = fnv1A(item);
    if (map.has(hash))
      continue;
    map.set(hash, true);
    acc.push(item);
  }
  return acc;
}
