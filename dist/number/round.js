'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function round(val, precision = 0) {
    if (!Number.isFinite(val))
        throw new TypeError('Value should be numeric');
    const exp = Math.pow(10, Number.isInteger(precision) && precision > 0 ? precision : 0);
    const num = (val * exp) * (1 + Number.EPSILON);
    return Math.round(num) / exp;
}
exports.default = round;
