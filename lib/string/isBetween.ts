'use strict';

/**
 * Check whether or not the provided value is a string of length between a min and max
 * inclusive of min and max
 * equal to another value
 *
 * @param val - Value to verify
 * @param min - Lower boundary
 * @param max - Upper boundary
 * @param trimmed  - (default=true) Trim the string or not
 *
 * @returns Whether or not the value is a string of length between min and max inclusive
 */
export default function isStringBetween (val:any, min:number, max:number, trimmed:boolean=true):boolean {
    if (
        typeof val !== 'string' ||
        !Number.isFinite(min) ||
        min < 0 ||
        !Number.isFinite(max) ||
        max < 0 ||
        min >= max
    ) return false;

    const length = (trimmed === true ? val.trim() : val).length;
    return length >= min && length <= max;
}
