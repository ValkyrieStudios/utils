'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function mapFn(arr, fn, opts = {}) {
    if ((!Array.isArray(arr) || arr.length === 0) ||
        typeof fn !== 'function')
        return {};
    const OPTS = Object.assign({
        merge: false,
    }, Object.prototype.toString.call(opts) === '[object Object]' ? opts : {});
    const map = {};
    let hash = false;
    for (const el of arr) {
        if (Object.prototype.toString.call(el) !== '[object Object]')
            continue;
        hash = fn(el);
        if (!Number.isFinite(hash) && !(typeof hash === 'string' && hash.trim().length > 0))
            continue;
        hash = `${hash}`;
        if (OPTS.merge === true && map.hasOwnProperty(hash)) {
            map[hash] = Object.assign(map[hash], el);
        }
        else {
            map[hash] = el;
        }
    }
    return map;
}
exports.default = mapFn;
