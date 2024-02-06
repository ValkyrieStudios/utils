'use strict';

//  Shorten a string and add a postfix if it goes over a specific length, will autotrim value
//
//  @param string   val         Value to shorten, returns false a string is not passed
//  @param int      length      Length to shorten it at
//  @param string   postfix     (default='...') Postfix to use when shortened
export default function shorten (val, length, postfix = '...') {
    if (
        typeof val !== 'string' ||
        typeof postfix !== 'string' ||
        !Number.isFinite(length) ||
        length <= 0
    ) return false;

    //  Trim first
    const sanitized = val.trim();

    return sanitized.length <= length ? sanitized : `${sanitized.substr(0, length)}${postfix}`;
}
