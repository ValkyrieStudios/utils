import {convertToDate} from './convertToDate';
import {isIntegerBetween} from '../number/isIntegerBetween';

export type TimeProps = {
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
};

/**
 * Sets the time on a provided date object and returns it
 *
 * @param {Date|string} val - Date to set the time for
 * @param {TimeProps} props - Time props to set the time to
 */
function setTimeUTC (
    val:Date|string,
    props:TimeProps
):Date {
    const n_val = convertToDate(val);
    if (n_val === null) throw new TypeError('setTimeUTC requires a date object');

    /* Destructure so we don't have unnecessary key lookups */
    const {hour, minute, second, millisecond} = props || {};

    return new Date(Date.UTC(
        n_val.getUTCFullYear(),
        n_val.getUTCMonth(),
        n_val.getUTCDate(),
        isIntegerBetween(hour, 0, 23) ? hour : n_val.getUTCHours(),
        isIntegerBetween(minute, 0, 59) ? minute : n_val.getUTCMinutes(),
        isIntegerBetween(second, 0, 59) ? second : n_val.getUTCSeconds(),
        isIntegerBetween(millisecond, 0, 999) ? millisecond : n_val.getUTCMilliseconds()
    ));
}

export {setTimeUTC, setTimeUTC as default};
