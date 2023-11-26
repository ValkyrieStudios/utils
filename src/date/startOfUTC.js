'use strict';

import isNotEmptyString from '../string/isNotEmpty.js';

export default function startOfUTC (val, key) {
    if (
        !(val instanceof Date)
    ) throw new TypeError('startOfUTC requires a date object');

    if (
        !isNotEmptyString(key)
    ) throw new TypeError('Key needs to be a string with content');

    switch (key) {
        case 'year':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                0,
                1,
                0,
                0,
                0,
                0
            ));
        case 'quarter': {
            const new_quarter = val.getUTCMonth() - (val.getUTCMonth() % 3);
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                new_quarter > 0 ? new_quarter : 0,
                1,
                0,
                0,
                0,
                0
            ));
        }
        case 'month':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                1,
                0,
                0,
                0,
                0
            ));
        case 'week': {
            const date = new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                0,
                0,
                0,
                0
            ));
            const subtract = date.getUTCDay() || 7;
            if (subtract !== 1) date.setUTCDate(date.getUTCDate() - subtract + 1);
            return date;
        }
        case 'week_sun': {
            const date = new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                0,
                0,
                0,
                0
            ));
            const subtract = date.getUTCDay();
            if (subtract !== 0) date.setUTCDate(date.getUTCDate() - subtract);
            return date;
        }
        case 'day':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                0,
                0,
                0,
                0
            ));
        case 'hour':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                val.getUTCHours(),
                0,
                0,
                0
            ));
        case 'minute':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                val.getUTCHours(),
                val.getUTCMinutes(),
                0,
                0
            ));
        case 'second':
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate(),
                val.getUTCHours(),
                val.getUTCMinutes(),
                val.getUTCSeconds(),
                0
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
