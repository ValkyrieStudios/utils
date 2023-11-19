'use strict';

import isString from './is.js';

//  Check if a string is between a range in length
export default function isStringBetween (val, min, max, trimmed = true) {
    if (
        !isString(val) ||
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min >= max
    ) return false;

    const length = (trimmed === true ? val.trim() : val).length;
    return length >= min && length <= max;
}
