/**
 * Check whether or not a provided value is a boolean
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is a boolean
 */
function isBoolean (val:unknown):val is boolean {
    return val === true || val === false;
}

export {isBoolean, isBoolean as default};
