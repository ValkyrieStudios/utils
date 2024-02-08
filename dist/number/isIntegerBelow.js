'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isIntegerBelow(val, ref) {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : val < ref;
}
exports.default = isIntegerBelow;
