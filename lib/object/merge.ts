/**
 * For union true: for every key in T or U, use U’s type if available; otherwise T’s.
 */
type Merge<T, U> = {
    [K in keyof T | keyof U]: K extends keyof U
        ? U[K]
        : K extends keyof T
            ? T[K]
            : never;
};

/**
 * For union false: only keys in T are retained; if U has a key, override its type.
 */
type MergeNonUnion<T, U> = {
    [K in keyof T]: K extends keyof U ? U[K] : T[K];
};

/**
 * Recursively merge an array of source objects.
 * For each element in the array, apply Merge (if union is true)
 * or MergeNonUnion (if union is false).
 */
type MergeArray<T, U extends Record<string, unknown>[], Union extends boolean> = U extends [infer Head, ...infer Tail]
    ? Head extends Record<string, unknown>
        ? Tail extends Record<string, unknown>[]
            ? MergeArray<
                Union extends true
                    ? Merge<T, Head>
                    : MergeNonUnion<T, Head>,
                Tail,
                Union
            >
            : Union extends true
                ? Merge<T, Head>
                : MergeNonUnion<T, Head>
        : T
    : T;

type Merged<
    T extends Record<string, unknown>,
    U extends Record<string, unknown> | Record<string, unknown>[],
    Union extends boolean
> = U extends any[]
    ? MergeArray<T, U, Union>
    : Union extends true
        ? Merge<T, U>
        : MergeNonUnion<T, U>;

function innerMerge (target:Record<string, unknown>,source:Record<string, unknown>, UNION:boolean) {
    const origin = UNION ? source : target;
    for (const key in origin) {
        const t_val = target[key];
        const s_val = source[key];
        if (s_val !== undefined && t_val !== s_val) {
            target[key] = Object.prototype.toString.call(t_val) === '[object Object]' &&
                Object.prototype.toString.call(s_val) === '[object Object]'
                ? innerMerge(t_val as Record<string, unknown>, s_val as Record<string, unknown>, UNION)
                : s_val;
        }
    }

    return target;
}

/**
 * Deep merge two objects together while ensuring nested objects also get merged,
 * take note: this does not merge onto passed objects by reference but instead
 * returns a new object
 *
 * @param {Record<string,unknown>} target - Base Object
 * @param {Record<string,unknown>|Record<string,unknown>[]} source - (default={}) Object to merge onto base object
 */
function merge  <
    T extends Record<string, unknown>,
    U extends Record<string, unknown> | [Record<string, unknown>, ...Record<string, unknown>[]],
    Union extends boolean = false
> (
    target:T,
    source:U,
    opts: {
        /**
         * Defaults to false, when passed as true it ensures all keys from both objects
         * are available in the merged object
         */
        union?: Union
    } = {}
):Merged<T, U, Union> {
    if (
        Object.prototype.toString.call(target) !== '[object Object]'
    ) throw new Error('object/merge: Please ensure valid target/source is passed');

    /* Define union */
    const union = opts?.union === true;

    /* Get sources array */
    const sources = Array.isArray(source) ? source : [source];

    /* Merge */
    let acc:Record<string, unknown> = {...target};
    for (let i = 0; i < sources.length; i++) {
        const el = sources[i];
        if (
            el &&
            Object.prototype.toString.call(el) === '[object Object]'
        ) acc = innerMerge(acc, el, union);
    }

    return acc as Merged<T, U, Union>;
}

export {merge, merge as default};
