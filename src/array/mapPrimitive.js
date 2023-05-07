'use strict';

import isNumber         from '../number/is';
import isNotEmptyString from '../string/isNotEmpty';
import isNotEmptyArray  from './isNotEmpty';
import isNotEmptyObject from '../object/isNotEmpty';

export default function mapPrimitive (arr, opts = {}) {
    if (!isNotEmptyArray(arr)) return {};

    const OPTS = Object.assign({
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
            map[el.trim()] = OPTS.valtrim ? el.trim() : el;
        }
    }

    return map;
}
