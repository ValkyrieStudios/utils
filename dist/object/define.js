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

// lib/object/define.mjs
var define_exports = {};
__export(define_exports, {
  default: () => define
});
module.exports = __toCommonJS(define_exports);
function define(props, obj = {}) {
  if (Object.prototype.toString.call(props) !== "[object Object]" || Object.prototype.toString.call(obj) !== "[object Object]")
    throw new TypeError("Please pass an object as the value for props and obj");
  return Object.defineProperties(obj, props);
}
