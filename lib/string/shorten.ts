/**
 * Shorten a string and add a postfix if it goes over a specific length, will autotrim value.
 *
 * @param {string} val - String value to shorten
 * @param {number} length - Length to shorten it to
 * @param {string} postfix - (default:'...') Postfix to use in case the string got shortened
 * @param {boolean?} truncate_words - (default:true) Truncate words or not
 */
function shorten (val:string, length:number, postfix:string='...', truncate_words:boolean=true):string {
    /* Return empty string if value passed is not a string */
    if (typeof val !== 'string') return '';

    /* Return original value if options are invalid */
    if (typeof postfix !== 'string' || !Number.isInteger(length) || length <= 0) return val;

    /* Trim the input string */
    const sanitized = val.trim();

    /* If no truncation needs to be done do nothing */
    if (sanitized.length <= length) return sanitized;

    /* Get the initial truncated substring */
    const truncated = sanitized.substring(0, length);

    /* If word truncation is allowed return concatenated with postfix */
    if (truncate_words) return truncated+postfix;

    /* Shorten while keeping words intact */
    let end = length;
    while (end && sanitized[end] !== ' ' && sanitized[end - 1] !== ' ') {
        end--;
    }

    return sanitized.substring(0, end).trimEnd() + postfix;
}

export {shorten, shorten as default};
