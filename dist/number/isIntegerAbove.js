'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isIntegerAbove(val, ref) {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : val > ref;
}
exports.default = isIntegerAbove;
