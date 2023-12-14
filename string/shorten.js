'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = shorten;
function shorten(val, length) {
  var postfix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';
  if (typeof val !== 'string' || typeof postfix !== 'string' || !Number.isFinite(length) || length <= 0) return !1;
  var sanitized = val.trim();
  return sanitized.length <= length ? sanitized : "".concat(sanitized.substr(0, length)).concat(postfix);
}