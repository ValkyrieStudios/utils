'use strict';

/**
 * Shorten a string and add a postfix if it goes over a specific length, will autotrim value.
 *
 * @param val - String value to shorten
 * @param length - Length to shorten it to
 * @param postfix - (default='...') Postfix to use in case the string got shortened
 *
 * @returns Shortened string
 */
function shorten (val:string, length:number, postfix:string='...'):string {
    //  Return empty string if value passed is not a string
    if (typeof val !== 'string') return '';

    //  Return original value if options are invalid
    if (typeof postfix !== 'string' || !Number.isInteger(length) || length <= 0) return val;

    //  Trim first
    const sanitized = val.trim();

    return sanitized.length <= length ? sanitized : `${sanitized.substring(0, length)}${postfix}`;
}

export {shorten, shorten as default};
