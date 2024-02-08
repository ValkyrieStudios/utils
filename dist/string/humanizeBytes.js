'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const humanizeNumber_1 = __importDefault(require("./humanizeNumber"));
const isNotEmpty_1 = __importDefault(require("../string/isNotEmpty"));
function humanizeBytes(val, options = {}) {
    const has_opts = Object.prototype.toString.call(options) === '[object Object]';
    return (0, humanizeNumber_1.default)(val, {
        delim: has_opts && typeof options.delim === 'string'
            ? options.delim
            : ',',
        separator: has_opts && typeof options.separator === 'string' && options.separator.trim().length > 0
            ? options.separator
            : '.',
        precision: has_opts && Number.isInteger(options.precision) && options.precision >= 0
            ? options.precision
            : 2,
        units: has_opts && Array.isArray(options.units) && options.units.length > 0
            ? options.units.filter(el => (0, isNotEmpty_1.default)(el))
            : [' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'],
        divider: 1024,
        real: true,
    });
}
exports.default = humanizeBytes;
