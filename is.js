'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;
var _equal = _interopRequireDefault(require("./equal"));
var _is = _interopRequireDefault(require("./array/is"));
var _isNotEmpty = _interopRequireDefault(require("./array/isNotEmpty"));
var _is2 = _interopRequireDefault(require("./boolean/is"));
var _is3 = _interopRequireDefault(require("./date/is"));
var _is4 = _interopRequireDefault(require("./function/is"));
var _is5 = _interopRequireDefault(require("./number/is"));
var _isBetween = _interopRequireDefault(require("./number/isBetween"));
var _isBelow = _interopRequireDefault(require("./number/isBelow"));
var _isBelowOrEqual = _interopRequireDefault(require("./number/isBelowOrEqual"));
var _isAbove = _interopRequireDefault(require("./number/isAbove"));
var _isAboveOrEqual = _interopRequireDefault(require("./number/isAboveOrEqual"));
var _isInteger = _interopRequireDefault(require("./number/isInteger"));
var _isIntegerBetween = _interopRequireDefault(require("./number/isIntegerBetween"));
var _isIntegerBelow = _interopRequireDefault(require("./number/isIntegerBelow"));
var _isIntegerBelowOrEqual = _interopRequireDefault(require("./number/isIntegerBelowOrEqual"));
var _isIntegerAbove = _interopRequireDefault(require("./number/isIntegerAbove"));
var _isIntegerAboveOrEqual = _interopRequireDefault(require("./number/isIntegerAboveOrEqual"));
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
var _default = Is;
exports["default"] = _default;