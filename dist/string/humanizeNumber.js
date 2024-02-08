'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = __importDefault(require("../boolean/is"));
const is_2 = __importDefault(require("../string/is"));
const round_1 = __importDefault(require("../number/round"));
function humanizeNumber(val, options = {}) {
    const has_opts = Object.prototype.toString.call(options) === '[object Object]';
    const OPTS = {
        delim: has_opts && typeof options.delim === 'string'
            ? options.delim
            : ',',
        separator: has_opts && typeof options.separator === 'string' && options.separator.trim().length > 0
            ? options.separator
            : '.',
        precision: has_opts && Number.isInteger(options.precision) && options.precision >= 0
            ? options.precision
            : 2,
        units: has_opts && ((Array.isArray(options.units) && options.units.length > 0) || options.units === false)
            ? options.units ? options.units.filter(is_2.default) : false
            : ['', 'k', 'm', 'b', 't', 'q'],
        divider: has_opts && Number.isInteger(options.divider) && options.divider > 1
            ? options.divider
            : 1000,
        real: has_opts && (0, is_1.default)(options.real)
            ? options.real
            : false,
    };
    let normalized;
    if (OPTS.real) {
        normalized = typeof val === 'string' ? parseInt(val.trim(), 10) : Number.isFinite(val) ? Math.round(val) : 0;
    }
    else {
        normalized = typeof val === 'string' ? parseFloat(val) : Number.isFinite(val) ? val : 0;
    }
    if (!Number.isFinite(normalized) || normalized === 0) {
        return `0${Array.isArray(OPTS.units) && OPTS.units.length > 0 ? OPTS.units[0] : ''}`;
    }
    const sign = normalized < 0 ? '-' : '';
    normalized = Math.abs(normalized);
    let postfix = '';
    if (Array.isArray(OPTS.units) && OPTS.units.length > 0) {
        let unit_ix = 0;
        while (normalized >= OPTS.divider) {
            unit_ix++;
            normalized = normalized / OPTS.divider;
            if (unit_ix === OPTS.units.length - 1)
                break;
        }
        postfix = OPTS.units[unit_ix];
    }
    normalized = (0, round_1.default)(normalized, OPTS.precision);
    const humanized = `${normalized}`.split('.');
    humanized[0] = humanized[0].split('').reverse().map((char, ix, original) => {
        if (ix > 0 && ix < original.length && ix % 3 === 0)
            return char + OPTS.delim;
        return char;
    }).reverse().join('');
    return `${sign}${humanized.join(OPTS.separator)}${postfix}`;
}
exports.default = humanizeNumber;
