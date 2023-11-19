'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = shuffle;
var _isNotEmpty = _interopRequireDefault(require("./isNotEmpty.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function shuffle(arr) {
  if (!(0, _isNotEmpty["default"])(arr)) return;
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [arr[j], arr[i]];
    arr[i] = _ref[0];
    arr[j] = _ref[1];
  }
}