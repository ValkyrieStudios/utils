'use strict';

import isNumberAbove from '../number/isAbove.mjs';

export default function sleep (ms = 1000) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), isNumberAbove(ms, 0) ? parseInt(ms) : 0);
    });
}
