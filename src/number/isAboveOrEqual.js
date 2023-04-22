'use strict';

import isNumber from '../number/is';

//  Check if a number is above or equal to a reference number
export default function isNumberAboveOrEqual (val, ref) {
    if (!isNumber(val) || !isNumber(ref)) return false;
    return val >= ref;
}
