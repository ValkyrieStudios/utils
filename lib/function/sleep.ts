'use strict';

/**
 * Returns a promise that resolves after X milliseconds, useful in
 * async scenarios where we wish to wait for a specific periodic of time
 *
 * @param ms - (default=1000) Amount of milliseconds to wait for
 *
 * @returns Promise that resolves after X milliseconds
 */
function sleep (ms:number=1000):Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => resolve(), Number.isFinite(ms) && ms > 0 ? Math.round(ms) : 0);
    });
}

export {sleep, sleep as default};
