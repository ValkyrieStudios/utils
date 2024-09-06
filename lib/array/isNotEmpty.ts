/**
 * Check whether or not a provided value is an array with content
 *
 * @param {unknown} val - Value to verify
 */
function isNotEmptyArray (val:unknown):val is unknown[] {
    return Array.isArray(val) && val.length !== 0;
}

export {isNotEmptyArray, isNotEmptyArray as default};
