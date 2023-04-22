'use strict';

import isArray from './is';

export default function isNotEmptyArray (val) {
    if (!isArray(val)) return false;
    return val.length !== 0;
}
