'use strict';

import isNotEmptyArray  from './isNotEmpty';
import isNotEmptyString from '../string/isNotEmpty';
import isNumber         from '../number/is';
import isNotEmptyObject from '../object/isNotEmpty';
import round            from '../number/round';

//  Join an array of values while autofiltering any non-string/non-number elements
//
//  @param array    arr     Array of values to join
//  @param object   options (default={}) Override options
export default function (arr, options = {}) {
    if (!isNotEmptyArray(arr)) return '';

    const OPTS = Object.assign({
        delim       : ' ',      //  Delimiter to join with
        trim        : true,     //  Trim after joining
        val_trim    : true,     //  Automatically trim string values
        val_round   : false,    //  Automatically round numbers
    }, isNotEmptyObject(options) ? options : {});

    const filtered = [];
    for (const el of arr) {
        if (isNotEmptyString(el)) {
            filtered.push(OPTS.val_trim === true ? el.trim() : el);
        } else if (isNumber(el)) {
            filtered.push(isNumber(OPTS.val_round) ? round(el, OPTS.val_round) : el);
        }
    }

    return OPTS.trim === true ? filtered.join(OPTS.delim).trim() : filtered.join(OPTS.delim);
}
