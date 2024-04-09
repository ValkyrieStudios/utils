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
    if (!Array.isArray(val))  return [];

    const set = new Set<number>();
    const acc:T[] = [];
    for (const item of val) {
        const hash = fnv1A(item);
        if (set.has(hash)) continue;
        set.add(hash);
        acc.push(item);
    }

    return acc;
}
