/**
 * Sanitize the provided string input for safe usage within a RegExp, this
 * ensures automatic escaping of characters that have special meaning in
 * regexp
 *
 * @param val - Value to sanitize
 * @returns Sanitized value
 */
declare function sanitizeRegExp(val:string):string;
export = sanitizeRegExp;
