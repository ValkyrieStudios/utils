/**
 * Check whether or not a provided value is a Date
 *
 * @param {unknown} val - Value to verify
 */
function isDate (val:unknown):val is Date {
    /* eslint-disable-next-line */
    /* @ts-ignore */
    return val instanceof Date && !isNaN(val as number);
}

export {isDate, isDate as default};
