'use strict';

/* eslint-disable @typescript-eslint/ban-types */

/**
 * Turn a function into a memoized function. An optional resolver function can be passed which allows custom cache key generation.
 *
 * Example:
 *  const memoized_function = memoize((a) => fnv1A(a));
 *
 * @param fn - Function to memoize
 * @param resolver - Optional resolver function to generate cache key. If not passed the first argument is used as map key
 */
export default function memoize (fn:Function, resolver?:Function):Function {
    const memoized = function () {
        const key = typeof resolver === 'function' ? resolver.apply(this, arguments) : arguments[0]; // eslint-disable-line
        if (memoized.cache.has(key)) return memoized.cache.get(key);

        const result = fn.apply(this, arguments); // eslint-disable-line
        memoized.cache.set(key, result);
        return result;
    };
    memoized.cache = new Map();
    return memoized;
}
