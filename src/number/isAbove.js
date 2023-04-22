'use strict';

import isNumber from '../number/is';

//  Check if a number is above a reference number
export default function isNumberAbove (val, ref) {
    if (!isNumber(val) || !isNumber(ref)) return false;
    return val > ref;
}
