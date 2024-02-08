'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const round_1 = __importDefault(require("../number/round"));
function mapPrimitive(arr, opts = {}) {
    if (!Array.isArray(arr) || arr.length === 0)
        return {};
    const OPTS = Object.assign({
        valtrim: false,
        valround: false,
        keyround: false,
    }, Object.prototype.toString.call(opts) === '[object Object]' ? opts : {});
    const map = {};
    for (const el of arr) {
        if (typeof el === 'string' && el.trim().length > 0) {
            map[el.trim()] = OPTS.valtrim ? el.trim() : el;
        }
        else if (Number.isFinite(el)) {
            map[OPTS.keyround === true ? Math.round(el) : el] = OPTS.valround === false
                ? el
                : OPTS.valround === true
                    ? Math.round(el)
                    : (0, round_1.default)(el, OPTS.valround);
        }
    }
    return map;
}
exports.default = mapPrimitive;
