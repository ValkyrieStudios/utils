'use strict';

import round from '../number/round.mjs';

//  Join an array of values while autofiltering any non-string/non-number elements
//
//  @param array    arr     Array of values to join
//  @param object   opts    Override options
export default function join (arr, opts) {
    if (!Array.isArray(arr) || arr.length === 0) return '';

    const OPTS = Object.assign({
        delim       : ' ',      //  Delimiter to join with
        trim        : true,     //  Trim after joining
        valtrim     : true,     //  Automatically trim string values
        valround    : false,    //  Automatically round numbers
    }, Object.prototype.toString.call(opts) === '[object Object]' ? opts : {});

    const filtered = [];
    for (const el of arr) {
        if (typeof el === 'string' && el.trim().length > 0) {
            filtered.push(OPTS.valtrim === true ? el.trim() : el);
        } else if (Number.isFinite(el)) {
            filtered.push(Number.isFinite(OPTS.valround) ? round(el, OPTS.valround) : el);
        }
    }

    return OPTS.trim === true ? filtered.join(OPTS.delim).trim() : filtered.join(OPTS.delim);
}
