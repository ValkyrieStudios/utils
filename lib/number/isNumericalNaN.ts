'use strict';

/**
 * Check whether or not the provided value is a numerical NaN
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is a numerical NaN
 */
export default function isNumericalNaN (val:unknown):boolean {
    return Number.isNaN(val) || val === Infinity;
}
