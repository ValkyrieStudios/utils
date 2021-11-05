'use strict';

import isNumber         from './is';
import isNumericalNaN   from './isNumericalNaN';

//  Round a numeric value to a certain precision
export default function (val, precision = 0) {
    if (!isNumber(val) || isNumericalNaN(val)) {
        throw new TypeError('Value should be numeric');
    }

    if (precision === false || precision < 1) {
        return Math.round(val);
    }

    const exp = Math.pow(10, Math.round(precision));
    return Math.round(val * exp) / exp;
}
