'use strict';

import isNumericalNaN from './isNumericalNaN';

export default function (val) {
    if (isNumericalNaN(val)) return false;
    return typeof val === 'number' || val instanceof Number;
}
