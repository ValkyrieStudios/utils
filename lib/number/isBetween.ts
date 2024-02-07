'use strict';

/**
 * Check whether or not the provided value is a number between a min and max
 * inclusive of min and max
 * equal to another value
 *
 * @param val - Value to verify
 * @param min - Lower boundary
 * @param max - Upper boundary
 *
 * @returns Whether or not the value is a number between min and max inclusive
 */
export default function isNumberBetween (val:any, min:number, max:number):boolean {
    if (
        !Number.isFinite(val) ||
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min >= max
    ) return false;

    return val >= min && val <= max;
}
