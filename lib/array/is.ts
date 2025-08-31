/**
 * Check whether or not a provided value is an array
 *
 * @param {unknown} val - Value to verify
 */
function isArray <T = unknown> (val:unknown):val is T[] {
    return Array.isArray(val);
}

export {isArray, isArray as default};
