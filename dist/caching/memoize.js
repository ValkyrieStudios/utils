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

// lib/caching/memoize.mjs
var memoize_exports = {};
__export(memoize_exports, {
  default: () => memoize
});
module.exports = __toCommonJS(memoize_exports);
function memoize(fn, resolver = false) {
  const has_resolver = typeof resolver === "function";
  const memoized = function() {
    const key = has_resolver ? resolver.apply(this, arguments) : arguments[0];
    if (memoized.cache.has(key))
      return memoized.cache.get(key);
    const result = fn.apply(this, arguments);
    memoized.cache.set(key, result);
    return result;
  };
  memoized.cache = /* @__PURE__ */ new Map();
  return memoized;
}
