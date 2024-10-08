type DedupeOptions<T> = {
    /**
     * Pass a custom filter function which will be run in O(n) while deduping is going on
     */
    filter_fn?: (el: T) => boolean;
};

const REPL_NAN      = 'nan';
const REPL_TRUE     = 'true';
const REPL_FALSE    = 'false';
const REPL_UNDEF    = 'undefined';
const REPL_NULL     = 'null';

function getTypeString (el: any): string {
    switch (typeof el) { /* eslint-disable-line default-case */
        case 'string':
            return el;
        case 'number':
            return Number.isNaN(el) || !Number.isFinite(el) ? REPL_NAN : String(el);
        case 'boolean':
            return el ? REPL_TRUE : REPL_FALSE;
        case 'undefined':
            return REPL_UNDEF;
        case 'object':
            if (el === null) {
                return REPL_NULL;
            } else if (Array.isArray(el) || el.toString() === '[object Object]') {
                return JSON.stringify(el);
            } else if (el instanceof RegExp) {
                return el.toString();
            } else if (el instanceof Date) {
                return String(el.getTime());
            }
    }
    return '';
}

/**
 * Dedupes the provided array
 *
 * @param {Array} val - Array to dedupe
 * @param {DedupeOptions?} opts - Dedupe options
 */
function dedupe <T> (val:T[], opts?: DedupeOptions<T>):T[] {
    if (!Array.isArray(val)) return [];

    /* Check options */
    const FILTER_FN = opts?.filter_fn;

    const set: Set<string> = new Set();
    const acc: T[] = [];
    let hash: string;
    const len = val.length;

    for (let i = 0; i < len; i++) {
        const el = val[i];
        if (FILTER_FN && !FILTER_FN(el)) continue;
        hash = getTypeString(el);
        if (!set.has(hash)) {
            set.add(hash);
            acc.push(el);
        }
    }

    return acc;
}

export {dedupe, dedupe as default};
