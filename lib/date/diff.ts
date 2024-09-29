import {convertToDate} from './convertToDate';

export type DiffKey = 'week'
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
    | 'milliseconds';

const SECOND_IN_MILLISECONDS    = 1000;
const MINUTE_IN_MILLISECONDS    = SECOND_IN_MILLISECONDS * 60;
const HOUR_IN_MILLISECONDS      = MINUTE_IN_MILLISECONDS * 60;
const DAY_IN_MILLISECONDS       = HOUR_IN_MILLISECONDS * 24;
const WEEK_IN_MILLISECONDS      = DAY_IN_MILLISECONDS * 7;

/**
 * Compute the diff between two dates in the provided key
 *
 * @param {Date|string} val_a - Date to diff against
 * @param {Date|string} val_b - Date to diff with
 * @param {DiffKey} key - (default='millisecond') Key to diff in
 */
function diff (
    val_a:Date|string,
    val_b:Date|string,
    key:DiffKey = 'millisecond'
):number {
    const n_val_a = convertToDate(val_a);
    const n_val_b = convertToDate(val_b);
    if (
        n_val_a === null ||
        n_val_b === null
    ) throw new TypeError('Diff requires date objects for both values');

    /* Get difference in milliseconds */
    const diff_in_ms = n_val_a.valueOf() - n_val_b.valueOf();

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
