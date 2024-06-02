import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import {getTime}        from '../../constants';
import memoize          from '../../../lib/caching/memoize';
import fnv1A            from '../../../lib/hash/fnv1A';
import sleep            from '../../../lib/function/sleep';
import {diff, toUTC}    from '../../../lib/date';

describe('Caching - memoize', () => {
    it('Should cache and allow for large amount of calculations to be passed (benchmark 1000000 < .1s)', () => {
        function fn (a) {
            return fnv1A(`${a}`);
        }

        const memoized_fn = memoize(fn);
        const cases = [
            'aeywuqieiwqyeqw9374589236748974890237432',
            'bdjsahfjkhdsffjoihfihriofherwoirtuweroi',
            'ci4908239045734 h5;3h59085903470583405',
            'dvcmvkljiopfklfwdj iolfjeiwpie',
            'eeiwuo7809432538245834905 8 54543',
            'f,cvmmklfjpfe482390 7hjnofjwehdoirujier',
            '58934059348g4230-489230-94 0-2394-23049-2',
        ];

        let runtime = getTime();
        for (let i = 0; i < 1000000; i++) {
            memoized_fn(cases[Math.floor(Math.random() * (6 - 0 + 1)) + 0]);
        }
        runtime = getTime() - runtime;

        assert.ok(runtime < 100);
    });

    it('Should allow passing a cache_for to uncache after X ms', async () => {
        let calls = 0;
        const retrieveUser = function getUser (userId:string) {
            calls += 1;
            return {id: userId, name: 'Peter'};
        };

        const memoized = memoize(retrieveUser, undefined, 100);

        assert.deepEqual(memoized('123'), {id: '123', name: 'Peter'});
        await sleep(105);
        assert.deepEqual(memoized('123'), {id: '123', name: 'Peter'});
        await sleep(105);
        assert.deepEqual(memoized('456'), {id: '456', name: 'Peter'});
        await sleep(105);
        assert.deepEqual(memoized('456'), {id: '456', name: 'Peter'});
        await sleep(105);
        assert.deepEqual(memoized('456'), {id: '456', name: 'Peter'});
        assert.equal(calls, 5);
    });

    it('Should allow passing a resolver for caching', () => {
        function fn (a) {
            return fnv1A(`${a}`);
        }

        const cases = [
            'aeywuqieiwqyeqw9374589236748974890237432',
            'bdjsahfjkhdsffjoihfihriofherwoirtuweroi',
            'ci4908239045734 h5;3h59085903470583405',
            'dvcmvkljiopfklfwdj iolfjeiwpie',
            'eeiwuo7809432538245834905 8 54543',
            'f,cvmmklfjpfe482390 7hjnofjwehdoirujier',
            '58934059348g4230-489230-94 0-2394-23049-2',
        ];

        const memoized_fn = memoize(fn, el => cases.indexOf(el));

        for (let i = 0; i < 1000000; i++) {
            memoized_fn(cases[Math.floor(Math.random() * (6 - 0 + 1)) + 0]);
        }

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(0));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(0).r, fnv1A(cases[0]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(1));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(1).r, fnv1A(cases[1]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(2));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(2).r, fnv1A(cases[2]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(3));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(3).r, fnv1A(cases[3]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(4));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(4).r, fnv1A(cases[4]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(5));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(5).r, fnv1A(cases[5]));

        /* @ts-ignore */
        assert.ok(memoized_fn.cache.has(6));

        /* @ts-ignore */
        assert.equal(memoized_fn.cache.get(6).r, fnv1A(cases[6]));
    });

    describe('async', () => {
        it('Should work with async functions', async () => {
            const retrieveUser = async function getUser (userId:string) {
                await sleep(100);
                return {id: userId, name: 'Peter'};
            };

            const memoized = memoize(retrieveUser);

            /* Initial check, should run slow */
            const before = toUTC(new Date());
            const out = await memoized('123');
            assert.deepEqual(out, {id: '123', name: 'Peter'});
            const after = toUTC(new Date());
            assert.ok(diff(after, before) >= 100);

            /* Repeated check, should run fast */
            const before2 = toUTC(new Date());
            assert.deepEqual(await memoized('123'), {id: '123', name: 'Peter'});
            assert.deepEqual(await memoized('123'), {id: '123', name: 'Peter'});
            assert.deepEqual(await memoized('123'), {id: '123', name: 'Peter'});
            assert.deepEqual(await memoized('123'), {id: '123', name: 'Peter'});
            const after2 = toUTC(new Date());
            assert.ok(diff(after2, before2) < 10);
        });

        it('Should work with async functions and correctly call when not cached vs cached', async () => {
            let calls = 0;
            const retrieveUser = async function getUser (userId:string) {
                await sleep(100);
                calls += 1;
                return {id: userId, name: 'Peter'};
            };

            const memoized = memoize(retrieveUser);

            const before = toUTC(new Date());
            assert.deepEqual(await memoized('123'), {id: '123', name: 'Peter'});
            assert.deepEqual(await memoized('123'), {id: '123', name: 'Peter'});
            assert.deepEqual(await memoized('456'), {id: '456', name: 'Peter'});
            assert.deepEqual(await memoized('456'), {id: '456', name: 'Peter'});
            assert.deepEqual(await memoized('456'), {id: '456', name: 'Peter'});
            const after = toUTC(new Date());
            const diffms = diff(after, before);
            assert.ok(diffms >= 200 && diffms <= 250);
            assert.equal(calls, 2);
        });

        it('Should allow passing a cache_for to uncache after X ms', async () => {
            let calls = 0;
            const retrieveUser = async function getUser (userId:string) {
                await sleep(100);
                calls += 1;
                return {id: userId, name: 'Peter'};
            };

            const memoized = memoize(retrieveUser, undefined, 100);

            assert.deepEqual(await memoized('123'), {id: '123', name: 'Peter'});
            await sleep(105);
            assert.deepEqual(await memoized('123'), {id: '123', name: 'Peter'});
            await sleep(105);
            assert.deepEqual(await memoized('456'), {id: '456', name: 'Peter'});
            await sleep(105);
            assert.deepEqual(await memoized('456'), {id: '456', name: 'Peter'});
            await sleep(105);
            assert.deepEqual(await memoized('456'), {id: '456', name: 'Peter'});
            assert.equal(calls, 5);
        });

        it('Should allow passing a resolver for caching', async () => {
            const fn = async function getUser (a:string) {
                return fnv1A(`${a}`);
            };

            const cases = [
                'aeywuqieiwqyeqw9374589236748974890237432',
                'bdjsahfjkhdsffjoihfihriofherwoirtuweroi',
                'ci4908239045734 h5;3h59085903470583405',
                'dvcmvkljiopfklfwdj iolfjeiwpie',
                'eeiwuo7809432538245834905 8 54543',
                'f,cvmmklfjpfe482390 7hjnofjwehdoirujier',
                '58934059348g4230-489230-94 0-2394-23049-2',
            ];

            const memoized_fn = memoize(fn, el => cases.indexOf(el));

            for (let i = 0; i < 1000000; i++) {
                await memoized_fn(cases[Math.floor(Math.random() * (6 - 0 + 1)) + 0]);
            }

            /* @ts-ignore */
            assert.ok(memoized_fn.cache.has(0));

            /* @ts-ignore */
            assert.equal(memoized_fn.cache.get(0).r, fnv1A(cases[0]));

            /* @ts-ignore */
            assert.ok(memoized_fn.cache.has(1));

            /* @ts-ignore */
            assert.equal(memoized_fn.cache.get(1).r, fnv1A(cases[1]));

            /* @ts-ignore */
            assert.ok(memoized_fn.cache.has(2));

            /* @ts-ignore */
            assert.equal(memoized_fn.cache.get(2).r, fnv1A(cases[2]));

            /* @ts-ignore */
            assert.ok(memoized_fn.cache.has(3));

            /* @ts-ignore */
            assert.equal(memoized_fn.cache.get(3).r, fnv1A(cases[3]));

            /* @ts-ignore */
            assert.ok(memoized_fn.cache.has(4));

            /* @ts-ignore */
            assert.equal(memoized_fn.cache.get(4).r, fnv1A(cases[4]));

            /* @ts-ignore */
            assert.ok(memoized_fn.cache.has(5));

            /* @ts-ignore */
            assert.equal(memoized_fn.cache.get(5).r, fnv1A(cases[5]));

            /* @ts-ignore */
            assert.ok(memoized_fn.cache.has(6));

            /* @ts-ignore */
            assert.equal(memoized_fn.cache.get(6).r, fnv1A(cases[6]));
        });
    });
});
