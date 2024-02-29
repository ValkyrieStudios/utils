'use strict';

import fnv1A from '../hash/fnv1A';

/**
 * Dedupes the provided array
 *
 * @param val - Array to dedupe
 *
 * @returns Deduped array
 */
export default function dedupe <T> (val:T[]):T[] {
    if (!Array.isArray(val) || !val.length)  return [];

    const set = new Set<number>();
    const acc:T[] = [];
    let hash;
    for (const item of val) {
        //  Calculate hash for item and continue if already seen
        hash = fnv1A(item);
        if (set.has(hash)) continue;

        //  Add hash to set and accumulator
        set.add(hash);
        acc.push(item);
    }

    return acc;
}
