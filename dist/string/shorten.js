'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function shorten(val, length, postfix = '...') {
    if (typeof val !== 'string')
        return '';
    if (typeof postfix !== 'string' || !Number.isFinite(length) || length <= 0)
        return val;
    const sanitized = val.trim();
    return sanitized.length <= length ? sanitized : `${sanitized.substr(0, length)}${postfix}`;
}
exports.default = shorten;
