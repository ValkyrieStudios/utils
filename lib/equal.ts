'use strict';

/* eslint-disable no-use-before-define */

import isNumericalNaN from './number/isNumericalNaN';

function isArrayEqual (
    a:any[],
    b:any[]
):boolean {
    if (a.length !== b.length) return false;

    for (let i = a.length - 1; i >= 0; i--) {
        if (equal(a[i], b[i])) continue;
        return false;
    }

    return true;
}

function isObjectEqual (
    a:{[key:string]:any},
    b:{[key:string]:any}
):boolean {
    const keys_a = Object.keys(a);

    if (keys_a.length !== Object.keys(b).length) return false;

    for (let i = keys_a.length - 1; i >= 0; i--) {
        if (equal(a[keys_a[i]], b[keys_a[i]])) continue;
        return false;
    }

    return true;
}

/**
 * Compute whether or not two provided values are deeply equal
 *
 * @param a - Value to compare against
 * @param b - Value to compare with
 *
 * @returns Whether or not they are equal
 */
function equal (a:any, b:any):boolean {
    //  Date Check
    if (a instanceof Date) return b instanceof Date && a.valueOf() === b.valueOf();

    //  RegExp Check
    if (a instanceof RegExp) return b instanceof RegExp && String(a) === String(b);

    //  Array as root equal
    if (Array.isArray(a)) return Array.isArray(b) && isArrayEqual(a, b);

    //  Object as root equal
    if (Object.prototype.toString.call(a) === '[object Object]') {
        return Object.prototype.toString.call(b) === '[object Object]' && isObjectEqual(a, b);
    }

    //  NAN Check
    if (isNumericalNaN(a)) return isNumericalNaN(b);

    //  No special cases anymore, simply do strict equal
    return a === b;
}

export {equal, equal as default};
