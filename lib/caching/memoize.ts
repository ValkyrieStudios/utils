/**
 * Turn a function into a memoized function. An optional resolver function can be passed which allows custom cache key generation.
 *
 * Example:
 *  const memoized_function = memoize((a) => fnv1A(a));
 *
 * @param fn - Function to memoize
 * @param resolver - Optional resolver function to generate cache key. If not passed the first argument is used as map key
 */
function memoize <
    T extends (...args:any[]) => unknown,
> (fn:T, resolver?:(...args:Parameters<T>) => any):T {
    const memoized = function (...args:Parameters<T>) {
        const key = typeof resolver === 'function' ? resolver(...args) : args[0];
        if (memoized.cache.has(key)) return memoized.cache.get(key);

        const result = fn(...args);
        memoized.cache.set(key, result);
        return result;
    };
    memoized.cache = new Map();

    /* eslint-disable-next-line */
    /* @ts-ignore */
    return memoized as T;
}

export {memoize, memoize as default};
