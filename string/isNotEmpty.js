'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isNotEmptyString;
function isNotEmptyString(val) {
  var trimmed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
  if (typeof val !== 'string' && !(val instanceof String)) return !1;
  return (trimmed === !0 ? val.trim() : val).length > 0;
}