'use strict';

/**
 * Check whether or not the provided value is an integer between a min and max
 * inclusive of min and max
 * equal to another value
 *
 * @param val - Value to verify
 * @param min - Lower boundary
 * @param max - Upper boundary
 *
 * @returns Whether or not the value is an integer between min and max inclusive
 */
export default function isIntegerBetween (
    val:unknown,
    min:number,
    max:number
):boolean {
    if (
        !Number.isInteger(val) ||
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min >= max
    ) return false;

    return (val as number) >= min && (val as number) <= max;
}
