'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = isNumericalNaN;
function isNumericalNaN(val) {
  return Number.isNaN(val) || val === Infinity;
}