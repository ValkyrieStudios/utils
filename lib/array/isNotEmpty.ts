'use strict';

/**
 * Check whether or not a provided value is an array with content
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is an array with content
 */
export default function isNotEmptyArray (val:unknown):boolean {
    return Array.isArray(val) && val.length !== 0;
}
