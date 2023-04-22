'use strict';

import isNumber from '../number/is';
import isInteger from '../number/isInteger';

//  Check if a number is an integer between a range
export default function isIntegerBetween (val, min, max) {
    if (
        !isInteger(val) ||
        !isNumber(min) ||
        !isNumber(max) ||
        min >= max
    ) return false;

    return val >= min && val <= max;
}
