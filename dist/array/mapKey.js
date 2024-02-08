'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function mapKey(arr, key, opts = {}) {
    if ((!Array.isArray(arr) || arr.length === 0) ||
        typeof key !== 'string')
        return {};
    const key_s = key.trim();
    if (key_s.length === 0)
        return {};
    const OPTS = Object.assign({
        merge: false,
    }, Object.prototype.toString.call(opts) === '[object Object]' ? opts : {});
    const map = {};
    for (const el of arr) {
        if (Object.prototype.toString.call(el) !== '[object Object]' ||
            !Object.prototype.hasOwnProperty.call(el, key_s))
            continue;
        if (OPTS.merge === true && map.hasOwnProperty(el[key_s])) {
            map[el[key_s]] = Object.assign(map[el[key_s]], el);
        }
        else {
            map[el[key_s]] = el;
        }
    }
    return map;
}
exports.default = mapKey;
