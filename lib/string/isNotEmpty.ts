/**
 * Check whether or not a provided value is a string with content
 *
 * @param val - Value to verify
 * @param trimmed  - (default=true) Trim the string or not
 *
 * @returns Whether or not the value is a string with content
 */
function isNotEmptyString (val:unknown, trimmed:boolean=true):val is string {
    if (typeof val !== 'string') return false;
    return (trimmed === true ? val.trim() : val).length > 0;
}

export {isNotEmptyString, isNotEmptyString as default};
