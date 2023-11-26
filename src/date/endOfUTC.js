'use strict';

import isNotEmptyString from '../string/isNotEmpty.js';

export default function endOfUTC (val, key) {
    if (
        !(val instanceof Date)
    ) throw new TypeError('endOfUTC requires a date object');

    if (
        !isNotEmptyString(key)
    ) throw new TypeError('Key needs to be a string with content');

    switch (key) {
        case 'year':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                11,
                31,
                23,
                59,
                59,
                999
            ));
        case 'quarter': {
            const new_quarter = val.getUTCMonth() - (val.getUTCMonth() % 3);
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                new_quarter > 0 ? new_quarter + 3 : 3,
                0,
                23,
                59,
                59,
                999
            ));
        }
        case 'month':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth() + 1,
                0,
                23,
                59,
                59,
                999
            ));
        case 'week': {
            const date = new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                23,
                59,
                59,
                999
            ));
            const day = date.getUTCDay();
            if (day !== 0) date.setUTCDate(date.getUTCDate() + (7 - day));
            return date;
        }
        case 'week_sun': {
            const date = new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                23,
                59,
                59,
                999
            ));
            const day = date.getUTCDay();
            if (day !== 6) date.setUTCDate(date.getUTCDate() + (6 - day));
            return date;
        }
        case 'day':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                23,
                59,
                59,
                999
            ));
        case 'hour':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                val.getUTCHours(),
                59,
                59,
                999
            ));
        case 'minute':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                val.getUTCHours(),
                val.getUTCMinutes(),
                59,
                999
            ));
        case 'second':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                val.getUTCHours(),
                val.getUTCMinutes(),
                val.getUTCSeconds(),
                999
            ));
        default:
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
}
