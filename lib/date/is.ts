'use strict';

/**
 * Check whether or not a provided value is a Date
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is a Date
 */
export default function isDate (val:unknown):boolean {
    return Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val as number);
}
