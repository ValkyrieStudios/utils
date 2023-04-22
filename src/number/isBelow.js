'use strict';

import isNumber from '../number/is';

//  Check if a number is below a reference number
export default function isBelow (val, ref) {
    if (!isNumber(val) || !isNumber(ref)) return false;
    return val < ref;
}
