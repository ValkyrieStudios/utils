'use strict';

import isArray              from './array/is';
import isNotEmptyArray      from './array/isNotEmpty';
import isBoolean            from './boolean/is';
import isDate               from './date/is';
import isFunction           from './function/is';
import isNumber             from './number/is';
import isNumberBetween      from './number/isBetween';
import isNumberBelow        from './number/isBelow';
import isNumberAbove        from './number/isAbove';
import isInteger            from './number/isInteger';
import isIntegerBetween     from './number/isIntegerBetween';
import isIntegerBelow       from './number/isIntegerBelow';
import isIntegerAbove       from './number/isIntegerAbove';
import isRegExp             from './regexp/is';
import isObject             from './object/is';
import isNotEmptyObject     from './object/isNotEmpty';
import isString             from './string/is';
import isStringBetween      from './string/isBetween';
import isNotEmptyString     from './string/isNotEmpty';

const Is = Object.freeze(Object.defineProperties(Object.create(null), {
    Array           : {enumerable: true, writable: false, configurable: false, value: isArray},
    NotEmptyArray   : {enumerable: true, writable: false, configurable: false, value: isNotEmptyArray},
    Boolean         : {enumerable: true, writable: false, configurable: false, value: isBoolean},
    Date            : {enumerable: true, writable: false, configurable: false, value: isDate},
    Function        : {enumerable: true, writable: false, configurable: false, value: isFunction},
    Number          : {enumerable: true, writable: false, configurable: false, value: isNumber},
    NumberBetween   : {enumerable: true, writable: false, configurable: false, value: isNumberBetween},
    NumberBelow     : {enumerable: true, writable: false, configurable: false, value: isNumberBelow},
    NumberAbove     : {enumerable: true, writable: false, configurable: false, value: isNumberAbove},
    Integer         : {enumerable: true, writable: false, configurable: false, value: isInteger},
    IntegerBetween  : {enumerable: true, writable: false, configurable: false, value: isIntegerBetween},
    IntegerBelow    : {enumerable: true, writable: false, configurable: false, value: isIntegerBelow},
    IntegerAbove    : {enumerable: true, writable: false, configurable: false, value: isIntegerAbove},
    RegExp          : {enumerable: true, writable: false, configurable: false, value: isRegExp},
    Object          : {enumerable: true, writable: false, configurable: false, value: isObject},
    NotEmptyObject  : {enumerable: true, writable: false, configurable: false, value: isNotEmptyObject},
    String          : {enumerable: true, writable: false, configurable: false, value: isString},
    StringBetween   : {enumerable: true, writable: false, configurable: false, value: isStringBetween},
    NotEmptyString  : {enumerable: true, writable: false, configurable: false, value: isNotEmptyString},
}));

export default Is;
