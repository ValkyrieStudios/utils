'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function memoize(fn, resolver) {
    const memoized = function () {
        const key = typeof resolver === 'function' ? resolver.apply(this, arguments) : arguments[0];
        if (memoized.cache.has(key))
            return memoized.cache.get(key);
        const result = fn.apply(this, arguments);
        memoized.cache.set(key, result);
        return result;
    };
    memoized.cache = new Map();
    return memoized;
}
exports.default = memoize;
