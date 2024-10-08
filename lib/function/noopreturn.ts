/**
 * No-Operation (noop) function that returns the value passed to it when called.
 *
 * @param val - Value to return
 */
function noopreturn <T> (val?:T):T|undefined {
    return val;
}

export {noopreturn, noopreturn as default};
