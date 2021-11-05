'use strict';

import isString from './is';

export default function (val, trimmed = true) {
    if (!isString(val)) return false;
    return (trimmed ? val.trim() : val).length !== 0;
}
