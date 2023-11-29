'use strict';

import isNotEmptyString from '../string/isNotEmpty.js';

const WEEK_START = {
    week    : 1, // Original lib cases only contained week and historical was monday
    week_sun: 0,
    week_mon: 1,
    week_tue: 2,
    week_wed: 3,
    week_thu: 4,
    week_fri: 5,
    week_sat: 6,
};

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
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth() - (val.getUTCMonth() % 3),
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
        case 'week':
        case 'week_sun':
        case 'week_mon':
        case 'week_tue':
        case 'week_wed':
        case 'week_thu':
        case 'week_fri':
        case 'week_sat': {
            const UTC_DAY = val.getUTCDay();
            const UTC_SOD = WEEK_START[key];

            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate() - (UTC_DAY < UTC_SOD ? (7 - UTC_SOD) + UTC_DAY : UTC_DAY - UTC_SOD),
                0,
                0,
                0,
                0
            ));
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
