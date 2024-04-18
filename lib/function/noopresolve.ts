'use strict';

/**
 * No-Operation (noop) resolver that simply returns a promise
 * that resolves with the value that was passed to it
 *
 * @param val - Value to be resolved with
 *
 * @returns Promise that resolves with passed value
 */
function noopresolve <T> (val?:T):Promise<T> {
    return new Promise(resolve => resolve(val));
}

export {noopresolve, noopresolve as default};
