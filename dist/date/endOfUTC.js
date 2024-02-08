'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("./is");
const WEEK_END = {
    week: 0,
    week_sun: 6,
    week_mon: 0,
    week_tue: 1,
    week_wed: 2,
    week_thu: 3,
    week_fri: 4,
    week_sat: 5,
};
function endOfUTC(val, key = 'millisecond') {
    if (!(0, is_1.default)(val))
        throw new TypeError('endOfUTC requires a date object');
    if (typeof key !== 'string')
        throw new TypeError('Key needs to be a string with content');
    switch (key) {
        case 'year':
            return new Date(Date.UTC(val.getUTCFullYear(), 11, 31, 23, 59, 59, 999));
        case 'quarter': {
            return new Date(Date.UTC(val.getUTCFullYear(), (val.getUTCMonth() - (val.getUTCMonth() % 3)) + 3, 0, 23, 59, 59, 999));
        }
        case 'month':
            return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth() + 1, 0, 23, 59, 59, 999));
        case 'week':
        case 'week_sun':
        case 'week_mon':
        case 'week_tue':
        case 'week_wed':
        case 'week_thu':
        case 'week_fri':
        case 'week_sat': {
            const UTC_DAY = val.getUTCDay();
            const UTC_EOD = WEEK_END[key];
            return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate() + (UTC_DAY <= UTC_EOD ? UTC_EOD - UTC_DAY : (7 - UTC_DAY) + UTC_EOD), 23, 59, 59, 999));
        }
        case 'day':
            return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), 23, 59, 59, 999));
        case 'hour':
            return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), 59, 59, 999));
        case 'minute':
            return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), 59, 999));
        case 'second':
            return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), val.getUTCSeconds(), 999));
        case 'millisecond':
        default:
            return new Date(Date.UTC(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate(), val.getUTCHours(), val.getUTCMinutes(), val.getUTCSeconds(), val.getUTCMilliseconds()));
    }
}
exports.default = endOfUTC;
