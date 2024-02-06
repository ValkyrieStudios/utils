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

// lib/string/humanizeNumber.mjs
var humanizeNumber_exports = {};
__export(humanizeNumber_exports, {
  default: () => humanizeNumber
});
module.exports = __toCommonJS(humanizeNumber_exports);

// lib/boolean/is.mjs
function isBoolean(val) {
  return val === true || val === false;
}

// lib/string/is.mjs
function isString(val) {
  return typeof val === "string";
}

// lib/number/round.mjs
function round(val, precision = 0) {
  if (!Number.isFinite(val))
    throw new TypeError("Value should be numeric");
  const exp = Math.pow(10, Number.isInteger(precision) && precision > 0 ? precision : 0);
  const num = val * exp * (1 + Number.EPSILON);
  return Math.round(num) / exp;
}

// lib/string/humanizeNumber.mjs
function humanizeNumber(val, options = {}) {
  const has_opts = Object.prototype.toString.call(options) === "[object Object]";
  const OPTS = {
    delim: has_opts && typeof options.delim === "string" ? options.delim : ",",
    separator: has_opts && typeof options.separator === "string" && options.separator.trim().length > 0 ? options.separator : ".",
    precision: has_opts && Number.isInteger(options.precision) && options.precision >= 0 ? options.precision : 2,
    units: has_opts && (Array.isArray(options.units) && options.units.length > 0 || options.units === false) ? options.units ? options.units.filter(isString) : false : ["", "k", "m", "b", "t", "q"],
    //  Have to have at least bigger than 1 to not end in infinite loop
    divider: has_opts && Number.isInteger(options.divider) && options.divider > 1 ? options.divider : 1e3,
    //  Should we auto parse as integer (true) or not (false)
    real: has_opts && isBoolean(options.real) ? options.real : false
  };
  if (!Number.isFinite(val) && typeof val !== "string") {
    return `0${OPTS.units.length > 0 ? OPTS.units[0] : ""}`;
  }
  let normalized;
  if (OPTS.real) {
    normalized = parseInt(typeof val === "string" ? val.trim() : val) || 0;
  } else {
    normalized = parseFloat(typeof val === "string" ? val.trim() : val) || 0;
  }
  if (!Number.isFinite(normalized) || normalized === 0) {
    return `0${OPTS.units.length > 0 ? OPTS.units[0] : ""}`;
  }
  const sign = normalized < 0 ? "-" : "";
  normalized = Math.abs(normalized);
  let postfix = "";
  if (OPTS.units) {
    let unit_ix = 0;
    while (normalized >= OPTS.divider) {
      unit_ix++;
      normalized = normalized / OPTS.divider;
      if (unit_ix === OPTS.units.length - 1)
        break;
    }
    postfix = OPTS.units[unit_ix];
  }
  normalized = round(normalized, OPTS.precision);
  normalized = `${normalized}`.split(".");
  normalized[0] = normalized[0].split("").reverse().map((char, ix, original) => {
    if (ix > 0 && ix < original.length && ix % 3 === 0)
      return char + OPTS.delim;
    return char;
  }).reverse().join("");
  normalized = normalized.join(OPTS.separator);
  return `${sign}${normalized}${postfix}`;
}
