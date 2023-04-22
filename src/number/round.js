'use strict';

import isNumber         from './is';
import isNumberAbove 	from './isAbove';

//  Round a numeric value to a certain precision
export default function round (val, precision = 0) {
    if (!isNumber(val)) throw new TypeError('Value should be numeric');

    //	If precision is not above 0 -> do nothing
    if (!isNumberAbove(precision, 0)) return Math.round(val);

    const exp = Math.pow(10, Math.ceil(precision));
    return Math.round(val * exp) / exp;
}
