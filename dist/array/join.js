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

// lib/array/join.mjs
var join_exports = {};
__export(join_exports, {
  default: () => join
});
module.exports = __toCommonJS(join_exports);

// lib/number/round.mjs
function round(val, precision = 0) {
  if (!Number.isFinite(val))
    throw new TypeError("Value should be numeric");
  const exp = Math.pow(10, Number.isInteger(precision) && precision > 0 ? precision : 0);
  const num = val * exp * (1 + Number.EPSILON);
  return Math.round(num) / exp;
}

// lib/array/join.mjs
function join(arr, opts) {
  if (!Array.isArray(arr) || arr.length === 0)
    return "";
  const OPTS = Object.assign({
    delim: " ",
    //  Delimiter to join with
    trim: true,
    //  Trim after joining
    valtrim: true,
    //  Automatically trim string values
    valround: false
    //  Automatically round numbers
  }, Object.prototype.toString.call(opts) === "[object Object]" ? opts : {});
  const filtered = [];
  for (const el of arr) {
    if (typeof el === "string" && el.trim().length > 0) {
      filtered.push(OPTS.valtrim === true ? el.trim() : el);
    } else if (Number.isFinite(el)) {
      filtered.push(Number.isFinite(OPTS.valround) ? round(el, OPTS.valround) : el);
    }
  }
  return OPTS.trim === true ? filtered.join(OPTS.delim).trim() : filtered.join(OPTS.delim);
}
