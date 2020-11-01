'use strict';

import memoize  from '../../src/caching/memoize';
import fnv1A    from '../../src/hash/fnv1A';

describe("Caching - memoize", () => {
    let rslt_uncached, rslt_cached;

    beforeEach(() => {
        function fn (a, b, c) {
            return fnv1A(a + b + c);
        }

        const testcase = [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
        ];

        //  Uncached
        const test_uncached = function () {
            rslt_uncached = new Date();
            for (let i = 0; i < 100000; i++) {
                fn(...testcase[Math.floor(Math.random() * (6 - 0 + 1)) + 0]);
            }
            rslt_uncached = new Date() - rslt_uncached;
        };

        const test_cached = function () {
            fn = memoize(fn);

            //  Cached
            rslt_cached = new Date();
            for (let i = 0; i < 100000; i++) {
                fn(...testcase[Math.floor(Math.random() * (6 - 0 + 1)) + 0]);
            }
            rslt_cached = new Date() - rslt_cached;
        };

        test_uncached();
        test_cached();
    });

    it ('should cache', () => {
        expect(rslt_cached < rslt_uncached).toBe(true);
    });
});
