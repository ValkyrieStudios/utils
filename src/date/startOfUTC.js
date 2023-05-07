'use strict';

import isDate from './is';
import isNotEmptyString from '../string/isNotEmpty';

export default function startOfUTC (val, key) {
    if (!isDate(val)) throw new Error('Date To UTC requires a date object');
    if (!isNotEmptyString(key)) throw new Error('Key needs to be a string with content');

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
            return val;
    }
}
