'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isNumberBelowOrEqual(val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val <= ref;
}
exports.default = isNumberBelowOrEqual;
