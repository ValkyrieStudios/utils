'use strict';

export default function (fn) {
    const cache = {};

    return function memoized (...args) {
        const key = JSON.stringify(args);

        //  If already memoized -> return
        if (key in cache) return cache[key];

        //  Set cache key to output of function
        cache[key] = fn(...args);

        //  Return cached value
        return cache[key];
    };
}
