export function memoize (fn) {
    const cache = {};

    return function memoized (...args) {
        const key = JSON.stringify(args);

        if (key in cache) {
            return cache[key];
        }

        return (cache[key] = (fn(...args)));
    };
};
