import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
import {LRUCache} from '../../../lib/caching/LRU';
import CONSTANTS from '../../constants';

describe('LRUCache', () => {
    describe('general', () => {
        it('Should set and get values from the cache', () => {
            const cache = new LRUCache<number>({max_size: 2});

            cache.set('a', 1);
            cache.set('b', 2);

            assert.equal(cache.get('a'), 1);
            assert.equal(cache.get('b'), 2);
        });

        it('Should evict the least recently used item when the cache exceeds max size', () => {
            const cache = new LRUCache<number>({max_size: 2});

            cache.set('a', 1);
            cache.set('b', 2);

            // Access 'a' to mark it as recently used
            cache.get('a');

            // Now adding 'c' should evict 'b' (because 'b' was least recently used)
            cache.set('c', 3);

            assert.equal(cache.get('a'), 1);
            assert.equal(cache.get('b'), undefined); // 'b' should be evicted
            assert.equal(cache.get('c'), 3);
        });

        it('Should remove an item when using the del method', () => {
            const cache = new LRUCache<number>({max_size: 2});

            cache.set('a', 1);
            cache.set('b', 2);

            // Remove 'a' from the cache
            cache.del('a');

            assert.equal(cache.get('a'), undefined);
            assert.equal(cache.get('b'), 2);
        });

        it('Should clear the entire cache when calling clear', () => {
            const cache = new LRUCache<number>({max_size: 3});

            cache.set('a', 1);
            cache.set('b', 2);
            cache.set('c', 3);

            cache.clear();

            assert.equal(cache.get('a'), undefined);
            assert.equal(cache.get('b'), undefined);
            assert.equal(cache.get('c'), undefined);
        });

        it('Should respect the max_size and evict when exceeded', () => {
            const cache = new LRUCache<number>({max_size: 2});

            cache.set('a', 1);
            cache.set('b', 2);
            cache.set('c', 3); // This should evict 'a'

            assert.equal(cache.get('a'), undefined); // 'a' should be evicted
            assert.equal(cache.get('b'), 2);
            assert.equal(cache.get('c'), 3);
        });

        it('Should allow reconfiguring the max_size', () => {
            const cache = new LRUCache<number>({max_size: 2});

            cache.set('a', 1);
            cache.set('b', 2);

            // Change max_size to 3
            cache.max_size = 3;

            cache.set('c', 3);

            assert.equal(cache.get('a'), 1); // 'a' should still be in the cache
            assert.equal(cache.get('b'), 2);
            assert.equal(cache.get('c'), 3);
        });

        it('Should throw an error if an invalid max_size is set', () => {
            const cache = new LRUCache<number>({max_size: 2});

            assert.throws(() => {
                cache.max_size = -1; // Invalid max_size
            }, new Error('max_size must be a positive integer'));
        });

        it('Should handle non-existent keys gracefully', () => {
            const cache = new LRUCache<number>({max_size: 2});

            cache.set('a', 1);

            assert.equal(cache.get('nonexistent'), undefined);
        });

        it('Should maintain correct eviction order based on usage', () => {
            const cache = new LRUCache<number>({max_size: 2});

            cache.set('a', 1);
            cache.set('b', 2);
            cache.get('a'); // 'a' is accessed
            cache.set('c', 3); // Should evict 'b'

            assert.equal(cache.get('a'), 1); // 'a' should be retained
            assert.equal(cache.get('b'), undefined); // 'b' should be evicted
            assert.equal(cache.get('c'), 3); // 'c' should be in cache
        });
    });

    describe('ctor', () => {
        it('Should by default set a max size of 100 if not passed', () => {
            const instance = new LRUCache();
            assert.equal(instance.max_size, 100);
        });

        it('Should fall back to default options if passed an invalid options', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                const instance = new LRUCache(el);
                assert.equal(instance.max_size, 100);
            }
        });

        it('Should fall back to default max size if passed a non-number or invalid max size', () => {
            for (const el of [...CONSTANTS.NOT_INTEGER, 0, -100, -1, 10.5]) {
                const instance = new LRUCache({max_size: el});
                assert.equal(instance.max_size, 100);
            }
        });
    });

    describe('get', () => {
        it('Should be a function', () => {
            const instance = new LRUCache();
            assert.ok(typeof instance.get === 'function');
        });

        it('Should not be an async function', () => {
            const instance = new LRUCache();
            assert.ok(instance.get.constructor.name !== 'AsyncFunction');
        });
    });

    describe('has', () => {
        it('Should be a function', () => {
            const instance = new LRUCache();
            assert.ok(typeof instance.has === 'function');
        });

        it('Should not be an async function', () => {
            const instance = new LRUCache();
            assert.ok(instance.has.constructor.name !== 'AsyncFunction');
        });
    });

    describe('set', () => {
        it('Should be a function', () => {
            const instance = new LRUCache();
            assert.ok(typeof instance.set === 'function');
        });

        it('Should not be an async function', () => {
            const instance = new LRUCache();
            assert.ok(instance.set.constructor.name !== 'AsyncFunction');
        });

        it('Should allow setting and automatically clear cache the moment something goes beyond size of cache', () => {
            const instance = new LRUCache({max_size: 20});
            for (let i = 1; i < 100; i++) instance.set(String(i), i);

            /* 1 -> 80 should not be found */
            for (let i = 1; i < 80; i++) assert.ok(!instance.has(String(i)));

            /* 81 -> 99 should be found */
            for (let i = 81; i < 100; i++) assert.ok(instance.has(String(i)));
        });
    });

    describe('set max_size', () => {
        it('Should allow reconfiguring instance max size', () => {
            const instance = new LRUCache({max_size: 3});
            instance.set(String(1), true);
            instance.set(String(2), true);
            instance.set(String(3), true);
            assert.ok(instance.has(String(1)));
            instance.set(String(4), true);
            assert.ok(!instance.has(String(1)));

            /* Reconfigured to 4 */
            const instance2 = new LRUCache({max_size: 3});
            instance2.set(String(1), true);
            instance2.set(String(2), true);
            instance2.set(String(3), true);
            assert.ok(instance2.has(String(1)));
            instance2.max_size = 20;
            instance2.set(String(4), true);
            assert.ok(instance2.has(String(1)));
        });

        it('Should allow reconfiguring instance max size to a lower count', () => {
            const instance = new LRUCache({max_size: 3});
            instance.set(String(1), true);
            instance.set(String(2), true);
            instance.set(String(3), true);
            assert.ok(instance.has(String(1)));
            /* Reconfigured to 1 */
            instance.max_size = 1;
            assert.ok(!instance.has(String(1)));
            assert.ok(!instance.has(String(2)));
            assert.ok(instance.has(String(3)));
            instance.set(String(4), true);
            assert.ok(instance.has(String(4)));
            assert.ok(!instance.has(String(3)));
        });
    });

    describe('del', () => {
        it('Should be a function', () => {
            const instance = new LRUCache();
            assert.ok(typeof instance.del === 'function');
        });

        it('Should not be an async function', () => {
            const instance = new LRUCache();
            assert.ok(instance.del.constructor.name !== 'AsyncFunction');
        });

        it('Should not fail if key is not passed', () => {
            const instance = new LRUCache();
            instance.set('a', 999);
            /* @ts-ignore */
            instance.del();
            assert.ok(instance.has('a'));
        });

        it('Should not fail if key does not exist', () => {
            const instance = new LRUCache();
            instance.set('a', 999);
            instance.del('b');
            assert.ok(instance.has('a'));
            assert.ok(!instance.has('b'));
        });

        it('Should clear key if exists', () => {
            const instance = new LRUCache();
            instance.set('a', 999);
            instance.del('a');
            assert.ok(!instance.has('a'));
        });
    });

    describe('clear', () => {
        it('Should be a function', () => {
            const instance = new LRUCache();
            assert.ok(typeof instance.clear === 'function');
        });

        it('Should not be an async function', () => {
            const instance = new LRUCache();
            assert.ok(instance.clear.constructor.name !== 'AsyncFunction');
        });
    });
});
