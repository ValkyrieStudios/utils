'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isStringBetween;
function isStringBetween(val, min, max) {
  var trimmed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
  if (typeof val !== 'string' || !Number.isFinite(min) || min < 0 || !Number.isFinite(max) || max < 0 || min >= max) return !1;
  var length = (trimmed === !0 ? val.trim() : val).length;
  return length >= min && length <= max;
}