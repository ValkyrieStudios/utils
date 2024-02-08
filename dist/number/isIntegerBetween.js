'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isIntegerBetween(val, min, max) {
    if (!Number.isInteger(val) ||
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min >= max)
        return false;
    return val >= min && val <= max;
}
exports.default = isIntegerBetween;
