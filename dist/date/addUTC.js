'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("./is");
function addUTC(val, amount = 0, key = 'millisecond') {
    if (!(0, is_1.default)(val))
        throw new TypeError('addUTC requires a date object');
    if (!Number.isInteger(amount))
        throw new TypeError('Amount needs to be an integer');
    if (typeof key !== 'string')
        throw new TypeError('Key needs to be a string with content');
    const copy = new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), val.getUTCSeconds(), val.getUTCMilliseconds()));
    switch (key) {
        case 'years':
        case 'year': {
            copy.setUTCFullYear(copy.getUTCFullYear() + amount);
            return copy;
        }
        case 'months':
        case 'month': {
            copy.setUTCMonth(copy.getUTCMonth() + amount);
            return copy;
        }
        case 'days':
        case 'day': {
            copy.setUTCDate(copy.getUTCDate() + amount);
            return copy;
        }
        case 'hours':
        case 'hour': {
            copy.setUTCHours(copy.getUTCHours() + amount);
            return copy;
        }
        case 'minutes':
        case 'minute': {
            copy.setUTCMinutes(copy.getUTCMinutes() + amount);
            return copy;
        }
        case 'seconds':
        case 'second': {
            copy.setUTCSeconds(copy.getUTCSeconds() + amount);
            return copy;
        }
        case 'milliseconds':
        case 'millisecond': {
            copy.setUTCMilliseconds(copy.getUTCMilliseconds() + amount);
            return copy;
        }
        default:
            return copy;
    }
}
exports.default = addUTC;
