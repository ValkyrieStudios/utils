'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isNumberAboveOrEqual;
function isNumberAboveOrEqual(val, ref) {
  return !Number.isFinite(val) || !Number.isFinite(ref) ? !1 : val >= ref;
}