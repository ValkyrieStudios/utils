'use strict';

import isDate           from './is';
import isInteger        from '../number/isInteger';
import isNotEmptyString from '../string/isNotEmpty';

export default function addUTC (val, amount, key) {
    if (!isDate(val)) throw new Error('Date To UTC requires a date object');
    if (!isInteger(amount)) throw new Error('Amount needs to be an integer');
    if (!isNotEmptyString(key)) throw new Error('Key needs to be a string with content');

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
        default:
            return copy;
    }
}
