'use strict';

export function isNumber (val) {
    return (typeof val === 'number' || isNumericalNaN(val));
}

export function isNumericalNaN (val) {
    return Number.isNaN(val);
}
