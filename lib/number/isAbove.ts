'use strict';

/**
 * Check whether or not the provided value is a number above another value
 *
 * @param val - Value to verify
 * @param ref - Reference the provided value needs to be above
 *
 * @returns Whether or not the value is above the reference
 */
export default function isNumberAbove (val:any, ref:number):boolean {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val > ref;
}
