'use strict';

//  TODO : nan === nan should be true
//  TODO : regexp === regexp should be true if string contents are equal

import {isObject} from './object';
import {isArray} from './array';

const isArrayEqual = (a, b) => {
    if (a.length !== b.length) return false;

    for (let i = a.length - 1; i >= 0; i--) {
        if (equal(a[i], b[i])) continue;
        return false;
    }

    return true;
};

const isObjectEqual = (a, b) => {
    const keys_a = Object.keys(a);

    if (keys_a.length !== Object.keys(b).length) return false;

    for (let i = keys_a.length - 1; i >= 0; i--) {
        if (equal(a[keys_a[i]], b[keys_a[i]])) continue;
        return false;
    }

    return true;
};

export function equal (val_a, val_b) {
    //  Array as root equal
    if (isArray(val_a) && isArray(val_b)) return isArrayEqual(val_a, val_b);

    //  Object as root equal
    if (isObject(val_a) && isObject(val_b)) return isObjectEqual(val_a, val_b);

    //  Primitive Equal
    if (val_a === val_b) return true;

    return false;
}
