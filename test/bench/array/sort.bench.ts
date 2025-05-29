import { bench, describe } from 'vitest';
import sort from '../../../lib/array/sort';
import shuffle from '../../../lib/array/shuffle';

describe('Benchmark - custom sort vs native sort', () => {
    const generateArray = (size: number) => {
        const arr:{i:number}[] = [];
        for (let i = 0; i < size; i++) {
            arr.push({i});
        }
        shuffle(arr);
        return arr;
    };

    describe('Benchmark 10,000 items', () => {
        bench('custom sort asc', () => {
            const data = generateArray(10000);
            sort(data, 'i', 'asc');
        });

        bench('native sort asc', () => {
            const data = generateArray(10000);
            data.sort((a, b) => a.i - b.i);
        });

        bench('custom sort desc', () => {
            const data = generateArray(10000);
            sort(data, 'i', 'desc');
        });

        bench('native sort desc', () => {
            const data = generateArray(10000);
            data.sort((a, b) => b.i - a.i);
        });
    });

    describe('Benchmark 20,000 items', () => {
        bench('custom sort asc', () => {
            const data = generateArray(20000);
            sort(data, 'i', 'asc');
        });

        bench('native sort asc', () => {
            const data = generateArray(20000);
            data.sort((a, b) => a.i - b.i);
        });

        bench('custom sort desc', () => {
            const data = generateArray(20000);
            sort(data, 'i', 'desc');
        });

        bench('native sort desc', () => {
            const data = generateArray(20000);
            data.sort((a, b) => b.i - a.i);
        });
    });

    describe('Benchmark 30,000 items', () => {
        bench('custom sort asc', () => {
            const data = generateArray(30000);
            sort(data, 'i', 'asc');
        });

        bench('native sort asc', () => {
            const data = generateArray(30000);
            data.sort((a, b) => a.i - b.i);
        });

        bench('custom sort desc', () => {
            const data = generateArray(30000);
            sort(data, 'i', 'desc');
        });

        bench('native sort desc', () => {
            const data = generateArray(30000);
            data.sort((a, b) => b.i - a.i);
        });
    });
});
