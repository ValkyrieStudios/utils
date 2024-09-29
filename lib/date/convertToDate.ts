import {isDate} from './is';

/**
 * Convert a value to a Date object if possible, handles Date objects and strings
 *
 * @param {Date|string} val - Value to convert
 */
function convertToDate (val: Date | string | number): Date | null {
    if (isDate(val)) {
        return val;
    } else if (typeof val === 'string') {
        const date = new Date(val);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    return null;
}

export {convertToDate, convertToDate as default};
