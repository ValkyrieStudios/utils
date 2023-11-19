'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = shuffle;
function shuffle(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return;
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [arr[j], arr[i]];
    arr[i] = _ref[0];
    arr[j] = _ref[1];
  }
}