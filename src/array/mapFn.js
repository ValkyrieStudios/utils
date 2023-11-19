'use strict';

import isObject         from '../object/is.js';
import isNotEmptyArray  from './isNotEmpty.js';
import isFunction       from '../function/is.js';
import isNotEmptyString from '../string/isNotEmpty.js';

export default function mapFn (arr, fn, opts = {}) {
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
        if (!Number.isFinite(hash) && !isNotEmptyString(hash)) continue;

        if (OPTS.merge === true && map.hasOwnProperty(hash)) {
            map[hash] = Object.assign(map[hash], el);
        } else {
            map[hash] = el;
        }
    }

    return map;
}
