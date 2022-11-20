'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;
var _is = _interopRequireDefault(require("./array/is"));
var _isNotEmpty = _interopRequireDefault(require("./array/isNotEmpty"));
var _is2 = _interopRequireDefault(require("./boolean/is"));
var _is3 = _interopRequireDefault(require("./date/is"));
var _is4 = _interopRequireDefault(require("./function/is"));
var _is5 = _interopRequireDefault(require("./number/is"));
var _isBetween = _interopRequireDefault(require("./number/isBetween"));
var _isBelow = _interopRequireDefault(require("./number/isBelow"));
var _isAbove = _interopRequireDefault(require("./number/isAbove"));
var _isInteger = _interopRequireDefault(require("./number/isInteger"));
var _isIntegerBetween = _interopRequireDefault(require("./number/isIntegerBetween"));
var _isIntegerBelow = _interopRequireDefault(require("./number/isIntegerBelow"));
var _isIntegerAbove = _interopRequireDefault(require("./number/isIntegerAbove"));
var _is6 = _interopRequireDefault(require("./regexp/is"));
var _is7 = _interopRequireDefault(require("./object/is"));
var _isNotEmpty2 = _interopRequireDefault(require("./object/isNotEmpty"));
var _is8 = _interopRequireDefault(require("./string/is"));
var _isBetween2 = _interopRequireDefault(require("./string/isBetween"));
var _isNotEmpty3 = _interopRequireDefault(require("./string/isNotEmpty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Is = Object.freeze(Object.defineProperties(Object.create(null), {
  Array: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _is["default"]
  },
  NotEmptyArray: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isNotEmpty["default"]
  },
  Boolean: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _is2["default"]
  },
  Date: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _is3["default"]
  },
  Function: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _is4["default"]
  },
  Number: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _is5["default"]
  },
  NumberBetween: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isBetween["default"]
  },
  NumberBelow: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isBelow["default"]
  },
  NumberAbove: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isAbove["default"]
  },
  Integer: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isInteger["default"]
  },
  IntegerBetween: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerBetween["default"]
  },
  IntegerBelow: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerBelow["default"]
  },
  IntegerAbove: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerAbove["default"]
  },
  RegExp: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _is6["default"]
  },
  Object: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _is7["default"]
  },
  NotEmptyObject: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isNotEmpty2["default"]
  },
  String: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _is8["default"]
  },
  StringBetween: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isBetween2["default"]
  },
  NotEmptyString: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isNotEmpty3["default"]
  }
}));
var _default = Is;
exports["default"] = _default;