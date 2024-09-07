import {isDate} from './is';

/**
 * Check whether or not a provided value is a leap year
 *
 * @param {Date} val - Value to verify
 */
function isLeap (val:Date):boolean {
    if (!isDate(val)) return false;
    const year = val.getUTCFullYear();
    return (((year % 4) === 0) && ((year % 100) !== 0)) || ((year % 400) === 0);
}

export {isLeap, isLeap as default};
