'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const FNV_32 = 2166136261;
const REPL_NAN = 'nan';
const REPL_TRUE = 'true';
const REPL_FALSE = 'false';
const REPL_UNDEF = 'undefined';
const REPL_NULL = 'null';
function fnv1A(data, offset = FNV_32) {
    let hash = offset;
    let sanitized;
    if (typeof data === 'string') {
        sanitized = data;
    }
    else if (Number.isFinite(data)) {
        sanitized = `${data}`;
    }
    else if (Array.isArray(data) || Object.prototype.toString.call(data) === '[object Object]') {
        sanitized = JSON.stringify(data);
    }
    else if (Object.prototype.toString.call(data) === '[object RegExp]') {
        sanitized = data.toString();
    }
    else if (data instanceof Date) {
        sanitized = `${data.getTime()}`;
    }
    else if (Number.isNaN(data) || data === Infinity) {
        sanitized = REPL_NAN;
    }
    else if (data === false) {
        sanitized = REPL_FALSE;
    }
    else if (data === true) {
        sanitized = REPL_TRUE;
    }
    else if (data === null) {
        sanitized = REPL_NULL;
    }
    else if (data === undefined) {
        sanitized = REPL_UNDEF;
    }
    else {
        throw new TypeError('An FNV1A Hash could not be calculated for this datatype');
    }
    for (let i = 0; i < sanitized.length; i++) {
        hash ^= sanitized.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0;
}
exports.default = fnv1A;
