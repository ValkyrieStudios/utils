'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = nowUnix;
function nowUnix() {
  return Math.floor(Date.now() / 1000);
}