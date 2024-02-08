'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function sanitizeRegExp(val) {
    if (typeof val !== 'string')
        return false;
    return val.trim().replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}
exports.default = sanitizeRegExp;
