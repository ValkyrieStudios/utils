import {isDate} from './is';
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
 * @param {Date} val - Date to set the time for
 * @param {Time} props - Time props to set the time to
 * @returns {Date} New date with provided amount of key added
 */
function setTimeUTC (
    val:Date,
    props:TimeProps
):Date {
    if (!isDate(val)) throw new TypeError('setTimeUTC requires a date object');

    return new Date(Date.UTC(
        val.getUTCFullYear(),
        val.getUTCMonth(),
        val.getUTCDate(),
        isIntegerBetween(props?.hour, 0, 23) ? props.hour : val.getUTCHours(),
        isIntegerBetween(props?.minute, 0, 59) ? props?.minute : val.getUTCMinutes(),
        isIntegerBetween(props?.second, 0, 59) ? props?.second : val.getUTCSeconds(),
        isIntegerBetween(props?.millisecond, 0, 999) ? props?.millisecond : val.getUTCMilliseconds()
    ));
}

export {setTimeUTC, setTimeUTC as default};
