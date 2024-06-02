/**
 * Check whether or not a provided value is a Function
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is a Function
 */
function isFunction (val:unknown):val is (...args:unknown[]) => unknown {
    return typeof val === 'function';
}

export {isFunction, isFunction as default};
