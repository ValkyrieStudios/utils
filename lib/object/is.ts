/**
 * Check whether or not a provided value is an object
 *
 * @param {unknown} val - Value to verify
 */
function isObject <T extends Record<string, unknown> = Record<string, unknown>> (val:T|unknown):val is T {
    return Object.prototype.toString.call(val) === '[object Object]';
}

export {isObject, isObject as default};
