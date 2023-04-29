'use strict';

import isNumber         from './is';
import isIntegerAbove 	from './isIntegerAbove';

//  Round a numeric value to a certain precision
export default function round (val, precision = 0) {
    if (!isNumber(val)) throw new TypeError('Value should be numeric');

    const exp = Math.pow(10, isIntegerAbove(precision, 0) ? precision : 0);
    const num = (val * exp) * (1 + Number.EPSILON);
    return Math.round(num)/exp;
}
