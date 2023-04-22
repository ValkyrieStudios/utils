'use strict';

/* eslint-disable use-isnan */

export default function isNumericalNaN (val) {
    return Number.isNaN(val) || val === Infinity || val === NaN;
}
