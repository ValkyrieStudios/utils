'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isNumberBetween(val, min, max) {
    if (!Number.isFinite(val) ||
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min >= max)
        return false;
    return val >= min && val <= max;
}
exports.default = isNumberBetween;
