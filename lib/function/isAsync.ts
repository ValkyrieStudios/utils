/**
 * Chceck whether or not a provided value is an async function
 *
 * @param val - Value to verify
 *
 * @returns Whether or not the value is an async function
 */
function isAsyncFunction (val:unknown):val is (...args:unknown[]) => Promise<unknown> {
    return typeof val === 'function' && val.constructor.name === 'AsyncFunction';
}

export {isAsyncFunction, isAsyncFunction as default};
