'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;

var performance = !1;
if (typeof window !== 'undefined' && (window.performance || {}).now) {
  performance = function performance() {
    return window.performance.now();
  };
} else if (typeof process !== 'undefined') {
  performance = function performance() {
    return process.hrtime()[1];
  };
} else {
  performance = function performance() {
    return 0;
  };
}
function _default() {
  var d = new Date().getTime();

  d += performance();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    if (c === 'x') return r.toString(16);
    return (r & 0x3 | 0x8).toString(16);
  });
}