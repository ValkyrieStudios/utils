'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isIntegerAboveOrEqual;
function isIntegerAboveOrEqual(val, ref) {
  return !Number.isInteger(val) || !Number.isFinite(ref) ? !1 : val >= ref;
}