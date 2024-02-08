/**
 * Sanitize the provided string input for safe usage within a RegExp, this
 * ensures automatic escaping of characters that have special meaning in regexp.
 *
 * For more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
 *
 * @param val - Value to sanitize
 *
 * @returns Sanitized value
 */
export default function sanitizeRegExp(val: string): string | false;
