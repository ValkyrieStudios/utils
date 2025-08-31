import {toString} from '../hash/utils';

type DedupeOptionsBase<T> = {
    /**
     * Pass a custom filter function which will be run in O(n) while deduping is going on
     */
    filter_fn?: (el: T) => boolean;
};

type DedupeOptionsWithKey<T extends Record<string, unknown>> = DedupeOptionsBase<T> & {
    /**
     * Deduplicate based on a single property key of T
     */
    key: keyof T;
};

type DedupeOptionsNoKey<T> = DedupeOptionsBase<T>;

// Overloads
function dedupe<T extends Record<string, unknown>>(
    val: T[],
    opts: DedupeOptionsWithKey<T>
): T[];
function dedupe<T>(val: T[], opts?: DedupeOptionsNoKey<T>): T[];

/**
 * Dedupes the provided array
 *
 * @param {Array} val - Array to dedupe
 * @param {DedupeOptions?} opts - Dedupe options
 */
function dedupe<T> (val: T[], opts?: DedupeOptionsBase<T> & { key?: keyof any }): T[] {
    if (!Array.isArray(val)) return [];

    /* Check options */
    const FILTER_FN = opts?.filter_fn;
    const KEY = opts?.key;

    const set: Set<string> = new Set();
    const acc: T[] = [];
    let hash: string;
    const len = val.length;

    if (KEY) {
        const CUSTOM_FILTER_FN = typeof FILTER_FN === 'function'
            ? (el:T) => el && Object.prototype.toString.call(el) === '[object Object]' && FILTER_FN!(el)
            : (el:T) => el && Object.prototype.toString.call(el) === '[object Object]';

        for (let i = 0; i < len; i++) {
            const el = val[i];
            if (!CUSTOM_FILTER_FN(el)) continue;
            hash = toString((el as any)[KEY]);
            if (!set.has(hash)) {
                set.add(hash);
                acc.push(el);
            }
        }
    } else {
        for (let i = 0; i < len; i++) {
            const el = val[i];
            if (FILTER_FN && !FILTER_FN(el)) continue;
            hash = toString(el);
            if (!set.has(hash)) {
                set.add(hash);
                acc.push(el);
            }
        }
    }

    return acc;
}

export {dedupe, dedupe as default};
