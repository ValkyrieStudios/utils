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

// lib/hash/guid.mjs
var guid_exports = {};
__export(guid_exports, {
  default: () => guid
});
module.exports = __toCommonJS(guid_exports);
var HEXMAP = [];
for (let i = 0; i < 256; i++) {
  HEXMAP[i] = (i < 16 ? "0" : "") + i.toString(16);
}
function guid() {
  const d0 = Math.random() * 4294967295 | 0;
  const d1 = Math.random() * 4294967295 | 0;
  const d2 = Math.random() * 4294967295 | 0;
  const d3 = Math.random() * 4294967295 | 0;
  return HEXMAP[d0 & 255] + HEXMAP[d0 >> 8 & 255] + HEXMAP[d0 >> 16 & 255] + HEXMAP[d0 >> 24 & 255] + "-" + HEXMAP[d1 & 255] + HEXMAP[d1 >> 8 & 255] + "-" + HEXMAP[d1 >> 16 & 15 | 64] + HEXMAP[d1 >> 24 & 255] + "-" + HEXMAP[d2 & 63 | 128] + HEXMAP[d2 >> 8 & 255] + "-" + HEXMAP[d2 >> 16 & 255] + HEXMAP[d2 >> 24 & 255] + HEXMAP[d3 & 255] + HEXMAP[d3 >> 8 & 255] + HEXMAP[d3 >> 16 & 255] + HEXMAP[d3 >> 24 & 255];
}
