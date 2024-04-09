'use strict';

/**
 * Check whether or not a provided value is a string
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is a string
 */
export default function isString (val:unknown):val is string {
    return typeof val === 'string';
}
