'use strict';

/**
 * Check whether or not a provided value is a Date
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is a Date
 */
export default function isDate (val:unknown):val is Date {
    /* eslint-disable-next-line */
    /* @ts-ignore */
    return val instanceof Date && !isNaN(val as number);
}
