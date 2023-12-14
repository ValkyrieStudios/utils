'use strict';

//  Map an array of primitive values (numbers/strings)
//
//  @param array    arr     Array of values to join
//  @param object   opts    Override options
export default function mapPrimitive (arr, opts) {
    if (!Array.isArray(arr) || arr.length === 0) return {};

    const OPTS = Object.assign({
        valtrim: false,
        keyround: false,
        valround: false,
    }, Object.prototype.toString.call(opts) === '[object Object]' ? opts : {});

    const map = {};
    for (const el of arr) {
        if (Number.isFinite(el)) {
            if (OPTS.keyround === true) {
                map[Math.round(el)] = OPTS.valround ? Math.round(el) : el;
            } else {
                map[el] = OPTS.valround ? Math.round(el) : el;
            }
        } else if (typeof el === 'string' && el.trim().length > 0) {
            map[el.trim()] = OPTS.valtrim ? el.trim() : el;
        }
    }

    return map;
}
