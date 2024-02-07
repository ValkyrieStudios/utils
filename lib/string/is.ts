'use strict';

/**
 * Check whether or not a provided value is a string
 *
 * @param val - Value to verify
 * 
 * @returns Whether or not the value is a string
 */
export default function isString (val:any):boolean {
    return typeof val === 'string';
}
