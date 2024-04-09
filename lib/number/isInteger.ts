'use strict';

/**
 * Check whether or not a provided value is an integer
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is an integer
 */
export default function isInteger (val:unknown):val is number {
    return Number.isInteger(val);
}
