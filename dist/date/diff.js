'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = __importDefault(require("./is"));
const SECOND_IN_MILLISECONDS = 1000;
const MINUTE_IN_MILLISECONDS = SECOND_IN_MILLISECONDS * 60;
const HOUR_IN_MILLISECONDS = MINUTE_IN_MILLISECONDS * 60;
const DAY_IN_MILLISECONDS = HOUR_IN_MILLISECONDS * 24;
const WEEK_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 7;
function diff(val_a, val_b, key = 'millisecond') {
    if (!(0, is_1.default)(val_a) ||
        !(0, is_1.default)(val_b))
        throw new TypeError('Diff requires date objects for both values');
    if (typeof key !== 'string')
        throw new TypeError('Key needs to be a string');
    const diff_in_ms = val_a.valueOf() - val_b.valueOf();
    switch (key) {
        case 'week':
        case 'weeks':
            return diff_in_ms / WEEK_IN_MILLISECONDS;
        case 'day':
        case 'days':
            return diff_in_ms / DAY_IN_MILLISECONDS;
        case 'hour':
        case 'hours':
            return diff_in_ms / HOUR_IN_MILLISECONDS;
        case 'minute':
        case 'minutes':
            return diff_in_ms / MINUTE_IN_MILLISECONDS;
        case 'second':
        case 'seconds':
            return diff_in_ms / SECOND_IN_MILLISECONDS;
        case 'millisecond':
        case 'milliseconds':
        default:
            return diff_in_ms;
    }
}
exports.default = diff;
