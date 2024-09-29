import {convertToDate} from './convertToDate';

/**
 * Check whether or not a provided value is a leap year
 *
 * @param {Date|string} val - Value to verify
 */
function isLeap (val:Date|string):boolean {
    const n_val = convertToDate(val);
    if (n_val === null)  return false;

    const year = n_val.getUTCFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export {isLeap, isLeap as default};
