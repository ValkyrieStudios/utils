import {convertToDate} from './convertToDate';

export type EndOfUTCKey = 'year'
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
    | 'millisecond';

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
 * @param {Date|string} val - Date to set to end of
 * @param {EndOfUTCKey} key - (default='millisecond') Key to set
 */
function endOfUTC (
    val:Date|string,
    key:EndOfUTCKey = 'millisecond'
):Date {
    const n_val = convertToDate(val);
    if (n_val === null) throw new TypeError('endOfUTC requires a date object');

    const year = n_val.getUTCFullYear();

    switch (key) {
        case 'year':
            return new Date(Date.UTC(
                year,
                11,
                31,
                23,
                59,
                59,
                999
            ));
        case 'quarter': {
            const UTC_MONTH = n_val.getUTCMonth();
            return new Date(Date.UTC(
                year,
                (UTC_MONTH - (UTC_MONTH % 3)) + 3,
                0,
                23,
                59,
                59,
                999
            ));
        }
        case 'month':
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth() + 1,
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
            const UTC_DAY = n_val.getUTCDay();
            const UTC_EOD = WEEK_END.get(key) as number;
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth(),
                n_val.getUTCDate() + (UTC_DAY <= UTC_EOD ? UTC_EOD - UTC_DAY : (7 - UTC_DAY) + UTC_EOD),
                23,
                59,
                59,
                999
            ));
        }
        case 'day':
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth(),
                n_val.getUTCDate(),
                23,
                59,
                59,
                999
            ));
        case 'hour':
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth(),
                n_val.getUTCDate(),
                n_val.getUTCHours(),
                59,
                59,
                999
            ));
        case 'minute':
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth(),
                n_val.getUTCDate(),
                n_val.getUTCHours(),
                n_val.getUTCMinutes(),
                59,
                999
            ));
        case 'second':
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth(),
                n_val.getUTCDate(),
                n_val.getUTCHours(),
                n_val.getUTCMinutes(),
                n_val.getUTCSeconds(),
                999
            ));
        default:
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth(),
                n_val.getUTCDate(),
                n_val.getUTCHours(),
                n_val.getUTCMinutes(),
                n_val.getUTCSeconds(),
                n_val.getUTCMilliseconds()
            ));
    }
}

export {endOfUTC, endOfUTC as default};
