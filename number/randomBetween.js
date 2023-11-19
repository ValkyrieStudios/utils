'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = randomBetween;
function randomBetween() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  if (!Number.isFinite(min) || !Number.isFinite(max)) throw new TypeError('Min/Max should be numeric');
  return Math.random() * (max - min) + min;
}