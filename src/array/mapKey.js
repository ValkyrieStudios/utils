'use strict';

import isObject         from '../object/is.js';
import isNotEmptyString from '../string/isNotEmpty.js';

export default function mapKey (arr, key, opts = {}) {
    if (
        (!Array.isArray(arr) || arr.length === 0) ||
        !isNotEmptyString(key)
    ) return {};

    const OPTS = Object.assign({
        merge: false,
    }, isObject(opts) ? opts : {});

    const map = {};
    for (const el of arr) {
        if (!isObject(el) || !el.hasOwnProperty(key)) continue;
        if (OPTS.merge === true && map.hasOwnProperty(el[key])) {
            map[el[key]] = Object.assign(map[el[key]], el);
        } else {
            map[el[key]] = el;
        }
    }

    return map;
}
