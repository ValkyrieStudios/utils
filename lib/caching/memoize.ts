import isAsyncFunction from '../function/isAsync';
import isIntegerGt from '../number/isIntegerAbove';
import toUTC from '../date/toUTC';
import diff from '../date/diff';

/**
 * Turn a function into a memoized function. An optional resolver function can be passed which allows custom cache key generation.
 *
 * Example:
 *  const memoized_function = memoize((a) => fnv1A(a));
 *
 * @param fn - Function to memoize
 * @param resolver - Optional resolver function to generate cache key. If not passed the first argument is used as map key
 * @param {false|number?} memoize_for - Memoize for X milliseconds, if passed false will indefinitely memoize (default = false) 
 */
function memoize <
    T extends (...args:any[]) => unknown,
> (fn:T, resolver?:(...args:Parameters<T>) => any, memoize_for:number|false = false):T {
    const cache_for = isIntegerGt(memoize_for, 0) ? memoize_for : false;

    if (isAsyncFunction(fn)) {
        const memoized = async function (...args:Parameters<T>) {
            const key = typeof resolver === 'function' ? resolver(...args) : args[0];
            if (memoized.cache.has(key)) {
                const cached_val = memoized.cache.get(key);
                if (cache_for === false || diff(toUTC(new Date()), cached_val.d) < cache_for) {
                    return cached_val.r;
                }
            }

            const result = await fn(...args);
            memoized.cache.set(key, {r: result, d: toUTC(new Date())});
            return result;
        };
        memoized.cache = new Map();

        /* eslint-disable-next-line */
        /* @ts-ignore */
        return memoized as T;
    } else {
        const memoized = function (...args:Parameters<T>) {
            const key = typeof resolver === 'function' ? resolver(...args) : args[0];
            if (memoized.cache.has(key)) {
                const cached_val = memoized.cache.get(key);
                if (cache_for === false || diff(toUTC(new Date()), cached_val.d) < cache_for) {
                    return cached_val.r;
                }
            }

            const result = fn(...args);
            memoized.cache.set(key, {r: result, d: toUTC(new Date())});
            return result;
        };
        memoized.cache = new Map();

        /* eslint-disable-next-line */
        /* @ts-ignore */
        return memoized as T;
    }
}

export {memoize, memoize as default};
