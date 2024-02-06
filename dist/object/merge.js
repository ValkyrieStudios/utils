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

// lib/object/merge.mjs
var merge_exports = {};
__export(merge_exports, {
  default: () => merge_default
});
module.exports = __toCommonJS(merge_exports);
var merge = (target, source = {}) => {
  if (Object.prototype.toString.call(target) !== "[object Object]" || Object.prototype.toString.call(source) !== "[object Object]")
    throw new TypeError("Please pass a target and object to merge");
  return Object.keys(target).reduce((acc, key) => {
    if (Object.prototype.toString.call(target[key]) === "[object Object]" && !Array.isArray(target[key])) {
      acc[key] = merge(target[key], source[key] || {});
    } else {
      acc[key] = Object.prototype.hasOwnProperty.call(source, key) ? source[key] : target[key];
    }
    return acc;
  }, {});
};
var merge_default = merge;
