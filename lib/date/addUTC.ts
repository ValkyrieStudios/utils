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
export default function addUTC (
    val:Date,
	amount:number=0,
	key: 'years'
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
        !Number.isInteger(amount)
    ) throw new TypeError('Amount needs to be an integer');

    if (
        typeof key !== 'string'
    ) throw new TypeError('Key needs to be a string with content');

    const copy = new Date(Date.UTC(
        val.getUTCFullYear(),
        val.getUTCMonth(),
        val.getUTCDate(),
        val.getUTCHours(),
        val.getUTCMinutes(),
        val.getUTCSeconds(),
        val.getUTCMilliseconds()
    ));

    switch (key) {
        case 'years':
        case 'year': {
            copy.setUTCFullYear(copy.getUTCFullYear() + amount);
            return copy;
        }
        case 'months':
        case 'month': {
            copy.setUTCMonth(copy.getUTCMonth() + amount);
            return copy;
        }
        case 'days':
        case 'day': {
            copy.setUTCDate(copy.getUTCDate() + amount);
            return copy;
        }
        case 'hours':
        case 'hour': {
            copy.setUTCHours(copy.getUTCHours() + amount);
            return copy;
        }
        case 'minutes':
        case 'minute': {
            copy.setUTCMinutes(copy.getUTCMinutes() + amount);
            return copy;
        }
        case 'seconds':
        case 'second': {
            copy.setUTCSeconds(copy.getUTCSeconds() + amount);
            return copy;
        }
        case 'milliseconds':
        case 'millisecond': {
            copy.setUTCMilliseconds(copy.getUTCMilliseconds() + amount);
            return copy;
        }
        default:
            return copy;
    }
}
