"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.isFunction = isFunction;
exports.noop = noop;
exports.noopreturn = noopreturn;
exports.noopresolve = noopresolve;
//  Check if a variable is a function or not
function isFunction(val) {
    return !!(val && val.constructor && val.call && val.apply);
}

//  Nothing to execute here ... this is a noop ( no-operation )
function noop() {}

//  Nothing to execute here ... simply return value
function noopreturn(value) {
    return value;
}

//  Nothing to execute here ... simply resolve
function noopresolve(value) {
    return new Promise(function (resolve) {
        return resolve(value);
    });
}