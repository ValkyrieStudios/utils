'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("./is");
function toUTC(val) {
    if (!(0, is_1.default)(val))
        throw new TypeError('toUTC requires a date object');
    return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), val.getUTCSeconds(), val.getUTCMilliseconds()));
}
exports.default = toUTC;
