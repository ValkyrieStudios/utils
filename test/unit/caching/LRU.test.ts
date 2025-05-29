import {describe, it, expect} from 'vitest';
import {LRUCache} from '../../../lib/caching/LRU';
import CONSTANTS from '../../constants';

describe('LRUCache', () => {
    describe('general', () => {
        it('Should set and get values from the cache', () => {
            const cache = new LRUCache<number>({max_size: 2});
            cache.set('a', 1);
            cache.set('b', 2);
            expect(cache.get('a')).toBe(1);
            expect(cache.get('b')).toBe(2);
        });

        it('Should evict the least recently used item when the cache exceeds max size', () => {
            const cache = new LRUCache<number>({max_size: 2});
            cache.set('a', 1);
            cache.set('b', 2);
            cache.get('a');
            cache.set('c', 3);
            expect(cache.get('a')).toBe(1);
            expect(cache.get('b')).toBeUndefined();
            expect(cache.get('c')).toBe(3);
        });

        it('Should remove an item when using the del method', () => {
            const cache = new LRUCache<number>({max_size: 2});
            cache.set('a', 1);
            cache.set('b', 2);
            cache.del('a');
            expect(cache.get('a')).toBeUndefined();
            expect(cache.get('b')).toBe(2);
        });

        it('Should clear the entire cache when calling clear', () => {
            const cache = new LRUCache<number>({max_size: 3});
            cache.set('a', 1);
            cache.set('b', 2);
            cache.set('c', 3);
            cache.clear();
            expect(cache.get('a')).toBeUndefined();
            expect(cache.get('b')).toBeUndefined();
            expect(cache.get('c')).toBeUndefined();
        });

        it('Should respect the max_size and evict when exceeded', () => {
            const cache = new LRUCache<number>({max_size: 2});
            cache.set('a', 1);
            cache.set('b', 2);
            cache.set('c', 3);
            expect(cache.get('a')).toBeUndefined();
            expect(cache.get('b')).toBe(2);
            expect(cache.get('c')).toBe(3);
        });

        it('Should allow reconfiguring the max_size', () => {
            const cache = new LRUCache<number>({max_size: 2});
            cache.set('a', 1);
            cache.set('b', 2);
            cache.max_size = 3;
            cache.set('c', 3);
            expect(cache.get('a')).toBe(1);
            expect(cache.get('b')).toBe(2);
            expect(cache.get('c')).toBe(3);
        });

        it('Should throw an error if an invalid max_size is set', () => {
            const cache = new LRUCache<number>({max_size: 2});
            expect(() => {
                cache.max_size = -1;
            }).toThrowError('max_size must be a positive integer');
        });

        it('Should handle non-existent keys gracefully', () => {
            const cache = new LRUCache<number>({max_size: 2});
            cache.set('a', 1);
            expect(cache.get('nonexistent')).toBeUndefined();
        });

        it('Should maintain correct eviction order based on usage', () => {
            const cache = new LRUCache<number>({max_size: 2});
            cache.set('a', 1);
            cache.set('b', 2);
            cache.get('a');
            cache.set('c', 3);
            expect(cache.get('a')).toBe(1);
            expect(cache.get('b')).toBeUndefined();
            expect(cache.get('c')).toBe(3);
        });
    });

    describe('ctor', () => {
        it('Should by default set a max size of 100 if not passed', () => {
            const instance = new LRUCache();
            expect(instance.max_size).toBe(100);
        });

        it('Should fall back to default options if passed an invalid options', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                const instance = new LRUCache(el);
                expect(instance.max_size).toBe(100);
            }
        });

        it('Should fall back to default max size if passed a non-number or invalid max size', () => {
            for (const el of [...CONSTANTS.NOT_INTEGER, 0, -100, -1, 10.5]) {
                const instance = new LRUCache({max_size: el});
                expect(instance.max_size).toBe(100);
            }
        });
    });

    describe('get', () => {
        it('Should be a function', () => {
            const instance = new LRUCache();
            expect(typeof instance.get).toBe('function');
        });

        it('Should not be an async function', () => {
            const instance = new LRUCache();
            expect(instance.get.constructor.name).not.toBe('AsyncFunction');
        });
    });

    describe('has', () => {
        it('Should be a function', () => {
            const instance = new LRUCache();
            expect(typeof instance.has).toBe('function');
        });

        it('Should not be an async function', () => {
            const instance = new LRUCache();
            expect(instance.has.constructor.name).not.toBe('AsyncFunction');
        });
    });

    describe('set', () => {
        it('Should be a function', () => {
            const instance = new LRUCache();
            expect(typeof instance.set).toBe('function');
        });

        it('Should not be an async function', () => {
            const instance = new LRUCache();
            expect(instance.set.constructor.name).not.toBe('AsyncFunction');
        });

        it('Should allow setting and automatically clear cache the moment something goes beyond size of cache', () => {
            const instance = new LRUCache({max_size: 20});
            for (let i = 1; i < 100; i++) instance.set(String(i), i);
            for (let i = 1; i < 80; i++) expect(instance.has(String(i))).toBe(false);
            for (let i = 81; i < 100; i++) expect(instance.has(String(i))).toBe(true);
        });
    });

    describe('set max_size', () => {
        it('Should allow reconfiguring instance max size', () => {
            const instance = new LRUCache({max_size: 3});
            instance.set('1', true);
            instance.set('2', true);
            instance.set('3', true);
            expect(instance.has('1')).toBe(true);
            instance.set('4', true);
            expect(instance.has('1')).toBe(false);

            const instance2 = new LRUCache({max_size: 3});
            instance2.set('1', true);
            instance2.set('2', true);
            instance2.set('3', true);
            expect(instance2.has('1')).toBe(true);
            instance2.max_size = 20;
            instance2.set('4', true);
            expect(instance2.has('1')).toBe(true);
        });

        it('Should allow reconfiguring instance max size to a lower count', () => {
            const instance = new LRUCache({max_size: 3});
            instance.set('1', true);
            instance.set('2', true);
            instance.set('3', true);
            expect(instance.has('1')).toBe(true);
            instance.max_size = 1;
            expect(instance.has('1')).toBe(false);
            expect(instance.has('2')).toBe(false);
            expect(instance.has('3')).toBe(true);
            instance.set('4', true);
            expect(instance.has('4')).toBe(true);
            expect(instance.has('3')).toBe(false);
        });
    });

    describe('del', () => {
        it('Should be a function', () => {
            const instance = new LRUCache();
            expect(typeof instance.del).toBe('function');
        });

        it('Should not be an async function', () => {
            const instance = new LRUCache();
            expect(instance.del.constructor.name).not.toBe('AsyncFunction');
        });

        it('Should not fail if key is not passed', () => {
            const instance = new LRUCache();
            instance.set('a', 999);
            /* @ts-ignore */
            instance.del(undefined);
            expect(instance.has('a')).toBe(true);
        });

        it('Should not fail if key does not exist', () => {
            const instance = new LRUCache();
            instance.set('a', 999);
            instance.del('b');
            expect(instance.has('a')).toBe(true);
            expect(instance.has('b')).toBe(false);
        });

        it('Should clear key if exists', () => {
            const instance = new LRUCache();
            instance.set('a', 999);
            instance.del('a');
            expect(instance.has('a')).toBe(false);
        });
    });

    describe('clear', () => {
        it('Should be a function', () => {
            const instance = new LRUCache();
            expect(typeof instance.clear).toBe('function');
        });

        it('Should not be an async function', () => {
            const instance = new LRUCache();
            expect(instance.clear.constructor.name).not.toBe('AsyncFunction');
        });
    });
});
