import {bench, describe} from 'vitest';
import {LRUCache} from '../../../lib/caching/LRU';

const lruCache = new LRUCache<number>({ max_size: 1000 });
const normalMap = new Map<string, number>();

for (let i = 0; i < 1000; i++) {
    lruCache.set(String(i), i);
    normalMap.set(String(i), i);
}

function computeValue(key: string): number {
    return parseInt(key) * 2;
}

describe('LRUCache vs no cache', () => {
    bench('LRUCache get', () => {
        const key = String(Math.floor(Math.random() * 1000));
        lruCache.get(key);
    });

    bench('Map get (no LRU logic)', () => {
        const key = String(Math.floor(Math.random() * 1000));
        normalMap.get(key);
    });

    bench('Direct compute (no cache)', () => {
        const key = String(Math.floor(Math.random() * 1000));
        computeValue(key);
    });

    bench('LRUCache set', () => {
        const key = String(Math.floor(Math.random() * 1000));
        lruCache.set(key, Math.random());
    });

    bench('Map set (no LRU logic)', () => {
        const key = String(Math.floor(Math.random() * 1000));
        normalMap.set(key, Math.random());
    });
});
