'use strict';

import isNotEmptyArray  from './isNotEmpty.js';
import isNotEmptyString from '../string/isNotEmpty.js';
import isNotEmptyObject from '../object/isNotEmpty.js';
import round            from '../number/round.js';

//  Join an array of values while autofiltering any non-string/non-number elements
//
//  @param array    arr     Array of values to join
//  @param object   options (default={}) Override options
export default function join (arr, options = {}) {
    if (!isNotEmptyArray(arr)) return '';

    const OPTS = Object.assign({
        delim       : ' ',      //  Delimiter to join with
        trim        : true,     //  Trim after joining
        valtrim     : true,     //  Automatically trim string values
        valround    : false,    //  Automatically round numbers
    }, isNotEmptyObject(options) ? options : {});

    const filtered = [];
    for (const el of arr) {
        if (isNotEmptyString(el)) {
            filtered.push(OPTS.valtrim === true ? el.trim() : el);
        } else if (Number.isFinite(el)) {
            filtered.push(Number.isFinite(OPTS.valround) ? round(el, OPTS.valround) : el);
        }
    }

    return OPTS.trim === true ? filtered.join(OPTS.delim).trim() : filtered.join(OPTS.delim);
}
