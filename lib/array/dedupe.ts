import {fnv1A} from '../hash/fnv1A';

type DedupeOptions<T> = {
  filter_fn?: (el: T) => boolean;
};


/**
 * Dedupes the provided array
 *
 * @param {Array} val - Array to dedupe
 * @param {DedupeOptions?} opts - Dedupe options
 *
 * @returns Deduped array
 */
function dedupe <T> (val:T[], opts?: DedupeOptions<T>):T[] {
    if (!Array.isArray(val)) return [];

    /* Check options */
    const FILTER_FN = typeof opts?.filter_fn === 'function' ? opts?.filter_fn : false;

    const set:Set<number> = new Set();
    const acc:T[] = [];
    let hash:number;
    const len = val.length;
    if (FILTER_FN) {
        for (let i = 0; i < len; i++) {
            const el = val[i];
            if (FILTER_FN && !FILTER_FN(el)) continue;
            hash = fnv1A(el);
            if (!set.has(hash)) {
                set.add(hash);
                acc.push(el);
            }
        }
    } else {
        for (let i = 0; i < len; i++) {
            const el = val[i];
            hash = fnv1A(el);
            if (!set.has(hash)) {
                set.add(hash);
                acc.push(el);
            }
        }
    }

    return acc;
}

export {dedupe, dedupe as default};
