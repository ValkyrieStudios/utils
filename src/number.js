import {isBoolean} from './boolean';

export function isNumber (val) {
    return (typeof val === 'number' || isNumericalNaN(val) || val instanceof Number);
}

export function isNumericalNaN (val) {
    return Number.isNaN(val);
}

//  Round a decimal value
export function round (val, precision = 0) {
    if (!isNumber(val) || isNumericalNaN(val)) {
        throw new TypeError('Value should be numeric');
    }

    if (precision === false || precision < 1) {
        return Math.round(val);
    }

    const exp = Math.pow(10, Math.round(precision));
    return Math.round(val * exp) / exp;
}

//  Generate random between min and max
export function randomBetween (min = 0, max = 10) {
    if (!isNumber(min) || isNumericalNaN(min)) {
        throw new TypeError('Min should be numeric');
    }

    if (!isNumber(max) || isNumericalNaN(max)) {
        throw new TypeError('Max should be numeric');
    }

    return (Math.random() * max) + min;
}
