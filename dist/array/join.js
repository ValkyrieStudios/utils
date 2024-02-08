'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const round_1 = require("../number/round");
function join(val, opts = {}) {
    if (!Array.isArray(val) || val.length === 0)
        return '';
    const OPTS = Object.assign({
        delim: ' ',
        trim: true,
        valtrim: true,
        valround: false,
    }, Object.prototype.toString.call(opts) === '[object Object]' ? opts : {});
    const filtered = [];
    for (const el of val) {
        if (typeof el === 'string' && el.trim().length > 0) {
            filtered.push(OPTS.valtrim === true ? el.trim() : el);
        }
        else if (Number.isFinite(el)) {
            filtered.push(Number.isFinite(OPTS.valround) ? (0, round_1.default)(el, OPTS.valround) : el);
        }
    }
    return OPTS.trim === true ? filtered.join(OPTS.delim).trim() : filtered.join(OPTS.delim);
}
exports.default = join;
