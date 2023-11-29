'use strict';

import isNotEmptyString from '../string/isNotEmpty.mjs';
import isNotEmptyObject from '../object/isNotEmpty.mjs';

export default function mapPrimitive (arr, opts = {}) {
    if (!Array.isArray(arr) || arr.length === 0) return {};

    const OPTS = Object.assign({
        valtrim: false,
        keyround: false,
        valround: false,
    }, isNotEmptyObject(opts) ? opts : {});

    const map = {};
    for (const el of arr) {
        if (Number.isFinite(el)) {
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
