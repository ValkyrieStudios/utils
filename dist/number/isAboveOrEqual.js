'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isNumberAboveOrEqual(val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val >= ref;
}
exports.default = isNumberAboveOrEqual;
