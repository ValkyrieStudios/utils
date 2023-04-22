'use strict';

import isNumber         from './is';
import isIntegerAbove 	from './isIntegerAbove';

//  Round a numeric value to a certain precision
export default function round (val, precision = 0) {
    if (!isNumber(val)) throw new TypeError('Value should be numeric');

    //	If precision is not above 0 -> do nothing
    if (!isIntegerAbove(precision, 0)) return Math.round(val);

    return Number(Math.round(val+'e'+precision)+'e-'+precision);
}
