'use strict';

/* eslint-disable use-isnan */

export default function (val) {
    return Number.isNaN(val) || val === Infinity || val === NaN || isNaN(val);
}
