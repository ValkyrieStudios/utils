'use strict';

/**
 * Check whether or not a provided value is a RegExp instance
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is a RegExp
 */
function isRegExp (val:unknown):val is RegExp {
    return val instanceof RegExp;
}

export {isRegExp, isRegExp as default};
