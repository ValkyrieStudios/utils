'use strict';

import isDate from './is.mjs';

export default function toUTC (val) {
    if (
        !isDate(val)
    ) throw new TypeError('toUTC requires a date object');

    return new Date(Date.UTC(
        val.getUTCFullYear(),
        val.getUTCMonth(),
        val.getUTCDate(),
        val.getUTCHours(),
        val.getUTCMinutes(),
        val.getUTCSeconds(),
        val.getUTCMilliseconds()
    ));
}
