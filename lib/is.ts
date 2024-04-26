'use strict';

import {equal}                    from './equal';
import {isNotEmptyArray}          from './array/isNotEmpty';
import {isArray}                  from './array/is';
import {isBoolean}                from './boolean/is';
import {isDate}                   from './date/is';
import {isFunction}               from './function/is';
import {isAsyncFunction}          from './function/isAsync';
import {isNumber}                 from './number/is';
import {isNumberBetween}          from './number/isBetween';
import {isNumberBelow}            from './number/isBelow';
import {isNumberBelowOrEqual}     from './number/isBelowOrEqual';
import {isNumberAbove}            from './number/isAbove';
import {isNumberAboveOrEqual}     from './number/isAboveOrEqual';
import {isInteger}                from './number/isInteger';
import {isIntegerBetween}         from './number/isIntegerBetween';
import {isIntegerBelow}           from './number/isIntegerBelow';
import {isIntegerBelowOrEqual}    from './number/isIntegerBelowOrEqual';
import {isIntegerAbove}           from './number/isIntegerAbove';
import {isIntegerAboveOrEqual}    from './number/isIntegerAboveOrEqual';
import {isRegExp}                 from './regexp/is';
import {isObject}                 from './object/is';
import {isNotEmptyObject}         from './object/isNotEmpty';
import {isString}                 from './string/is';
import {isStringBetween}          from './string/isBetween';
import {isNotEmptyString}         from './string/isNotEmpty';
import {isFormData}                 from './formdata';

const Is = Object.freeze({
    Array               : isArray,
    NeArray             : isNotEmptyArray,
    NotEmptyArray       : isNotEmptyArray,
    Boolean             : isBoolean,
    Date                : isDate,
    Function            : isFunction,
    AsyncFunction       : isAsyncFunction,
    Num                 : isNumber,
    NumBetween          : isNumberBetween,
    NumAbove            : isNumberAbove,
    NumAboveOrEqual     : isNumberAboveOrEqual,
    NumBelow            : isNumberBelow,
    NumBelowOrEqual     : isNumberBelowOrEqual,
    NumGt               : isNumberAbove,
    NumGte              : isNumberAboveOrEqual,
    NumLt               : isNumberBelow,
    NumLte              : isNumberBelowOrEqual,
    Number              : isNumber,
    NumberBetween       : isNumberBetween,
    NumberAbove         : isNumberAbove,
    NumberAboveOrEqual  : isNumberAboveOrEqual,
    NumberBelow         : isNumberBelow,
    NumberBelowOrEqual  : isNumberBelowOrEqual,
    Int                 : isInteger,
    IntBetween          : isIntegerBetween,
    IntAbove            : isIntegerAbove,
    IntAboveOrEqual     : isIntegerAboveOrEqual,
    IntBelow            : isIntegerBelow,
    IntBelowOrEqual     : isIntegerBelowOrEqual,
    IntGt               : isIntegerAbove,
    IntGte              : isIntegerAboveOrEqual,
    IntLt               : isIntegerBelow,
    IntLte              : isIntegerBelowOrEqual,
    Integer             : isInteger,
    IntegerBetween      : isIntegerBetween,
    IntegerBelow        : isIntegerBelow,
    IntegerBelowOrEqual : isIntegerBelowOrEqual,
    IntegerAbove        : isIntegerAbove,
    IntegerAboveOrEqual : isIntegerAboveOrEqual,
    Formdata            : isFormData,
    RegExp              : isRegExp,
    Object              : isObject,
    NeObject            : isNotEmptyObject,
    NotEmptyObject      : isNotEmptyObject,
    String              : isString,
    StringBetween       : isStringBetween,
    NeString            : isNotEmptyString,
    NotEmptyString      : isNotEmptyString,
    Equal               : equal,
    Eq                  : equal,
});

export {Is, Is as default};
