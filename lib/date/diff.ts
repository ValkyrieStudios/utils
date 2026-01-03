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

const INV_SECOND_IN_MILLISECONDS    = 1.0 / 1000;
const INV_MINUTE_IN_MILLISECONDS    = 1.0 / (60 * 1000);
const INV_HOUR_IN_MILLISECONDS      = 1.0 / (60 * 60 * 1000);
const INV_DAY_IN_MILLISECONDS       = 1.0 / (24 * 60 * 60 * 1000);
const INV_WEEK_IN_MILLISECONDS      = 1.0 / (7 * 24 * 60 * 60 * 1000);

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
            return diff_in_ms * INV_WEEK_IN_MILLISECONDS;
        case 'day':
        case 'days':
            return diff_in_ms * INV_DAY_IN_MILLISECONDS;
        case 'hour':
        case 'hours':
            return diff_in_ms * INV_HOUR_IN_MILLISECONDS;
        case 'minute':
        case 'minutes':
            return diff_in_ms * INV_MINUTE_IN_MILLISECONDS;
        case 'second':
        case 'seconds':
            return diff_in_ms * INV_SECOND_IN_MILLISECONDS;
        default:
            return diff_in_ms;
    }
}

export {diff, diff as default};
