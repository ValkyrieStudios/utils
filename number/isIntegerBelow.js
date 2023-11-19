'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isIntegerBelow;
function isIntegerBelow(val, ref) {
  return !Number.isInteger(val) || !Number.isFinite(ref) ? !1 : val < ref;
}