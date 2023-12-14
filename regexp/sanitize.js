'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = sanitizeRegExp;
function sanitizeRegExp(val) {
  if (typeof val !== 'string') return !1;
  return val.trim().replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}