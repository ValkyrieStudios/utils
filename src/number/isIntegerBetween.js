'use strict';

import isNumber from '../number/is';
import isInteger from '../number/isInteger';

//  Check if a number is an integer between a range
export default function (val, min, max) {
    if (!isInteger(val) || !isNumber(min) || !isNumber(max)) return false;

    if (min >= max) return false;

    return val >= min && val <= max;
}
