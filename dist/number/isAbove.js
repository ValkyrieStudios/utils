'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isNumberAbove(val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val > ref;
}
exports.default = isNumberAbove;
