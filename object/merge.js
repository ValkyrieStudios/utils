'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;

var _is = _interopRequireDefault(require("../array/is"));

var _is2 = _interopRequireDefault(require("./is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var merge = function merge() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!(0, _is2["default"])(target) || (0, _is["default"])(target)) {
    throw new TypeError('Please pass an object to merge');
  }

  return Object.keys(target).reduce(function (acc, key) {
    if ((0, _is2["default"])(target[key]) && !(0, _is["default"])(target[key])) {
      acc[key] = merge(target[key], obj[key] || {});
    } else {
      acc[key] = obj.hasOwnProperty(key) ? obj[key] : target[key];
    }

    return acc;
  }, {});
};

var _default = merge;
exports["default"] = _default;