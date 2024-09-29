import {convertToDate} from './convertToDate';

export type StartOfUTCKey = 'year'
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

const WEEK_START = new Map([
    ['week', 1], /* Original lib cases only contained week and historical was monday */
    ['week_sun', 0],
    ['week_mon', 1],
    ['week_tue', 2],
    ['week_wed', 3],
    ['week_thu', 4],
    ['week_fri', 5],
    ['week_sat', 6],
]);

/**
 * Sets the provided date to start of UTC of provided key
 *
 * @param {Date|string} val - Date to set to start of
 * @param {StartOfUTCKey} key - (default='millisecond') Key to set
 */
function startOfUTC (
    val:Date|string,
    key:StartOfUTCKey = 'millisecond'
):Date {
    const n_val = convertToDate(val);
    if (n_val === null) throw new TypeError('startOfUTC requires a date object');

    const year = n_val.getUTCFullYear();

    switch (key) {
        case 'year':
            return new Date(Date.UTC(year, 0));
        case 'quarter': {
            const UTC_MONTH = n_val.getUTCMonth();
            return new Date(Date.UTC(year, UTC_MONTH - (UTC_MONTH % 3)));
        }
        case 'month':
            return new Date(Date.UTC(year, n_val.getUTCMonth()));
        case 'week':
        case 'week_sun':
        case 'week_mon':
        case 'week_tue':
        case 'week_wed':
        case 'week_thu':
        case 'week_fri':
        case 'week_sat': {
            const UTC_DAY = n_val.getUTCDay();
            const UTC_SOD = WEEK_START.get(key) as number;
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth(),
                n_val.getUTCDate() - (UTC_DAY < UTC_SOD ? (7 - UTC_SOD) + UTC_DAY : UTC_DAY - UTC_SOD)
            ));
        }
        case 'day':
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth(),
                n_val.getUTCDate()
            ));
        case 'hour':
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth(),
                n_val.getUTCDate(),
                n_val.getUTCHours()
            ));
        case 'minute':
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth(),
                n_val.getUTCDate(),
                n_val.getUTCHours(),
                n_val.getUTCMinutes()
            ));
        case 'second':
            return new Date(Date.UTC(
                year,
                n_val.getUTCMonth(),
                n_val.getUTCDate(),
                n_val.getUTCHours(),
                n_val.getUTCMinutes(),
                n_val.getUTCSeconds()
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

export {startOfUTC, startOfUTC as default};
