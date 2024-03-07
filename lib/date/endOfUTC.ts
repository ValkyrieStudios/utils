'use strict';

import isDate from './is';

/**
 * Take note: this is the end of week key for weeks starting on key,
 * eg: end of week for week_mon is sunday as the week starts on monday and ends on sunday
 */
const WEEK_END = new Map([
    ['week', 0], /* Original lib cases only contained week and historical was monday */
    ['week_sun', 6],
    ['week_mon', 0],
    ['week_tue', 1],
    ['week_wed', 2],
    ['week_thu', 3],
    ['week_fri', 4],
    ['week_sat', 5],
]);

/**
 * Sets the provided date to end of UTC of provided key
 *
 * @param val - Date to set to end of
 * @param key - (default='millisecond') Key to set
 *
 * @returns New date set to end of key
 */
export default function endOfUTC (
    val:Date,
    key:'year'
		| 'quarter'
		| 'month'
		| 'week'
		| 'week_sun'
		| 'week_mon'
		| 'week_tue'
		| 'week_wed'
		| 'week_thu'
		| 'week_fri'
		| 'week_sat'
		| 'day'
		| 'hour'
		| 'minute'
		| 'second'
		| 'millisecond' = 'millisecond'
):Date {
    if (
        !isDate(val)
    ) throw new TypeError('endOfUTC requires a date object');

    if (
        typeof key !== 'string'
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
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                (val.getUTCMonth() - (val.getUTCMonth() % 3)) + 3,
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
        case 'week':
        case 'week_sun':
        case 'week_mon':
        case 'week_tue':
        case 'week_wed':
        case 'week_thu':
        case 'week_fri':
        case 'week_sat': {
            const UTC_DAY = val.getUTCDay();
            const UTC_EOD = WEEK_END.get(key);
            return new Date(Date.UTC(
                val.getUTCFullYear(),
                val.getUTCMonth(),
                val.getUTCDate() + (UTC_DAY <= UTC_EOD ? UTC_EOD - UTC_DAY : (7 - UTC_DAY) + UTC_EOD),
                23,
                59,
                59,
                999
            ));
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
