type SplitOptions<T> = {
    filter_fn?: (el: T) => boolean;
};

/**
 * Splits the provided array or set in a set of batches according to the provided size
 * For Example:
 *  split([1, 2, 3, 4, 5], 2) -> [[1,2],[3,4],[5]]
 *
 * For Example w/ filter
 *  split([1, false, 3, 4, 5], 2, {filter_fn: el => isInteger(el)}) -> [[1, 3], [4, 5]]
 *
 * @param {T[]|Set<T>} val - Array or Set to split
 * @param {number} size - Size of batches
 * @param {SplitOptions?} opts - Split options
 */
function split<T> (arr: T[]|Set<T>, size: number, opts?: SplitOptions<T>): T[][] {
    if (
        !Number.isInteger(size) ||
        size <= 0
    ) throw new Error('split requires a positive integer size');

    /* Normalize input */
    let normalized:T[];
    if (Array.isArray(arr)) {
        normalized = arr;
    } else if (arr instanceof Set) {
        normalized = [...arr];
    } else {
        throw new Error('split requires an array or set');
    }

    /* Check options */
    const FILTER_FN = typeof opts?.filter_fn === 'function' ? opts?.filter_fn : false;

    /* Run slicing and dicing */
    const result: T[][] = [];
    let cursor: T[] = [];
    let ticker:number = 0;
    const len = normalized.length;
    if (FILTER_FN) {
        for (let i = 0; i < len; i++) {
            const el = normalized[i];
            if (FILTER_FN && !FILTER_FN(el)) continue;

            ticker++;
            cursor.push(el);
            if (ticker === size) {
                result.push(cursor);
                cursor = [];
                ticker = 0;
            }
        }

        /* Push the last subarray if it has remaining elements */
        if (ticker) result.push(cursor);
    } else {
        for (let i = 0; i < len; i += size) {
            result.push(normalized.slice(i, i + size));
        }
    }

    return result;
}

export {split, split as default};
