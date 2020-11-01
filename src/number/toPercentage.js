'use strict';

import isNumber         from './is';
import isNumericalNaN   from './isNumericalNaN';
import round            from './round';

//  Convert a float value to a percentage
export default function (val, precision = 0, min = 0, max = 1) {
    if (!isNumber(val) || isNumericalNaN(val)) {
        throw new TypeError('Value should be numeric');
    }

    if (!isNumber(min) || isNumericalNaN(min)) {
        throw new TypeError('Value should be numeric');
    }

    if (!isNumber(max) || isNumericalNaN(max)) {
        throw new TypeError('Value should be numeric');
    }

    return round(((val - min)/ (max - min)) * 100, precision);
}
