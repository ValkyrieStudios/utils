'use strict';

/* eslint-disable no-use-before-define */

import isNumericalNaN   from './number/isNumericalNaN.js';
import {PROTO_RGX}      from './regexp/is.js';
import {PROTO_OBJ}      from './object/is.js';

function isArrayEqual (a, b) {
    if (a.length !== b.length) return false;

    for (let i = a.length - 1; i >= 0; i--) {
        if (equal(a[i], b[i])) continue;
        return false;
    }

    return true;
}

function isObjectEqual (a, b) {
    const keys_a = Object.keys(a);

    if (keys_a.length !== Object.keys(b).length) return false;

    for (let i = keys_a.length - 1; i >= 0; i--) {
        if (equal(a[keys_a[i]], b[keys_a[i]])) continue;
        return false;
    }

    return true;
}

function equal (a, b) {
    //  Date Check
    if (
        a instanceof Date &&
        b instanceof Date
    ) return a.valueOf() === b.valueOf();

    //  RegExp Check
    if (
        Object.prototype.toString.call(a) === PROTO_RGX &&
        Object.prototype.toString.call(b) === PROTO_RGX
    ) return String(a) === String(b);

    //  Array as root equal
    if (
        Array.isArray(a) &&
        Array.isArray(b)
    ) return isArrayEqual(a, b);

    //  Object as root equal
    if (
        Object.prototype.toString.call(a) === PROTO_OBJ &&
        Object.prototype.toString.call(b) === PROTO_OBJ
    ) return isObjectEqual(a, b);

    //  NAN Check
    if (isNumericalNaN(a)) {
        return isNumericalNaN(b);
    }

    //  No special cases anymore, simply do strict equal
    return a === b;
}

export default equal;
