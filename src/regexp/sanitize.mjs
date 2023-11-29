'use strict';

import isNotEmptyString from '../string/isNotEmpty.mjs';

//  Escapes a value to be used inside of a regular expression (eg: new RegExp(...))
//  For more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
//
//  @param string   val     Value to escape
export default function sanitizeRegExp (val) {
    if (!isNotEmptyString(val)) return false;
    return val.trim().replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}
