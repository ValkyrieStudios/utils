import {isDate} from './is';

/**
 * Sets a passed date to UTC
 *
 * @param {Date} val - Date to set to UTC
 */
function toUTC (val:Date):Date {
    if (
        !isDate(val)
    ) throw new TypeError('toUTC requires a date object');

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

export {toUTC, toUTC as default};
