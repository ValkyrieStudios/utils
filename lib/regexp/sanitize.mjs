'use strict';

export default function sanitizeRegExp (val) {
    if (typeof val !== 'string') return false;
    return val.trim().replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}
