'use strict';

import isDate from './is.js';

export default function toUnix (val) {
    if (!isDate(val)) throw new Error('toUnix requires a date object');

    return Math.floor(val.valueOf()/1000);
}
