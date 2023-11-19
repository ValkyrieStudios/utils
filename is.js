'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;
var _equal = _interopRequireDefault(require("./equal.js"));
var _is = _interopRequireDefault(require("./array/is.js"));
var _isNotEmpty = _interopRequireDefault(require("./array/isNotEmpty.js"));
var _is2 = _interopRequireDefault(require("./boolean/is.js"));
var _is3 = _interopRequireDefault(require("./date/is.js"));
var _is4 = _interopRequireDefault(require("./function/is.js"));
var _is5 = _interopRequireDefault(require("./number/is.js"));
var _isBetween = _interopRequireDefault(require("./number/isBetween.js"));
var _isBelow = _interopRequireDefault(require("./number/isBelow.js"));
var _isBelowOrEqual = _interopRequireDefault(require("./number/isBelowOrEqual.js"));
var _isAbove = _interopRequireDefault(require("./number/isAbove.js"));
var _isAboveOrEqual = _interopRequireDefault(require("./number/isAboveOrEqual.js"));
var _isInteger = _interopRequireDefault(require("./number/isInteger.js"));
var _isIntegerBetween = _interopRequireDefault(require("./number/isIntegerBetween.js"));
var _isIntegerBelow = _interopRequireDefault(require("./number/isIntegerBelow.js"));
var _isIntegerBelowOrEqual = _interopRequireDefault(require("./number/isIntegerBelowOrEqual.js"));
var _isIntegerAbove = _interopRequireDefault(require("./number/isIntegerAbove.js"));
var _isIntegerAboveOrEqual = _interopRequireDefault(require("./number/isIntegerAboveOrEqual.js"));
var _is6 = _interopRequireDefault(require("./regexp/is.js"));
var _is7 = _interopRequireDefault(require("./object/is.js"));
var _isNotEmpty2 = _interopRequireDefault(require("./object/isNotEmpty.js"));
var _is8 = _interopRequireDefault(require("./string/is.js"));
var _isBetween2 = _interopRequireDefault(require("./string/isBetween.js"));
var _isNotEmpty3 = _interopRequireDefault(require("./string/isNotEmpty.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Is = Object.freeze(Object.defineProperties(Object.create(null), {
  Array: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _is["default"]
  },
  NeArray: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isNotEmpty["default"]
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
  Num: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _is5["default"]
  },
  NumBetween: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isBetween["default"]
  },
  NumAbove: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isAbove["default"]
  },
  NumAboveOrEqual: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isAboveOrEqual["default"]
  },
  NumBelow: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isBelow["default"]
  },
  NumBelowOrEqual: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isBelowOrEqual["default"]
  },
  NumGt: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isAbove["default"]
  },
  NumGte: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isAboveOrEqual["default"]
  },
  NumLt: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isBelow["default"]
  },
  NumLte: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isBelowOrEqual["default"]
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
  NumberAbove: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isAbove["default"]
  },
  NumberAboveOrEqual: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isAboveOrEqual["default"]
  },
  NumberBelow: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isBelow["default"]
  },
  NumberBelowOrEqual: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isBelowOrEqual["default"]
  },
  Int: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isInteger["default"]
  },
  IntBetween: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerBetween["default"]
  },
  IntAbove: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerAbove["default"]
  },
  IntAboveOrEqual: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerAboveOrEqual["default"]
  },
  IntBelow: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerBelow["default"]
  },
  IntBelowOrEqual: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerBelowOrEqual["default"]
  },
  IntGt: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerAbove["default"]
  },
  IntGte: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerAboveOrEqual["default"]
  },
  IntLt: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerBelow["default"]
  },
  IntLte: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerBelowOrEqual["default"]
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
  IntegerBelowOrEqual: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerBelowOrEqual["default"]
  },
  IntegerAbove: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerAbove["default"]
  },
  IntegerAboveOrEqual: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isIntegerAboveOrEqual["default"]
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
  NeObject: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isNotEmpty2["default"]
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
  NeString: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isNotEmpty3["default"]
  },
  NotEmptyString: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _isNotEmpty3["default"]
  },
  Equal: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _equal["default"]
  },
  Eq: {
    enumerable: !0,
    writable: !1,
    configurable: !1,
    value: _equal["default"]
  }
}));
var _default = exports["default"] = Is;