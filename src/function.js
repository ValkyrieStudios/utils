//  Check if a variable is a function or not
export function isFunction (val) {
    return !!(val && val.constructor && val.call && val.apply);
}

//  Nothing to execute here ... this is a noop ( no-operation )
export function noop () {
}

//  Nothing to execute here ... simply return value
export function noopreturn (value) {
    return value;
}

//  Nothing to execute here ... simply resolve
export function noopresolve (value) {
    return new Promise((resolve) => resolve(value));
}
