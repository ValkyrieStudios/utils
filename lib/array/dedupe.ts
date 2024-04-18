'use strict';

import fnv1A from '../hash/fnv1A';

/**
 * Dedupes the provided array
 *
 * @param val - Array to dedupe
 *
 * @returns Deduped array
 */
function dedupe <T> (val:T[]):T[] {
    if (!Array.isArray(val)) return [];

    const set:Set<number> = new Set();
    const acc:T[] = [];
    for (const item of val) {
        /* Calculate hash for item and continue if already seen */
        const hash = fnv1A(item);
        if (set.has(hash)) continue;

        /* Add hash to set and accumulator */
        set.add(hash);
        acc.push(item);
    }

    return acc;
}

export {dedupe, dedupe as default};
