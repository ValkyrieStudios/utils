'use strict';

const FNV_32        = 2166136261;
const REPL_NAN      = 'nan';
const REPL_TRUE     = 'true';
const REPL_FALSE    = 'false';
const REPL_UNDEF    = 'undefined';
const REPL_NULL     = 'null';

/**
 * Convert a provided value into a Fowler-Noll-Vo 1A hash
 * For more info: https://tools.ietf.org/html/draft-eastlake-fnv-03
 *
 * @param data - Value to be converted
 * @param offset - (default=2166136261) FNV prime to use
 *
 * @returns FNV1A hash of provided value
 */
export default function fnv1A (data:unknown, offset:number = FNV_32):number {
    let hash:number = offset;
    let sanitized:any;

    //  Convert data to a format that is hashable
    if (typeof data === 'string') {
        sanitized = data;
    } else if (Number.isFinite(data)) {
        sanitized = String(data);
    } else if (Array.isArray(data) || Object.prototype.toString.call(data) === '[object Object]') {
        sanitized = JSON.stringify(data);
    } else if (data instanceof RegExp) {
        sanitized = data.toString();
    } else if (data instanceof Date) {
        sanitized = String(data.getTime());
    } else if (Number.isNaN(data) || data === Infinity) {
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
    const len = sanitized.length;
    for (let i = 0; i < len; i++) {
        hash ^= sanitized.charCodeAt(i);

        /**
         * 32-bit FNV prime: 2**24 + 2**8 + 0x93 = 16777619
         * Using bitshift for accuracy and performance. Numbers in JS suck
         */
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }

    return hash >>> 0;
}
