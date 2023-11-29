'use strict';

import fnv1A from '../hash/fnv1A.mjs';

export default function dedupe (val) {
    if (!Array.isArray(val) || val.length === 0)  return [];

    const map = new Map();
    const acc = [];
    let hash;
    for (const item of val) {
        //  Calculate hash for item and continue if already seen
        hash = fnv1A(item);
        if (map.has(hash)) continue;

        //  Set seen hash to true
        map.set(hash, true);

        //  Push into accumulator
        acc.push(item);
    }

    return acc;
}
