'use strict';

import isArray              from './array/is';
import isNotEmptyArray      from './array/isNotEmpty';
import isBoolean            from './boolean/is';
import isDate               from './date/is';
import isFormData           from './formdata/is';
import isFunction           from './function/is';
import isNumber             from './number/is';
import isNumberBetween      from './number/isBetween';
import isRegExp             from './regexp/is';
import isObject             from './object/is';
import isNotEmptyObject     from './object/isNotEmpty';
import isString             from './string/is';
import isStringBetween      from './string/isBetween';
import isNotEmptyString     from './string/isNotEmpty';

const Is = Object.freeze(Object.defineProperties(Object.create(null), {
    'Array'             : {enumerable: true, writable: false, configurable: false, value: isArray},
    'NotEmptyArray'     : {enumerable: true, writable: false, configurable: false, value: isNotEmptyArray},
    'Boolean'           : {enumerable: true, writable: false, configurable: false, value: isBoolean},
    'Date'              : {enumerable: true, writable: false, configurable: false, value: isDate},
    'FormData'          : {enumerable: true, writable: false, configurable: false, value: isFormData},
    'Function'          : {enumerable: true, writable: false, configurable: false, value: isFunction},
    'Number'            : {enumerable: true, writable: false, configurable: false, value: isNumber},
    'NumberBetween'     : {enumerable: true, writable: false, configurable: false, value: isNumberBetween},
    'RegExp'            : {enumerable: true, writable: false, configurable: false, value: isRegExp},
    'Object'            : {enumerable: true, writable: false, configurable: false, value: isObject},
    'NotEmptyObject'    : {enumerable: true, writable: false, configurable: false, value: isNotEmptyObject},
    'String'            : {enumerable: true, writable: false, configurable: false, value: isString},
    'StringBetween'     : {enumerable: true, writable: false, configurable: false, value: isStringBetween},
    'NotEmptyString'    : {enumerable: true, writable: false, configurable: false, value: isNotEmptyString},
}));

export default Is;
