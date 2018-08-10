import {isObject} from './object';
import {isArray} from './array';
import {isNumericalNaN} from './number';
import {isRegExp} from './regexp';
import {isDate} from './date';

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
    if (isArray(val_a) && isArray(val_b)) {
        return isArrayEqual(val_a, val_b);
    }

    //  Object as root equal
    if (isObject(val_a) && isObject(val_b)) {
        return isObjectEqual(val_a, val_b);
    }

    //  NAN Check
    if (isNumericalNaN(val_a)) {
        return isNumericalNaN(val_b);
    }

    //  RegExp Check
    if (isRegExp(val_a) || isRegExp(val_b)) {
        return (String(val_a) === String(val_b));
    }

    //  Date Check
    if (isDate(val_a) || isDate(val_b)) {
        return (isDate(val_a) ? val_a : new Date(val_a)).getTime() === (isDate(val_b) ? val_b : new Date(val_b)).getTime();
    }

    //  No special cases anymore, simply do strict equal
    return val_a === val_b;
}
