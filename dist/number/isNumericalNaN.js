'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isNumericalNaN(val) {
    return Number.isNaN(val) || val === Infinity;
}
exports.default = isNumericalNaN;
