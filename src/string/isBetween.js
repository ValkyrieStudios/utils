'use strict';

import isString from './is';
import isNumber from '../number/is';

//  Check if a string is between a range in length
export default function (val, min, max, trimmed = true) {
    if (!isString(val)) return false;

    if (!isNumber(min) || !isNumber(max)) return false;

    if (min >= max) return false;

    const length = (trimmed === true ? val.trim() : val).length;
    return length >= min && length <= max;
}
