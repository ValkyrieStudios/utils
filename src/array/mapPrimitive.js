'use strict';

import isNumber         from '../number/is';
import isNotEmptyString from '../string/isNotEmpty';
import isNotEmptyArray  from './isNotEmpty';
import isNotEmptyObject from '../object/isNotEmpty';

export default function (arr, opts = {}) {
    if (!isNotEmptyArray(arr)) return {};

    const OPTS = Object.assign({
        keytrim: true,
        valtrim: false,
        keyround: false,
        valround: false,
    }, isNotEmptyObject(opts) ? opts : {});

    const map = {};
    for (const el of arr) {
        if (isNumber(el)) {
            if (OPTS.keyround === true) {
                map[Math.round(el)] = OPTS.valround ? Math.round(el) : el;
            } else {
                map[el] = OPTS.valround ? Math.round(el) : el;
            }
        } else if (isNotEmptyString(el)) {
            if (OPTS.keytrim === true) {
                map[el.trim()] = OPTS.valtrim ? el.trim() : el;
            } else {
                map[el] = OPTS.valtrim ? el.trim() : el;
            }
        }
    }

    return map;
}
