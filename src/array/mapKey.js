'use strict';

import isObject         from '../object/is';
import isNotEmptyArray  from './isNotEmpty';
import isNotEmptyString from '../string/isNotEmpty';

export default function (arr, key, opts = {}) {
    if (!isNotEmptyArray(arr) || !isNotEmptyString(key)) return {};

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
