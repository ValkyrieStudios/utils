'use strict';

/**
 * Check whether or not a provided value is a number
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is a number
 */
export default function isNumber (val:unknown):boolean {
    return Number.isFinite(val);
}
