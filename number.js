'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.isNumber = isNumber;
exports.isNumericalNaN = isNumericalNaN;
function isNumber(val) {
    return typeof val === 'number' || isNumericalNaN(val) || val instanceof Number;
}

function isNumericalNaN(val) {
    return Number.isNaN(val);
}