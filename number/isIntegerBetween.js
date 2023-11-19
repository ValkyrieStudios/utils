'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isIntegerBetween;
function isIntegerBetween(val, min, max) {
  if (!Number.isInteger(val) || !Number.isFinite(min) || !Number.isFinite(max) || min >= max) return !1;
  return val >= min && val <= max;
}