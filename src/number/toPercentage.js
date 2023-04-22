'use strict';

import isNumber from './is';
import round    from './round';

//  Convert a float value to a percentage
export default function toPercentage (val, precision = 0, min = 0, max = 1) {
    if (
        !isNumber(val) ||
        !isNumber(min) ||
        !isNumber(max)
    ) throw new TypeError('Value should be numeric');

    return round(((val - min)/ (max - min)) * 100, precision);
}
