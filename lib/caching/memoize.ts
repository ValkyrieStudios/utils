import isAsyncFunction from '../function/isAsync';
import isIntegerGt from '../number/isIntegerAbove';
import LRU from './LRU';

/**
 * Turn a function into a memoized function. An optional resolver function can be passed which allows custom cache key generation.
 *
 * Example:
 *  const memoized_function = memoize((a) => fnv1A(a));
 *
 * @param fn - Function to memoize
 * @param resolver - Optional resolver function to generate cache key. If not passed the first argument is used as map key
 * @param {false|number?} cache_duration_ms - Memoize for X milliseconds, if passed false will indefinitely memoize (default = false)
 * @param {number?} cache_max_size - Memoize at max X entries, defaults to 100
 */
function memoize <T extends (...args:any[]) => unknown> (
    fn:T,
    resolver?:(...args:Parameters<T>) => any,
    cache_duration_ms:number|false = false,
    cache_max_size:number = 100
):T {
    const cache_duration = isIntegerGt(cache_duration_ms, 0) ? cache_duration_ms : false;
    const cache = new LRU<any, {r:ReturnType<T>; ts:number}>({max_size: cache_max_size});

    const isResolverFn = typeof resolver === 'function';
    const memoized = isAsyncFunction(fn)
        ? async function (...args:Parameters<T>) {
            const key = isResolverFn ? resolver(...args) : args[0];
            const cached_val = cache.get(key);

            const now = Date.now();
            if (cached_val !== undefined && (cache_duration === false || (now - cached_val.ts) < cache_duration)) {
                return cached_val.r;
            }

            const result = await fn(...args) as ReturnType<T>;
            cache.set(key, {r: result, ts: now});
            return result;
        }
        : function (...args:Parameters<T>) {
            const key = isResolverFn ? resolver(...args) : args[0];
            const cached_val = cache.get(key);

            const now = Date.now();
            if (cached_val !== undefined && (cache_duration === false || (now - cached_val.ts) < cache_duration)) {
                return cached_val.r;
            }

            const result = fn(...args) as ReturnType<T>;
            cache.set(key, {r: result, ts: now});
            return result;
        };

    /* Attach cache to memoized function for external use */
    /* eslint-disable-next-line */
    /* @ts-ignore */
    memoized.cache = cache;

    return memoized as T;
}

export {memoize, memoize as default};
