'use strict';

import isNumber from '../number/is';

//  Check if a number is below or equal to a reference number
export default function isBelowOrEqual (val, ref) {
    if (!isNumber(val) || !isNumber(ref)) return false;
    return val <= ref;
}
