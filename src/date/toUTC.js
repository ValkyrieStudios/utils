'use strict';

import isDate from './is.js';

export default function toUTC (val) {
    if (!isDate(val)) throw new Error('Date To UTC requires a date object');

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
