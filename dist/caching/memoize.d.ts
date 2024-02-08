/**
 * Turn a function into a memoized function. An optional resolver function can be passed which allows custom cache key generation.
 *
 * Example:
 *  const memoized_function = memoize((a) => fnv1A(a));
 *
 * @param fn - Function to memoize
 * @param resolver - Optional resolver function to generate cache key. If not passed the first argument is used as map key
 */
export default function memoize(fn: Function, resolver?: Function): Function;
