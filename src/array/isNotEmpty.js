'use strict';

import isArray from './is';

export default function (val) {
    if (!isArray(val)) return false;
    return val.length !== 0;
}
