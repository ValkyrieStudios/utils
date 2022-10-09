'use strict';

import isNumber from './is';

export default function (val) {
    if (!isNumber(val)) return false;
    return Number.isInteger(val);
}
