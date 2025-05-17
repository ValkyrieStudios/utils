/**
 * Check whether or not a provided value is a string with content
 *
 * @param {unknown} val - Value to verify
 * @param {boolean} trimmed - (default=true) Trim the string or not
 */
function isNotEmptyString (val:unknown, trimmed:boolean=true):val is string {
    if (typeof val !== 'string') return false;
    if (trimmed) {
        for (let i = 0; i < val.length; i++) {
            switch (val[i]) {
                case ' ':
                case '\t':
                case '\n':
                case '\r':
                    break;
                default:
                    return true;
            }
        }
        return false;
    }
    return val.length > 0;
}

export {isNotEmptyString, isNotEmptyString as default};
