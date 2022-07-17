'use strict';

import isString 		from './is';
import isNotEmptyString from './isNotEmpty';
import isNumberAbove    from '../number/isAbove';

//  Shorten a string and add a postfix if it goes over a specific length, will autotrim value
//
//  @param string   val         Value to shorten, returns false a string is not passed
//  @param int      length      Length to shorten it at
//  @param string   postfix     (default='...') Postfix to use when shortened
export default function (val, length, postfix = '...') {
    if (!isNotEmptyString(val) || !isString(postfix) || !isNumberAbove(length, 0)) return false;

    if (val.trim().length <= length) return val.trim();

    return `${val.trim().substr(0, length)}${postfix}`;
}
