'use strict';

import is from './is';

export default function (val) {
    if (!is(val)) return false;
    return Object.keys(val).length !== 0;
}
