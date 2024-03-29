'use strict';

/**
 * No-Operation (noop) function that returns the value passed to it when called.
 *
 * @param val - Value to return
 *
 * @returns Passed value
 */
export default function noopreturn <T> (val?:T):T {
    return val;
}
