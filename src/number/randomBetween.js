'use strict';

import isNumber         from './is';
import isNumericalNaN   from './isNumericalNaN';

//  Generate random between min and max
export default function (min = 0, max = 10) {
    if (!isNumber(min) || isNumericalNaN(min)) {
        throw new TypeError('Min should be numeric');
    }

    if (!isNumber(max) || isNumericalNaN(max)) {
        throw new TypeError('Max should be numeric');
    }

    return (Math.random() * max) + min;
}
