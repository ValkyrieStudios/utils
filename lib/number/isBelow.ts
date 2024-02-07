'use strict';

/**
 * Check whether or not the provided value is a number below another value
 *
 * @param val - Value to verify
 * @param ref - Reference the provided value needs to be below
 *
 * @returns Whether or not the value is below the reference
 */
export default function isNumberBelow (val:any, ref:number):boolean {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val < ref;
}
