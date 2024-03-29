'use strict';

/**
 * Check whether or not a provided value is a RegExp instance
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is a RegExp
 */
export default function isRegExp (val:unknown):boolean {
    return val instanceof RegExp;
}
