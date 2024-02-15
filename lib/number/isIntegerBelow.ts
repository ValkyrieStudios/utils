'use strict';

/**
 * Check whether or not the provided value is an integer below another value
 *
 * @param val - Value to verify
 * @param ref - Reference the provided value needs to be below
 *
 * @returns Whether or not the value is below the reference
 */
export default function isIntegerBelow (val:unknown, ref:number):boolean {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : (val as number) < ref;
}
