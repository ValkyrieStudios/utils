/**
 * Chceck whether or not a provided value is an async function
 *
 * @param {unknown} val - Value to verify
 */
function isAsyncFunction (val:unknown):val is (...args:unknown[]) => Promise<unknown> {
    return typeof val === 'function' && val.constructor.name === 'AsyncFunction';
}

export {isAsyncFunction, isAsyncFunction as default};
