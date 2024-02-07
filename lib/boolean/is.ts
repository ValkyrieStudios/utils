'use strict';

/**
 * Check whether or not a provided value is a boolean
 *
 * @param val - Value to verify
 * 
 * @returns Whether or not the value is a boolean
 */
export default function isBoolean (val:any):boolean {
    return val === true || val === false;
}
