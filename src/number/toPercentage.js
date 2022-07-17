'use strict';

import isNumber from './is';
import round    from './round';

//  Convert a float value to a percentage
export default function (val, precision = 0, min = 0, max = 1) {
    if (!isNumber(val)) throw new TypeError('Value should be numeric');

    if (!isNumber(min)) throw new TypeError('Value should be numeric');

    if (!isNumber(max)) throw new TypeError('Value should be numeric');

    return round(((val - min)/ (max - min)) * 100, precision);
}
