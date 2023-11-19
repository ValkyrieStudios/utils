'use strict';

//  Check if a number is an integer between a range
export default function isIntegerBetween (val, min, max) {
    if (
        !Number.isInteger(val) ||
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min >= max
    ) return false;

    return val >= min && val <= max;
}
