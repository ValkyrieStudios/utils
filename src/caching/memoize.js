'use strict';

import isFunction from '../function/is';

export default function (fn, resolver = false) {
    const has_resolver = isFunction(resolver);
    const memoized = function () {
        //  Get key
        const key = has_resolver ? resolver.apply(this, arguments) : arguments[0]; // eslint-disable-line

        //  Check in cache
        if (memoized.cache.has(key)) return memoized.cache.get(key);

        //  Call function
        const result = fn.apply(this, arguments); // eslint-disable-line

        //  Set in cache
        memoized.cache.set(key, result);

        return result;
    };
    memoized.cache = new Map();
    return memoized;
}
