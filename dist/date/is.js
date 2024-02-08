'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isDate(val) {
    return Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val);
}
exports.default = isDate;
