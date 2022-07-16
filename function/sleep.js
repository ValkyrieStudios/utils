'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = _default;

function _default() {
  var milliseconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
  return new Promise(function (resolve) {
    setTimeout(function () {
      return resolve();
    }, milliseconds);
  });
}