/**
 * Check whether or not a provided value is an array
 *
 * @param {unknown} val - Value to verify
 */
function isArray (val:unknown):val is unknown[] {
    return Array.isArray(val);
}

export {isArray, isArray as default};
