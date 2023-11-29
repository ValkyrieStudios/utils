'use strict';

export default function toUnix (val) {
    if (
        !(val instanceof Date)
    ) throw new TypeError('toUnix requires a date object');

    return Math.floor(val.valueOf()/1000);
}
