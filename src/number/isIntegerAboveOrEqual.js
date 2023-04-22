'use strict';

import isNumber from '../number/is';
import isInteger from '../number/isInteger';

//  Check if a number is an integer above or equal to a reference number
export default function isIntegerAboveOrEqual (val, ref) {
    if (!isInteger(val) || !isNumber(ref)) return false;
    return val >= ref;
}
