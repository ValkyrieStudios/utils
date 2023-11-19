'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isBetween;
function isBetween(val, min, max) {
  if (!Number.isFinite(val) || !Number.isFinite(min) || !Number.isFinite(max) || min >= max) return !1;
  return val >= min && val <= max;
}