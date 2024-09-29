import {convertToDate} from './convertToDate';

export type AddUTCKey = 'years'
    | 'year'
    | 'months'
    | 'month'
    | 'days'
    | 'day'
    | 'hours'
    | 'hour'
    | 'minutes'
    | 'minute'
    | 'seconds'
    | 'second'
    | 'milliseconds'
    | 'millisecond';

/**
 * Adds the provided amount of a specific key to the provided date
 *
 * @param {Date|string} val - Date to set to end of
 * @param {number} amount - (default=0) Amount of key to add
 * @param {AddUTCKey} key - (default='millisecond') Key to set
 */
function addUTC (
    val:Date|string,
    amt:number=0,
    key:AddUTCKey = 'millisecond'
):Date {
    if (!Number.isInteger(amt)) throw new TypeError('Amount needs to be an integer');

    const n_val = convertToDate(val);
    if (n_val === null) throw new TypeError('addUTC requires a date object');

    const year  = n_val.getUTCFullYear();
    const month = n_val.getUTCMonth();
    const date  = n_val.getUTCDate();
    const hour  = n_val.getUTCHours();
    const min   = n_val.getUTCMinutes();
    const sec   = n_val.getUTCSeconds();
    const ms    = n_val.getUTCMilliseconds();

    switch (key) {
        case 'years':
        case 'year':
            return new Date(Date.UTC(year + amt, month, date, hour, min, sec, ms));
        case 'months':
        case 'month':
            return new Date(Date.UTC(year, month + amt, date, hour, min, sec, ms));
        case 'days':
        case 'day':
            return new Date(Date.UTC(year, month, date + amt, hour, min, sec, ms));
        case 'hours':
        case 'hour':
            return new Date(Date.UTC(year, month, date, hour + amt, min, sec, ms));
        case 'minutes':
        case 'minute':
            return new Date(Date.UTC(year, month, date, hour, min + amt, sec, ms));
        case 'seconds':
        case 'second':
            return new Date(Date.UTC(year, month, date, hour, min, sec + amt, ms));
        case 'milliseconds':
        case 'millisecond':
            return new Date(Date.UTC(year, month, date, hour, min, sec, ms + amt));
        default:
            return new Date(Date.UTC(year, month, date, hour, min, sec, ms));
    }
}

export {addUTC, addUTC as default};
