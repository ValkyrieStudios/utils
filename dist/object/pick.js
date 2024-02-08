'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("../deep/get"));
const set_1 = __importDefault(require("../deep/set"));
function pick(obj, keys) {
    if (Object.prototype.toString.call(obj) !== '[object Object]' ||
        !Array.isArray(keys) ||
        keys.length === 0)
        throw new TypeError('Please pass an object to pick from and a keys array');
    const map = {};
    let key_deep = false;
    let val;
    for (const key of keys) {
        if (typeof key !== 'string')
            continue;
        const sanitized = key.trim();
        if (sanitized.length === 0)
            continue;
        key_deep = /(\.|\[)/g.test(sanitized);
        val = key_deep
            ? (0, get_1.default)(obj, sanitized)
            : obj[sanitized];
        if (val === undefined)
            continue;
        if (key_deep) {
            (0, set_1.default)(map, sanitized, val);
        }
        else {
            map[sanitized] = val;
        }
    }
    return map;
}
exports.default = pick;
