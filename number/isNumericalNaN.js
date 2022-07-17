'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;

function _default(val) {
  return Number.isNaN(val) || val === Infinity || val === NaN || isNaN(val);
}