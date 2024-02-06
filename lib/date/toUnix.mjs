'use strict';

import isDate from './is.mjs';

export default function toUnix (val) {
    if (
        !isDate(val)
    ) throw new TypeError('toUnix requires a date object');

    return Math.floor(val.valueOf()/1000);
}
