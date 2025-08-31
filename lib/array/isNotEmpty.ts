/**
 * Check whether or not a provided value is an array with content
 *
 * @param {unknown} val - Value to verify
 */
function isNotEmptyArray <T = unknown> (val:unknown):val is T[] {
    return Array.isArray(val) && val.length !== 0;
}

export {isNotEmptyArray, isNotEmptyArray as default};
