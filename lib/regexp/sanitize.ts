const RGX = /[.*+\-?^${}()|[\]\\]/g;

/**
 * Sanitize the provided string input for safe usage within a RegExp, this
 * ensures automatic escaping of characters that have special meaning in regexp.
 *
 * For more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
 *
 * @param {string} val - Value to sanitize
 */
function sanitizeRegExp (val:string):string|false {
    if (typeof val !== 'string') return false;
    return val.trim().replace(RGX, '\\$&');
}

export {sanitizeRegExp, sanitizeRegExp as default};
