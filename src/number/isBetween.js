'use strict';

import isNumber from '../number/is';

//  Check if a number is between a range
export default function (val, min, max) {
    if (!isNumber(val) || !isNumber(min) || !isNumber(max)) return false;

    if (min >= max) return false;

    return val >= min && val <= max;
}
