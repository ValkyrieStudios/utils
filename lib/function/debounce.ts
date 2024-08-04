import {isFunction} from './is';
import {isIntegerAbove} from '../number/isIntegerAbove';

/**
 * Debounce a function
 *
 * Take Note, the debounced function also contains a "cancel" and "flush" method
 * "cancel": Allows clearing the timeout
 * "flush": Allows immediately executing the debounced function if pending
 *
 * Example Usage:
 *
 * const log = (message: string) => console.log(message);
 *
 * const debouncedLog = debounce(log, 2000);
 *
 * debouncedLog("Hello, World!");
 * debouncedLog.cancel();
 * debouncedLog.flush();
 *
 * @param {Function} fn - Function to debounce
 * @param {number} wait - Amount of time to debounce the function for
 */
function debounce<T extends (...args: any[]) => any> (
    fn: T,
    wait: number
) {
    if (!isFunction(fn)) throw new Error('functions/debounce: Expected a function');
    if (!isIntegerAbove(wait, 0)) throw new Error('functions/debounce: Wait should be an integer above 0');

    let timeout: ReturnType<typeof setTimeout> | null;
    let self: any;
    let current_args: any[];
    let current_rslt: any;

    const clear = () => {
        if (!timeout) return;
        clearTimeout(timeout);
        timeout = null;
    };

    const flush = () => {
        if (!timeout) return;
        current_rslt = fn.apply(self, current_args);
        clearTimeout(timeout);
        timeout = null;
    };

    const debouncedFn = function (this: any, ...args: any[]) {
        self = this; /* eslint-disable-line no-invalid-this,@typescript-eslint/no-this-alias */
        current_args = args;

        clear();

        timeout = setTimeout(() => {
            timeout = null;
            current_rslt = fn.apply(self, current_args);
        }, wait);

        return current_rslt;
    };

    debouncedFn.cancel = clear;
    debouncedFn.flush = flush;

    return debouncedFn as T & { cancel: () => void, flush: () => void };
}

export default debounce;
