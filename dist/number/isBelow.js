'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isNumberBelow(val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val < ref;
}
exports.default = isNumberBelow;
