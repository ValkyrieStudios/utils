'use strict';

export default function shorten (val, length, postfix = '...') {
    //  Return empty string if value passed is not a string
    if (typeof val !== 'string') return '';

    //  Return original value if options are invalid
    if (typeof postfix !== 'string' || !Number.isFinite(length) || length <= 0) return val;

    //  Trim first
    const sanitized = val.trim();

    return sanitized.length <= length ? sanitized : `${sanitized.substr(0, length)}${postfix}`;
}
