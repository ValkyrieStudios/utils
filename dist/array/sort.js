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

// lib/array/sort.mjs
var sort_exports = {};
__export(sort_exports, {
  default: () => sort
});
module.exports = __toCommonJS(sort_exports);

// lib/boolean/is.mjs
function isBoolean(val) {
  return val === true || val === false;
}

// lib/object/isNotEmpty.mjs
function isNotEmptyObject(val) {
  return Object.prototype.toString.call(val) === "[object Object]" && Object.keys(val).length > 0;
}

// lib/array/sort.mjs
function partition(arr, start_ix, end_ix) {
  const pivot_val = arr[Math.floor((start_ix + end_ix) / 2)].t;
  while (start_ix <= end_ix) {
    while (arr[start_ix].t < pivot_val) {
      start_ix++;
    }
    while (arr[end_ix].t > pivot_val) {
      end_ix--;
    }
    if (start_ix <= end_ix) {
      const temp = arr[start_ix];
      arr[start_ix] = arr[end_ix];
      arr[end_ix] = temp;
      start_ix++;
      end_ix--;
    }
  }
  return start_ix;
}
function quickSort(arr, start_ix = 0, end_ix = arr.length - 1) {
  if (start_ix < end_ix) {
    const ix = partition(arr, start_ix, end_ix);
    quickSort(arr, start_ix, ix - 1);
    quickSort(arr, ix, end_ix);
  }
  return arr;
}
function sort(arr, by, dir = "asc", options = {}) {
  if (!Array.isArray(arr) || arr.length === 0)
    return [];
  if (dir !== "asc" && dir !== "desc")
    throw new Error("Direction should be either asc or desc");
  const has_opts = Object.prototype.toString.call(options) === "[object Object]";
  const OPTS = {
    filter_fn: has_opts && typeof options.filter_fn === "function" ? (el) => isNotEmptyObject(el) && options.filter_fn(el) : isNotEmptyObject,
    nokey_hide: has_opts && isBoolean(options.nokey_hide) ? options.nokey_hide : false,
    nokey_atend: has_opts && isBoolean(options.nokey_atend) ? options.nokey_atend : true
  };
  const prepared_arr = [];
  const nokey_arr = [];
  if (typeof by === "string") {
    const by_s = by.trim();
    if (by_s.length === 0)
      throw new Error("Sort by should either be a string with content or a function");
    for (const el of arr) {
      if (!OPTS.filter_fn(el))
        continue;
      if (!Object.prototype.hasOwnProperty.call(el, by_s) || el[by_s] === void 0) {
        nokey_arr.push(el);
      } else {
        prepared_arr.push({ t: el[by_s], el });
      }
    }
  } else if (typeof by === "function") {
    let key;
    for (const el of arr) {
      if (!OPTS.filter_fn(el))
        continue;
      key = by(el);
      if (key === void 0) {
        nokey_arr.push(el);
      } else {
        prepared_arr.push({ t: by(el), el });
      }
    }
  } else {
    throw new Error("Sort by should either be a string with content or a function");
  }
  quickSort(prepared_arr);
  if (dir === "desc")
    prepared_arr.reverse();
  if (OPTS.nokey_hide) {
    return prepared_arr.map((obj) => obj.el);
  } else if (OPTS.nokey_atend) {
    return [...prepared_arr.map((obj) => obj.el), ...nokey_arr];
  } else {
    return [...nokey_arr, ...prepared_arr.map((obj) => obj.el)];
  }
}
