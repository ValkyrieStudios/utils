'use strict';

/**
 * Check whether or not a provided value is an array with content
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is an array with content
 */
function isNotEmptyArray (val:unknown):val is unknown[] {
    return Array.isArray(val) && val.length !== 0;
}

export {isNotEmptyArray, isNotEmptyArray as default};
