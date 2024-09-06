/**
 * Check whether or not a provided value is a boolean
 *
 * @param {unknown} val - Value to verify
 */
function isBoolean (val:unknown):val is boolean {
    return val === true || val === false;
}

export {isBoolean, isBoolean as default};
