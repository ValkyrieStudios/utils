'use strict';

/**
 * Check whether or not a provided value is a Function
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is a Function
 */
export default function isFunction (val:unknown):val is Function {
    return typeof val === 'function';
}
