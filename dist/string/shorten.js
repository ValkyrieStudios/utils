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

// lib/string/shorten.mjs
var shorten_exports = {};
__export(shorten_exports, {
  default: () => shorten
});
module.exports = __toCommonJS(shorten_exports);
function shorten(val, length, postfix = "...") {
  if (typeof val !== "string")
    return "";
  if (typeof postfix !== "string" || !Number.isFinite(length) || length <= 0)
    return val;
  const sanitized = val.trim();
  return sanitized.length <= length ? sanitized : `${sanitized.substr(0, length)}${postfix}`;
}
