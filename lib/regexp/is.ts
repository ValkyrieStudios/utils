/**
 * Check whether or not a provided value is a RegExp instance
 *
 * @param {unknown} val - Value to verify
 */
function isRegExp (val:unknown):val is RegExp {
    return val instanceof RegExp;
}

export {isRegExp, isRegExp as default};
