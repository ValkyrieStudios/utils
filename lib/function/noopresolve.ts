/**
 * No-Operation (noop) resolver that simply returns a promise
 * that resolves with the value that was passed to it
 *
 * @param val - Value to be resolved with
 */
function noopresolve <T> (val?:T):Promise<T|undefined> {
    return new Promise(resolve => resolve(val));
}

export {noopresolve, noopresolve as default};
