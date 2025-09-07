import {describe, it, expect} from 'vitest';
import {getTime} from '../../constants';
import memoize from '../../../lib/caching/memoize';
import fnv1A from '../../../lib/hash/fnv1A';
import sleep from '../../../lib/function/sleep';
import {diff, toUTC} from '../../../lib/date';

describe('Caching - memoize', () => {
    it('Should cache and allow for large amount of calculations to be passed (benchmark 100000 < .1s)', () => {
        function fn (a: string) {
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
        for (let i = 0; i < 100000; i++) {
            memoized_fn(cases[Math.floor(Math.random() * 7)]);
        }
        runtime = getTime() - runtime;
        expect(runtime).toBeLessThan(100);
    });

    it('Should allow passing a cache_for to uncache after X ms', async () => {
        let calls = 0;
        const retrieveUser = (userId: string) => {
            calls++;
            return {id: userId, name: 'Peter'};
        };

        const memoized = memoize(retrieveUser, undefined, 100);

        expect(memoized('123')).toEqual({id: '123', name: 'Peter'});
        await sleep(105);
        expect(memoized('123')).toEqual({id: '123', name: 'Peter'});
        await sleep(105);
        expect(memoized('456')).toEqual({id: '456', name: 'Peter'});
        await sleep(105);
        expect(memoized('456')).toEqual({id: '456', name: 'Peter'});
        await sleep(105);
        expect(memoized('456')).toEqual({id: '456', name: 'Peter'});
        expect(calls).toBe(5);
    });

    it('Should allow passing a resolver for caching', () => {
        function fn (a: string) {
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

        for (let i = 0; i < 1_000_000; i++) {
            memoized_fn(cases[Math.floor(Math.random() * 7)]);
        }

        for (let i = 0; i < cases.length; i++) {
            /* @ts-ignore */
            expect(memoized_fn.cache.has(i)).toBe(true);
            /* @ts-ignore */
            expect(memoized_fn.cache.get(i).r).toBe(fnv1A(cases[i]));
        }
    });

    it('Should memoize sync function receiving object with id', () => {
        let calls = 0;
        const getUserById = (user: { id: string }) => {
            calls++;
            return {id: user.id, name: 'Peter'};
        };

        const memoized = memoize(getUserById);

        const userA = {id: '123'};
        const userB = {id: '456'};

        expect(memoized(userA)).toEqual({id: '123', name: 'Peter'});
        expect(memoized(userB)).toEqual({id: '456', name: 'Peter'});

        expect(memoized({id: '123'})).toEqual({id: '123', name: 'Peter'});
        expect(memoized({id: '456'})).toEqual({id: '456', name: 'Peter'});

        expect(calls).toBe(2);
    });

    describe('async', () => {
        it('Should work with async functions', async () => {
            const retrieveUser = async (userId: string) => {
                await sleep(100);
                return {id: userId, name: 'Peter'};
            };

            const memoized = memoize(retrieveUser);

            const before = toUTC(new Date());
            const out = await memoized('123');
            expect(out).toEqual({id: '123', name: 'Peter'});
            const after = toUTC(new Date());
            expect(diff(after, before)).toBeGreaterThanOrEqual(99);

            const before2 = toUTC(new Date());
            expect(await memoized('123')).toEqual({id: '123', name: 'Peter'});
            expect(await memoized('123')).toEqual({id: '123', name: 'Peter'});
            const after2 = toUTC(new Date());
            expect(diff(after2, before2)).toBeLessThan(10);
        });

        it('Should work with async functions and correctly call when not cached vs cached', async () => {
            let calls = 0;
            const retrieveUser = async (userId: string) => {
                await sleep(100);
                calls++;
                return {id: userId, name: 'Peter'};
            };

            const memoized = memoize(retrieveUser);

            const before = toUTC(new Date());
            expect(await memoized('123')).toEqual({id: '123', name: 'Peter'});
            expect(await memoized('123')).toEqual({id: '123', name: 'Peter'});
            expect(await memoized('456')).toEqual({id: '456', name: 'Peter'});
            const after = toUTC(new Date());
            const diffms = diff(after, before);
            expect(diffms).toBeGreaterThanOrEqual(200);
            expect(diffms).toBeLessThanOrEqual(250);
            expect(calls).toBe(2);
        });

        it('Should allow passing a cache_for to uncache after X ms', async () => {
            let calls = 0;
            const retrieveUser = async (userId: string) => {
                await sleep(100);
                calls++;
                return {id: userId, name: 'Peter'};
            };

            const memoized = memoize(retrieveUser, undefined, 100);

            expect(await memoized('123')).toEqual({id: '123', name: 'Peter'});
            await sleep(105);
            expect(await memoized('123')).toEqual({id: '123', name: 'Peter'});
            await sleep(105);
            expect(await memoized('456')).toEqual({id: '456', name: 'Peter'});
            expect(calls).toBe(3);
        });

        it('Should allow passing a resolver for caching', async () => {
            const fn = async (a: string) => fnv1A(`${a}`);

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

            for (let i = 0; i < 1_000_000; i++) {
                await memoized_fn(cases[Math.floor(Math.random() * 7)]);
            }

            for (let i = 0; i < cases.length; i++) {
                /* @ts-ignore */
                expect(memoized_fn.cache.has(i)).toBe(true);
                /* @ts-ignore */
                expect(memoized_fn.cache.get(i).r).toBe(fnv1A(cases[i]));
            }
        });

        it('Should memoize async function receiving object with id', async () => {
            let calls = 0;
            const getUserById = async (user: { id: string }) => {
                calls++;
                await sleep(50);
                return {id: user.id, name: 'Peter'};
            };

            const memoized = memoize(getUserById);

            expect(await memoized({id: '123'})).toEqual({id: '123', name: 'Peter'});
            expect(await memoized({id: '456'})).toEqual({id: '456', name: 'Peter'});

            expect(await memoized({id: '123'})).toEqual({id: '123', name: 'Peter'});
            expect(await memoized({id: '456'})).toEqual({id: '456', name: 'Peter'});

            expect(calls).toBe(2);
        });
    });
});
