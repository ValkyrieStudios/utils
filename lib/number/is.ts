/**
 * Check whether or not a provided value is a number
 *
 * @param {unknown} val - Value to verify
 */
function isNumber (val:unknown):val is number {
    return Number.isFinite(val);
}

export {isNumber, isNumber as default};
