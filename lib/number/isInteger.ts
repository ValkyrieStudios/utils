/**
 * Check whether or not a provided value is an integer
 *
 * @param {unknown} val - Value to verify
 */
function isInteger (val:unknown):val is number {
    return Number.isInteger(val);
}

export {isInteger, isInteger as default};
