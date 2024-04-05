'use strict';

/**
 * Dedupes the provided array
 *
 * @param val - Array to dedupe
 *
 * @returns Deduped array
 */
export default function dedupe <T> (val:T[]):T[] {
    if (!Array.isArray(val))  return [];

    const set = new Set<T>();
    for (const item of val) {
        if (!set.has(item)) set.add(item);
    }

    return [...set] as T[];
}
