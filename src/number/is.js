'use strict';

import isNumericalNaN from './isNumericalNaN';

export default function (val) {
    return (typeof val === 'number' || isNumericalNaN(val) || val instanceof Number);
}

