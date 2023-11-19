'use strict';

import equal                    from './equal.js';
import isNotEmptyArray          from './array/isNotEmpty.js';
import isBoolean                from './boolean/is.js';
import isDate                   from './date/is.js';
import isFunction               from './function/is.js';
import isNumberBetween          from './number/isBetween.js';
import isNumberBelow            from './number/isBelow.js';
import isNumberBelowOrEqual     from './number/isBelowOrEqual.js';
import isNumberAbove            from './number/isAbove.js';
import isNumberAboveOrEqual     from './number/isAboveOrEqual.js';
import isIntegerBetween         from './number/isIntegerBetween.js';
import isIntegerBelow           from './number/isIntegerBelow.js';
import isIntegerBelowOrEqual    from './number/isIntegerBelowOrEqual.js';
import isIntegerAbove           from './number/isIntegerAbove.js';
import isIntegerAboveOrEqual    from './number/isIntegerAboveOrEqual.js';
import isRegExp                 from './regexp/is.js';
import isObject                 from './object/is.js';
import isNotEmptyObject         from './object/isNotEmpty.js';
import isString                 from './string/is.js';
import isStringBetween          from './string/isBetween.js';
import isNotEmptyString         from './string/isNotEmpty.js';

const Is = Object.freeze(Object.defineProperties(Object.create(null), {
    //  Array -----------------------------------------------------------------------------------------------
    Array               : {enumerable: true, writable: false, configurable: false, value: Array.isArray},
    NeArray             : {enumerable: true, writable: false, configurable: false, value: isNotEmptyArray},
    NotEmptyArray       : {enumerable: true, writable: false, configurable: false, value: isNotEmptyArray},
    //  Boolean ---------------------------------------------------------------------------------------------
    Boolean             : {enumerable: true, writable: false, configurable: false, value: isBoolean},
    //  Date ------------------------------------------------------------------------------------------------
    Date                : {enumerable: true, writable: false, configurable: false, value: isDate},
    //  Function --------------------------------------------------------------------------------------------
    Function            : {enumerable: true, writable: false, configurable: false, value: isFunction},
    //  Number ----------------------------------------------------------------------------------------------
    Num                 : {enumerable: true, writable: false, configurable: false, value: Number.isFinite},
    NumBetween          : {enumerable: true, writable: false, configurable: false, value: isNumberBetween},
    NumAbove            : {enumerable: true, writable: false, configurable: false, value: isNumberAbove},
    NumAboveOrEqual     : {enumerable: true, writable: false, configurable: false, value: isNumberAboveOrEqual},
    NumBelow            : {enumerable: true, writable: false, configurable: false, value: isNumberBelow},
    NumBelowOrEqual     : {enumerable: true, writable: false, configurable: false, value: isNumberBelowOrEqual},
    NumGt               : {enumerable: true, writable: false, configurable: false, value: isNumberAbove},
    NumGte              : {enumerable: true, writable: false, configurable: false, value: isNumberAboveOrEqual},
    NumLt               : {enumerable: true, writable: false, configurable: false, value: isNumberBelow},
    NumLte              : {enumerable: true, writable: false, configurable: false, value: isNumberBelowOrEqual},
    Number              : {enumerable: true, writable: false, configurable: false, value: Number.isFinite},
    NumberBetween       : {enumerable: true, writable: false, configurable: false, value: isNumberBetween},
    NumberAbove         : {enumerable: true, writable: false, configurable: false, value: isNumberAbove},
    NumberAboveOrEqual  : {enumerable: true, writable: false, configurable: false, value: isNumberAboveOrEqual},
    NumberBelow         : {enumerable: true, writable: false, configurable: false, value: isNumberBelow},
    NumberBelowOrEqual  : {enumerable: true, writable: false, configurable: false, value: isNumberBelowOrEqual},
    //  Integer ---------------------------------------------------------------------------------------------
    Int                 : {enumerable: true, writable: false, configurable: false, value: Number.isInteger},
    IntBetween          : {enumerable: true, writable: false, configurable: false, value: isIntegerBetween},
    IntAbove            : {enumerable: true, writable: false, configurable: false, value: isIntegerAbove},
    IntAboveOrEqual     : {enumerable: true, writable: false, configurable: false, value: isIntegerAboveOrEqual},
    IntBelow            : {enumerable: true, writable: false, configurable: false, value: isIntegerBelow},
    IntBelowOrEqual     : {enumerable: true, writable: false, configurable: false, value: isIntegerBelowOrEqual},
    IntGt               : {enumerable: true, writable: false, configurable: false, value: isIntegerAbove},
    IntGte              : {enumerable: true, writable: false, configurable: false, value: isIntegerAboveOrEqual},
    IntLt               : {enumerable: true, writable: false, configurable: false, value: isIntegerBelow},
    IntLte              : {enumerable: true, writable: false, configurable: false, value: isIntegerBelowOrEqual},
    Integer             : {enumerable: true, writable: false, configurable: false, value: Number.isInteger},
    IntegerBetween      : {enumerable: true, writable: false, configurable: false, value: isIntegerBetween},
    IntegerBelow        : {enumerable: true, writable: false, configurable: false, value: isIntegerBelow},
    IntegerBelowOrEqual : {enumerable: true, writable: false, configurable: false, value: isIntegerBelowOrEqual},
    IntegerAbove        : {enumerable: true, writable: false, configurable: false, value: isIntegerAbove},
    IntegerAboveOrEqual : {enumerable: true, writable: false, configurable: false, value: isIntegerAboveOrEqual},
    //  Regex -----------------------------------------------------------------------------------------------
    RegExp              : {enumerable: true, writable: false, configurable: false, value: isRegExp},
    //  Object ----------------------------------------------------------------------------------------------
    Object              : {enumerable: true, writable: false, configurable: false, value: isObject},
    NeObject            : {enumerable: true, writable: false, configurable: false, value: isNotEmptyObject},
    NotEmptyObject      : {enumerable: true, writable: false, configurable: false, value: isNotEmptyObject},
    //  String ----------------------------------------------------------------------------------------------
    String              : {enumerable: true, writable: false, configurable: false, value: isString},
    StringBetween       : {enumerable: true, writable: false, configurable: false, value: isStringBetween},
    NeString            : {enumerable: true, writable: false, configurable: false, value: isNotEmptyString},
    NotEmptyString      : {enumerable: true, writable: false, configurable: false, value: isNotEmptyString},
    //  Utils -----------------------------------------------------------------------------------------------
    Equal               : {enumerable: true, writable: false, configurable: false, value: equal},
    Eq                  : {enumerable: true, writable: false, configurable: false, value: equal},
}));

export default Is;
