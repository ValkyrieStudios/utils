'use strict';

import isDate from './is';

/**
 * Adds the provided amount of a specific key to the provided date
 *
 * @param val - Date to set to end of
 * @param amount - (default=0) Amount of key to add
 * @param key - (default='millisecond') Key to set
 *
 * @returns New date with provided amount of key added
 */
function addUTC (
    val:Date,
    amt:number=0,
    key:'years'
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
        | 'millisecond' = 'millisecond'
):Date {
    if (
        !isDate(val)
    ) throw new TypeError('addUTC requires a date object');

    if (
        !Number.isInteger(amt)
    ) throw new TypeError('Amount needs to be an integer');

    if (
        typeof key !== 'string'
    ) throw new TypeError('Key needs to be a string with content');

    const year  = val.getUTCFullYear();
    const month = val.getUTCMonth();
    const date  = val.getUTCDate();
    const hour  = val.getUTCHours();
    const min   = val.getUTCMinutes();
    const sec   = val.getUTCSeconds();
    const ms    = val.getUTCMilliseconds();

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
