'use strict';

/**
 * Check whether or not the provided value is a number below or
 * equal to another value
 *
 * @param val - Value to verify
 * @param ref - Reference the provided value needs to be below or equal to
 *
 * @returns Whether or not the value is below or equal to the reference
 */
export default function isNumberBelowOrEqual (val:unknown, ref:number):boolean {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : (val as number) <= ref;
}
