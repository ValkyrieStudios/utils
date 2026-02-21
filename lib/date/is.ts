/**
 * Check whether or not a provided value is a Date
 *
 * @param {unknown} val - Value to verify
 */
function isDate (val:unknown):val is Date {
    return val instanceof Date && val.getTime() === val.getTime();
}

export {isDate, isDate as default};
