'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const fnv1A_1 = require("../hash/fnv1A");
function dedupe(val) {
    if (!Array.isArray(val) || val.length === 0)
        return [];
    const map = new Map();
    const acc = [];
    let hash;
    for (const item of val) {
        hash = (0, fnv1A_1.default)(item);
        if (map.has(hash))
            continue;
        map.set(hash, true);
        acc.push(item);
    }
    return acc;
}
exports.default = dedupe;