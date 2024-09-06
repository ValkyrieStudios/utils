/**
 * Check whether or not a provided value is a Function
 *
 * @param {unknown} val - Value to verify
 */
function isFunction (val:unknown):val is (...args:unknown[]) => unknown {
    return typeof val === 'function';
}

export {isFunction, isFunction as default};
