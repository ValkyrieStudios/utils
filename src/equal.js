'use strict';

/* eslint-disable no-use-before-define */

import isObject         from './object/is.js';
import isNumericalNaN   from './number/isNumericalNaN.js';
import isRegExp         from './regexp/is.js';
import isDate           from './date/is.js';

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
    if (isDate(a) && isDate(b)) {
        return a.valueOf() === b.valueOf();
    }

    //  RegExp Check
    if (isRegExp(a) || isRegExp(b)) {
        return String(a) === String(b);
    }

    //  Array as root equal
    if (Array.isArray(a) && Array.isArray(b)) {
        return isArrayEqual(a, b);
    }

    //  Object as root equal
    if (isObject(a) && isObject(b)) {
        return isObjectEqual(a, b);
    }

    //  NAN Check
    if (isNumericalNaN(a)) {
        return isNumericalNaN(b);
    }

    //  No special cases anymore, simply do strict equal
    return a === b;
}

export default equal;
