'use strict';

import isDate from './is';

const SECOND_IN_MILLISECONDS    = 1000;
const MINUTE_IN_MILLISECONDS    = SECOND_IN_MILLISECONDS * 60;
const HOUR_IN_MILLISECONDS      = MINUTE_IN_MILLISECONDS * 60;
const DAY_IN_MILLISECONDS       = HOUR_IN_MILLISECONDS * 24;
const WEEK_IN_MILLISECONDS      = DAY_IN_MILLISECONDS * 7;

/**
 * Compute the diff between two dates in the provided key
 *
 * @param val_a - Date to diff against
 * @param val_b - Date to diff with
 * @param key - (default='millisecond') Key to diff in
 *
 * @returns Numerical diff between two dates
 */
function diff (
    val_a:Date,
    val_b:Date,
    key:'week'
        | 'weeks'
        | 'day'
        | 'days'
        | 'hour'
        | 'hours'
        | 'minute'
        | 'minutes'
        | 'second'
        | 'seconds'
        | 'millisecond'
        | 'milliseconds' = 'millisecond'
):number {
    if (
        !isDate(val_a) ||
        !isDate(val_b)
    ) throw new TypeError('Diff requires date objects for both values');

    if (
        typeof key !== 'string'
    ) throw new TypeError('Key needs to be a string');

    /* Get difference in milliseconds */
    const diff_in_ms = val_a.valueOf() - val_b.valueOf();

    switch (key) {
        case 'week':
        case 'weeks':
            return diff_in_ms/WEEK_IN_MILLISECONDS;
        case 'day':
        case 'days':
            return diff_in_ms/DAY_IN_MILLISECONDS;
        case 'hour':
        case 'hours':
            return diff_in_ms/HOUR_IN_MILLISECONDS;
        case 'minute':
        case 'minutes':
            return diff_in_ms/MINUTE_IN_MILLISECONDS;
        case 'second':
        case 'seconds':
            return diff_in_ms/SECOND_IN_MILLISECONDS;
        default:
            return diff_in_ms;
    }
}

export {diff, diff as default};
