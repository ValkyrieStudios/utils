'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isNotEmptyString(val, trimmed = true) {
    if (typeof val !== 'string')
        return false;
    return (trimmed === true ? val.trim() : val).length > 0;
}
exports.default = isNotEmptyString;
