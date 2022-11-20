'use strict';

import memoize  from '../../src/caching/memoize';
import fnv1A    from '../../src/hash/fnv1A';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("Caching - memoize", () => {
    it ('should cache', () => {
        let rslt_uncached, rslt_cached;

        function fn (a) {
            return fnv1A(`${a}`);
        }

        const testcase = [
            'aeywuqieiwqyeqw9374589236748974890237432',
            'bdjsahfjkhdsffjoihfihriofherwoirtuweroi',
            'ci4908239045734 h5;3h59085903470583405',
            'dvcmvkljiopfklfwdj iolfjeiwpie',
            'eeiwuo7809432538245834905 8 54543',
            'f,cvmmklfjpfe482390 7hjnofjwehdoirujier',
            '58934059348g4230-489230-94 0-2394-23049-2',
        ];

        //  Uncached
        const test_uncached = function () {
            rslt_uncached = new Date();
            for (let i = 0; i < 1000000; i++) {
                fn(
                    testcase[Math.floor(Math.random() * (6 - 0 + 1)) + 0]
                );
            }
            rslt_uncached = new Date() - rslt_uncached;
        };

        const test_cached = function () {
            let memoized_fn = memoize(fn);

            //  Cached
            rslt_cached = new Date();
            for (let i = 0; i < 1000000; i++) {
                memoized_fn(
                    testcase[Math.floor(Math.random() * (6 - 0 + 1)) + 0]
                );
            }
            rslt_cached = new Date() - rslt_cached;
        };

        test_uncached();
        test_cached();

        expect(rslt_cached < rslt_uncached).to.eql(true);
    });

    it ('should cache and allow for large amount of calculations to be passed (benchmark 1000000 < .1s)', () => {
        let rslt_cached;

        function fn (a) {
            return fnv1A(`${a}`);
        }

        const testcase = [
            'aeywuqieiwqyeqw9374589236748974890237432',
            'bdjsahfjkhdsffjoihfihriofherwoirtuweroi',
            'ci4908239045734 h5;3h59085903470583405',
            'dvcmvkljiopfklfwdj iolfjeiwpie',
            'eeiwuo7809432538245834905 8 54543',
            'f,cvmmklfjpfe482390 7hjnofjwehdoirujier',
            '58934059348g4230-489230-94 0-2394-23049-2',
        ];

        let memoized_fn = memoize(fn);

        //  Cached
        rslt_cached = new Date();
        for (let i = 0; i < 1000000; i++) {
            memoized_fn(
                testcase[Math.floor(Math.random() * (6 - 0 + 1)) + 0]
            );
        }
        rslt_cached = new Date() - rslt_cached;

        expect(rslt_cached).to.be.lt(100);
    });

    it ('should allow passing a resolver for caching', () => {
        function fn (a) {
            return fnv1A(`${a}`);
        }

        const testcase = [
            'aeywuqieiwqyeqw9374589236748974890237432',
            'bdjsahfjkhdsffjoihfihriofherwoirtuweroi',
            'ci4908239045734 h5;3h59085903470583405',
            'dvcmvkljiopfklfwdj iolfjeiwpie',
            'eeiwuo7809432538245834905 8 54543',
            'f,cvmmklfjpfe482390 7hjnofjwehdoirujier',
            '58934059348g4230-489230-94 0-2394-23049-2',
        ];

        let memoized_fn = memoize(fn, el => {
            return testcase.indexOf(el);
        });

        //  Cached
        for (let i = 0; i < 1000000; i++) {
            memoized_fn(
                testcase[Math.floor(Math.random() * (6 - 0 + 1)) + 0]
            );
        }

        expect(memoized_fn.cache.has(0)).to.eql(true);
        expect(memoized_fn.cache.get(0)).to.eql(fnv1A(testcase[0]));

        expect(memoized_fn.cache.has(1)).to.eql(true);
        expect(memoized_fn.cache.get(1)).to.eql(fnv1A(testcase[1]));

        expect(memoized_fn.cache.has(2)).to.eql(true);
        expect(memoized_fn.cache.get(2)).to.eql(fnv1A(testcase[2]));

        expect(memoized_fn.cache.has(3)).to.eql(true);
        expect(memoized_fn.cache.get(3)).to.eql(fnv1A(testcase[3]));

        expect(memoized_fn.cache.has(4)).to.eql(true);
        expect(memoized_fn.cache.get(4)).to.eql(fnv1A(testcase[4]));

        expect(memoized_fn.cache.has(5)).to.eql(true);
        expect(memoized_fn.cache.get(5)).to.eql(fnv1A(testcase[5]));

        expect(memoized_fn.cache.has(6)).to.eql(true);
        expect(memoized_fn.cache.get(6)).to.eql(fnv1A(testcase[6]));
    });
});
