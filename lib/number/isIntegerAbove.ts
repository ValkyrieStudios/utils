'use strict';

/**
 * Check whether or not the provided value is an integer above another value
 *
 * @param val - Value to verify
 * @param ref - Reference the provided value needs to be above
 *
 * @returns Whether or not the value is above the reference
 */
export default function isIntegerAbove (val:unknown, ref:number):boolean {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : (val as number) > ref;
}
