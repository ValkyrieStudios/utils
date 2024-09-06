/**
 * Check whether or not a provided value is a string
 *
 * @param {unknown} val - Value to verify
 */
function isString (val:unknown):val is string {
    return typeof val === 'string';
}

export {isString, isString as default};
