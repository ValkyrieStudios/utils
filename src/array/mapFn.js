'use strict';

import isFunction       from '../function/is.js';
import isNotEmptyString from '../string/isNotEmpty.js';
import {PROTO_OBJ}      from '../object/is.js';

export default function mapFn (arr, fn, opts = {}) {
    if (
        (!Array.isArray(arr) || arr.length === 0) ||
        !isFunction(fn)
    ) return {};

    const OPTS = Object.assign({
        merge: false,
    }, Object.prototype.toString.call(opts) === PROTO_OBJ ? opts : {});

    const map = {};
    let hash = false;
    for (const el of arr) {
        if (Object.prototype.toString.call(el) !== PROTO_OBJ) continue;

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
