/**
 * Check whether or not a provided value is a string with content
 *
 * @param {unknown} val - Value to verify
 * @param {boolean} trimmed - (default=true) Trim the string or not
 */
function isNotEmptyString (val:unknown, trimmed:boolean=true):val is string {
    if (typeof val !== 'string') return false;
    return (trimmed === true ? val.trim() : val).length > 0;
}

export {isNotEmptyString, isNotEmptyString as default};
