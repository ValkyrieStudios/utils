'use strict';

import isObject         from '../object/is';
import isNotEmptyArray  from './isNotEmpty';
import isFunction       from '../function/is';
import isNotEmptyString from '../string/isNotEmpty';
import isNumber         from '../number/is';

export default function (arr, fn, opts = {}) {
    if (!isNotEmptyArray(arr) || !isFunction(fn)) return {};

    const OPTS = Object.assign({
        merge: false,
    }, isObject(opts) ? opts : {});

    const map = {};
    let hash = false;
    for (const el of arr) {
        if (!isObject(el)) continue;

        //  Get hash
        hash = fn(el);
        if (!isNumber(hash) && !isNotEmptyString(hash)) continue;

        if (OPTS.merge === true && map.hasOwnProperty(hash)) {
            map[hash] = Object.assign(map[hash], el);
        } else {
            map[hash] = el;
        }
    }

    return map;
}
