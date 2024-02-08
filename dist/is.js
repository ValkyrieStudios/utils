'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const equal_1 = require("./equal");
const isNotEmpty_1 = require("./array/isNotEmpty");
const is_1 = require("./array/is");
const is_2 = require("./boolean/is");
const is_3 = require("./date/is");
const is_4 = require("./function/is");
const is_5 = require("./number/is");
const isBetween_1 = require("./number/isBetween");
const isBelow_1 = require("./number/isBelow");
const isBelowOrEqual_1 = require("./number/isBelowOrEqual");
const isAbove_1 = require("./number/isAbove");
const isAboveOrEqual_1 = require("./number/isAboveOrEqual");
const isInteger_1 = require("./number/isInteger");
const isIntegerBetween_1 = require("./number/isIntegerBetween");
const isIntegerBelow_1 = require("./number/isIntegerBelow");
const isIntegerBelowOrEqual_1 = require("./number/isIntegerBelowOrEqual");
const isIntegerAbove_1 = require("./number/isIntegerAbove");
const isIntegerAboveOrEqual_1 = require("./number/isIntegerAboveOrEqual");
const is_6 = require("./regexp/is");
const is_7 = require("./object/is");
const isNotEmpty_2 = require("./object/isNotEmpty");
const is_8 = require("./string/is");
const isBetween_2 = require("./string/isBetween");
const isNotEmpty_3 = require("./string/isNotEmpty");
const Is = Object.freeze({
    Array: is_1.default,
    NeArray: isNotEmpty_1.default,
    NotEmptyArray: isNotEmpty_1.default,
    Boolean: is_2.default,
    Date: is_3.default,
    Function: is_4.default,
    Num: is_5.default,
    NumBetween: isBetween_1.default,
    NumAbove: isAbove_1.default,
    NumAboveOrEqual: isAboveOrEqual_1.default,
    NumBelow: isBelow_1.default,
    NumBelowOrEqual: isBelowOrEqual_1.default,
    NumGt: isAbove_1.default,
    NumGte: isAboveOrEqual_1.default,
    NumLt: isBelow_1.default,
    NumLte: isBelowOrEqual_1.default,
    Number: is_5.default,
    NumberBetween: isBetween_1.default,
    NumberAbove: isAbove_1.default,
    NumberAboveOrEqual: isAboveOrEqual_1.default,
    NumberBelow: isBelow_1.default,
    NumberBelowOrEqual: isBelowOrEqual_1.default,
    Int: isInteger_1.default,
    IntBetween: isIntegerBetween_1.default,
    IntAbove: isIntegerAbove_1.default,
    IntAboveOrEqual: isIntegerAboveOrEqual_1.default,
    IntBelow: isIntegerBelow_1.default,
    IntBelowOrEqual: isIntegerBelowOrEqual_1.default,
    IntGt: isIntegerAbove_1.default,
    IntGte: isIntegerAboveOrEqual_1.default,
    IntLt: isIntegerBelow_1.default,
    IntLte: isIntegerBelowOrEqual_1.default,
    Integer: isInteger_1.default,
    IntegerBetween: isIntegerBetween_1.default,
    IntegerBelow: isIntegerBelow_1.default,
    IntegerBelowOrEqual: isIntegerBelowOrEqual_1.default,
    IntegerAbove: isIntegerAbove_1.default,
    IntegerAboveOrEqual: isIntegerAboveOrEqual_1.default,
    RegExp: is_6.default,
    Object: is_7.default,
    NeObject: isNotEmpty_2.default,
    NotEmptyObject: isNotEmpty_2.default,
    String: is_8.default,
    StringBetween: isBetween_2.default,
    NeString: isNotEmpty_3.default,
    NotEmptyString: isNotEmpty_3.default,
    Equal: equal_1.default,
    Eq: equal_1.default,
});
exports.default = Is;