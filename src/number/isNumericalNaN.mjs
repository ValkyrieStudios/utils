'use strict';

export default function isNumericalNaN (val) {
    return Number.isNaN(val) || val === Infinity;
}
