'use strict';

import equal                    from './equal';
import isArray                  from './array/is';
import isNotEmptyArray          from './array/isNotEmpty';
import isBoolean                from './boolean/is';
import isDate                   from './date/is';
import isFunction               from './function/is';
import isNumber                 from './number/is';
import isNumberBetween          from './number/isBetween';
import isNumberBelow            from './number/isBelow';
import isNumberBelowOrEqual     from './number/isBelowOrEqual';
import isNumberAbove            from './number/isAbove';
import isNumberAboveOrEqual     from './number/isAboveOrEqual';
import isInteger                from './number/isInteger';
import isIntegerBetween         from './number/isIntegerBetween';
import isIntegerBelow           from './number/isIntegerBelow';
import isIntegerBelowOrEqual    from './number/isIntegerBelowOrEqual';
import isIntegerAbove           from './number/isIntegerAbove';
import isIntegerAboveOrEqual    from './number/isIntegerAboveOrEqual';
import isRegExp                 from './regexp/is';
import isObject                 from './object/is';
import isNotEmptyObject         from './object/isNotEmpty';
import isString                 from './string/is';
import isStringBetween          from './string/isBetween';
import isNotEmptyString         from './string/isNotEmpty';

const Is = Object.freeze(Object.defineProperties(Object.create(null), {
    //  Array -----------------------------------------------------------------------------------------------
    Array               : {enumerable: true, writable: false, configurable: false, value: isArray},
    NeArray             : {enumerable: true, writable: false, configurable: false, value: isNotEmptyArray},
    NotEmptyArray       : {enumerable: true, writable: false, configurable: false, value: isNotEmptyArray},
    //  Boolean ---------------------------------------------------------------------------------------------
    Boolean             : {enumerable: true, writable: false, configurable: false, value: isBoolean},
    //  Date ------------------------------------------------------------------------------------------------
    Date                : {enumerable: true, writable: false, configurable: false, value: isDate},
    //  Function --------------------------------------------------------------------------------------------
    Function            : {enumerable: true, writable: false, configurable: false, value: isFunction},
    //  Number ----------------------------------------------------------------------------------------------
    Num                 : {enumerable: true, writable: false, configurable: false, value: isNumber},
    NumBetween          : {enumerable: true, writable: false, configurable: false, value: isNumberBetween},
    NumAbove            : {enumerable: true, writable: false, configurable: false, value: isNumberAbove},
    NumAboveOrEqual     : {enumerable: true, writable: false, configurable: false, value: isNumberAboveOrEqual},
    NumBelow            : {enumerable: true, writable: false, configurable: false, value: isNumberBelow},
    NumBelowOrEqual     : {enumerable: true, writable: false, configurable: false, value: isNumberBelowOrEqual},
    NumGt               : {enumerable: true, writable: false, configurable: false, value: isNumberAbove},
    NumGte              : {enumerable: true, writable: false, configurable: false, value: isNumberAboveOrEqual},
    NumLt               : {enumerable: true, writable: false, configurable: false, value: isNumberBelow},
    NumLte              : {enumerable: true, writable: false, configurable: false, value: isNumberBelowOrEqual},
    Number              : {enumerable: true, writable: false, configurable: false, value: isNumber},
    NumberBetween       : {enumerable: true, writable: false, configurable: false, value: isNumberBetween},
    NumberAbove         : {enumerable: true, writable: false, configurable: false, value: isNumberAbove},
    NumberAboveOrEqual  : {enumerable: true, writable: false, configurable: false, value: isNumberAboveOrEqual},
    NumberBelow         : {enumerable: true, writable: false, configurable: false, value: isNumberBelow},
    NumberBelowOrEqual  : {enumerable: true, writable: false, configurable: false, value: isNumberBelowOrEqual},
    //  Integer ---------------------------------------------------------------------------------------------
    Int                 : {enumerable: true, writable: false, configurable: false, value: isInteger},
    IntBetween          : {enumerable: true, writable: false, configurable: false, value: isIntegerBetween},
    IntAbove            : {enumerable: true, writable: false, configurable: false, value: isIntegerAbove},
    IntAboveOrEqual     : {enumerable: true, writable: false, configurable: false, value: isIntegerAboveOrEqual},
    IntBelow            : {enumerable: true, writable: false, configurable: false, value: isIntegerBelow},
    IntBelowOrEqual     : {enumerable: true, writable: false, configurable: false, value: isIntegerBelowOrEqual},
    IntGt               : {enumerable: true, writable: false, configurable: false, value: isIntegerAbove},
    IntGte              : {enumerable: true, writable: false, configurable: false, value: isIntegerAboveOrEqual},
    IntLt               : {enumerable: true, writable: false, configurable: false, value: isIntegerBelow},
    IntLte              : {enumerable: true, writable: false, configurable: false, value: isIntegerBelowOrEqual},
    Integer             : {enumerable: true, writable: false, configurable: false, value: isInteger},
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
