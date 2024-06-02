import {equal}                      from './equal';
import {isArray, isNeArray}         from './array';
import {isBoolean}                  from './boolean';
import {isDate}                     from './date';
import {isFormData}                 from './formdata';
import {isFn, isAsyncFn}            from './function';
import {isRegExp}                   from './regexp';
import {isObject, isNeObject}       from './object';
import {
    isNum,
    isNumBetween,
    isNumLt,
    isNumLte,
    isNumGt,
    isNumGte,
    isInt,
    isIntBetween,
    isIntLt,
    isIntLte,
    isIntGt,
    isIntGte,
} from './number';
import {
    isString,
    isStringBetween,
    isNeString,
} from './string';

const Is = Object.freeze({
    Array               : isArray,
    NeArray             : isNeArray,
    NotEmptyArray       : isNeArray,
    Boolean             : isBoolean,
    Date                : isDate,
    Formdata            : isFormData,
    Function            : isFn,
    AsyncFunction       : isAsyncFn,
    Num                 : isNum,
    NumBetween          : isNumBetween,
    NumAbove            : isNumGt,
    NumAboveOrEqual     : isNumGte,
    NumBelow            : isNumLt,
    NumBelowOrEqual     : isNumLte,
    NumGt               : isNumGt,
    NumGte              : isNumGte,
    NumLt               : isNumLt,
    NumLte              : isNumLte,
    Number              : isNum,
    NumberBetween       : isNumBetween,
    NumberAbove         : isNumGt,
    NumberAboveOrEqual  : isNumGte,
    NumberBelow         : isNumLt,
    NumberBelowOrEqual  : isNumLte,
    Int                 : isInt,
    IntBetween          : isIntBetween,
    IntAbove            : isIntGt,
    IntAboveOrEqual     : isIntGte,
    IntBelow            : isIntLt,
    IntBelowOrEqual     : isIntLte,
    IntGt               : isIntGt,
    IntGte              : isIntGte,
    IntLt               : isIntLt,
    IntLte              : isIntLte,
    Integer             : isInt,
    IntegerBetween      : isIntBetween,
    IntegerBelow        : isIntLt,
    IntegerBelowOrEqual : isIntLte,
    IntegerAbove        : isIntGt,
    IntegerAboveOrEqual : isIntGte,
    RegExp              : isRegExp,
    Object              : isObject,
    NeObject            : isNeObject,
    NotEmptyObject      : isNeObject,
    String              : isString,
    StringBetween       : isStringBetween,
    NeString            : isNeString,
    NotEmptyString      : isNeString,
    Equal               : equal,
    Eq                  : equal,
});

export {Is, Is as default};
