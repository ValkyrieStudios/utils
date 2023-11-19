'use strict';

/* eslint-disable no-bitwise */

import isString         from '../string/is.js';
import isDate           from '../date/is.js';
import isObject         from '../object/is.js';
import isNumericalNaN   from '../number/isNumericalNaN.js';
import isRegExp         from '../regexp/is.js';

//  https://tools.ietf.org/html/draft-eastlake-fnv-03

const FNV_32        = 2166136261;
const REPL_NAN      = 'nan';
const REPL_TRUE     = 'true';
const REPL_FALSE    = 'false';
const REPL_UNDEF    = 'undefined';
const REPL_NULL     = 'null';

export default function fnv1A (data, offset = FNV_32) {
    let hash = offset;
    let sanitized;

    //  Convert data to a format that is hashable
    if (isString(data)) {
        sanitized = data;
    } else if (Number.isFinite(data)) {
        sanitized = `${data}`;
    } else if (Array.isArray(data) || isObject(data)) {
        sanitized = JSON.stringify(data);
    } else if (isRegExp(data)) {
        sanitized = data.toString();
    } else if (isDate(data)) {
        sanitized = `${data.getTime()}`;
    } else if (isNumericalNaN(data)) {
        sanitized = REPL_NAN;
    } else if (data === false) {
        sanitized = REPL_FALSE;
    } else if (data === true) {
        sanitized = REPL_TRUE;
    } else if (data === null) {
        sanitized = REPL_NULL;
    } else if (data === undefined) {
        sanitized = REPL_UNDEF;
    } else {
        throw new TypeError('An FNV1A Hash could not be calculated for this datatype');
    }

    //  Calculate the hash of the sanitized data by looping over each char
    for (let i = 0; i < sanitized.length; i++) {
        hash ^= sanitized.charCodeAt(i);

        //  32-bit FNV prime: 2**24 + 2**8 + 0x93 = 16777619
        //  Using bitshift for accuracy and performance. Numbers in JS suck.
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }

    return hash >>> 0;
}
