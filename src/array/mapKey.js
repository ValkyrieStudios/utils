'use strict';

import isNotEmptyString from '../string/isNotEmpty.js';
import {PROTO_OBJ}      from '../object/is.js';

export default function mapKey (arr, key, opts = {}) {
    if (
        (!Array.isArray(arr) || arr.length === 0) ||
        !isNotEmptyString(key)
    ) return {};

    const OPTS = Object.assign({
        merge: false,
    }, Object.prototype.toString.call(opts) === PROTO_OBJ ? opts : {});

    const map = {};
    for (const el of arr) {
        if (
            Object.prototype.toString.call(el) !== PROTO_OBJ ||
            !el.hasOwnProperty(key)) continue;
        if (OPTS.merge === true && map.hasOwnProperty(el[key])) {
            map[el[key]] = Object.assign(map[el[key]], el);
        } else {
            map[el[key]] = el;
        }
    }

    return map;
}
