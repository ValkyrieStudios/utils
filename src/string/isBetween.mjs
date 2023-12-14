'use strict';

//  Check if a string is between a range in length
export default function isStringBetween (val, min, max, trimmed = true) {
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
