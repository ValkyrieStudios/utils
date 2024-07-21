type SplitOptions<T> = {
  filter_fn?: (el: T) => boolean;
};

/**
 * Splits the provided array in a set of batches according to the provided size
 * For Example:
 *  split([1, 2, 3, 4, 5], 2) -> [[1,2],[3,4],[5]]
 *
 * For Example w/ filter
 *  split([1, false, 3, 4, 5], 2, {filter_fn: el => isInteger(el)}) -> [[1, 3], [4, 5]]
 *
 * @param {Array} val - Array to split
 * @param {number} size - Size of batches
 * @param {SplitOptions?} opts - Split options
 *
 * @returns Split batches
 */
function split<T> (arr: T[], size: number, opts?: SplitOptions<T>): T[][] {
    if (
        !Array.isArray(arr) ||
        !Number.isInteger(size) ||
        size <= 0
    ) throw new Error('split requires an array and positive integer size');

    /* Check options */
    const FILTER_FN = typeof opts?.filter_fn === 'function' ? opts?.filter_fn : false;

    /* Run slicing and dicing */
    const result: T[][] = [];
    let cursor: T[] = [];
    let ticker:number = 0;
    const len = arr.length;
    if (FILTER_FN) {
        for (let i = 0; i < len; i++) {
            const el = arr[i];
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
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
    }

    return result;
}

export {split, split as default};
