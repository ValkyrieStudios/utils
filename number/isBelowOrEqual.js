'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isBelowOrEqual;
function isBelowOrEqual(val, ref) {
  return !Number.isFinite(val) || !Number.isFinite(ref) ? !1 : val <= ref;
}