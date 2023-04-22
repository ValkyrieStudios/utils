'use strict';

import isString from './is';
import isNumber from '../number/is';

//  Check if a string is between a range in length
export default function isStringBetween (val, min, max, trimmed = true) {
    if (
        !isString(val) ||
        !isNumber(min) ||
        !isNumber(max) ||
        min >= max
    ) return false;

    const length = (trimmed === true ? val.trim() : val).length;
    return length >= min && length <= max;
}
