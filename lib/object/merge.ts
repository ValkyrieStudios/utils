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

type MergeOptions = {
    /**
     * Defaults to false, when passed as true it ensures all keys from both objects
     * are available in the merged object
     */
    union?: boolean;
}

const PROTO_OBJ = '[object Object]';

function innerMerge (target:{[key:string]:any},source:{[key:string]:any}, UNION:boolean) {
    const origin = UNION ? source : target;
    for (const key in origin) {
        const t_key = target[key];
        const s_key = source[key];
        if (
            Object.prototype.toString.call(t_key) === PROTO_OBJ &&
            Object.prototype.toString.call(s_key) === PROTO_OBJ
        ) {
            target[key] = innerMerge({...t_key}, s_key, UNION);
        } else {
            target[key] = s_key !== undefined ? s_key : t_key;
        }
    }

    return target;
}

/* Single source: When union is true: the result includes keys from target and source */
function merge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
    target: T,
    source: U,
    opts: { union: true }
): Merge<T, U>;

/* Single source: When union is false (or omitted): only target keys are retained. */
function merge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
    target: T,
    source: U,
    opts?: { union?: false }
): MergeNonUnion<T, U>;

/* Array source: For an array of sources with union true: the result includes the merge of all objects with types being tail-types */
function merge<T extends Record<string, unknown>, U extends Record<string, unknown>[]>(
    target: T,
    sources: [...U],
    opts: { union: true }
): MergeArray<T, U, true>;

/* Array source: For an array of sources with union false (or omitted): only target keys are retained but tail-types are used */
function merge<T extends Record<string, unknown>, U extends Record<string, unknown>[]>(
    target: T,
    sources: [...U],
    opts?: { union?: false }
): MergeArray<T, U, false>;

/**
 * Deep merge two objects together while ensuring nested objects also get merged,
 * take note: this does not merge onto passed objects by reference but instead
 * returns a new object
 *
 * @param {Record<string,any>} target - Base Object
 * @param {Record<string,any>|Record<string,any>[]} source - (default={}) Object to merge onto base object
 */
function merge (
    target:Record<string, any>,
    source:Record<string, any>|Record<string,any>[] = {},
    opts: MergeOptions  = {}
):Record<string, any> {
    if (
        Object.prototype.toString.call(target) !== PROTO_OBJ
    ) throw new Error('object/merge: Please ensure valid target/source is passed');

    /* Define union */
    const union = opts?.union === true;

    /* Get sources array */
    const sources = Array.isArray(source) ? source : [source];

    /* Merge */
    let acc = {...target};
    for (let i = 0; i < sources.length; i++) {
        const el = sources[i];
        if (Object.prototype.toString.call(el) !== PROTO_OBJ) continue;
        acc = innerMerge(acc, el, union);
    }

    return acc;
}

export {merge, merge as default};
