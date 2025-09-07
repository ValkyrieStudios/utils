type DedupeFilterFn<T> = (el: T) => boolean;

type DedupeOptionsBase<T> = {
    /**
     * Pass a custom filter function which will be run in O(n) while deduping is going on
     */
    filter_fn?: DedupeFilterFn<T>;
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

    const filter = opts?.filter_fn;
    const key = opts?.key as keyof T | undefined;

    const acc: T[] = [];
    const seenPrimitives = new Set();
    const len = val.length;
    if (filter) {
        for (let i = 0; i < len; i++) {
            const el = val[i];
            const raw = key ? (el as any)?.[key] : el;
            // eslint-disable-next-line eqeqeq, no-eq-null
            if (raw != null && filter(el)) {
                const hash = typeof raw !== 'object' ? raw : JSON.stringify(raw);
                if (!seenPrimitives.has(hash)) {
                    seenPrimitives.add(hash);
                    acc.push(el);
                }
            }
        }
    } else {
        for (let i = 0; i < len; i++) {
            const el = val[i];
            const raw = key ? (el as any)?.[key] : el;
            // eslint-disable-next-line eqeqeq, no-eq-null
            if (raw != null) {
                const hash = typeof raw !== 'object' ? raw : JSON.stringify(raw);
                if (!seenPrimitives.has(hash)) {
                    seenPrimitives.add(hash);
                    acc.push(el);
                }
            }
        }
    }
    return acc;
}

export {dedupe, dedupe as default};
