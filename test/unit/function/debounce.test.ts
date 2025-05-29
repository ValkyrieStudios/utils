import {describe, it, expect} from 'vitest';
import debounce from '../../../lib/function/debounce';
import sleep from '../../../lib/function/sleep';
import CONSTANTS from '../../constants';

describe('Utils - debounce', () => {
    it('Should be a function', () => {
        expect(typeof debounce).toBe('function');
    });

    it('Should return a function', () => {
        const debounced = debounce(() => {}, 100);
        expect(typeof debounced).toBe('function');
    });

    it('Should throw if function is not a function', () => {
        for (const el of CONSTANTS.NOT_FUNCTION) {
            expect(() => debounce(el, 20)).toThrow('functions/debounce: Expected a function');
        }
    });

    it('Should throw if wait is not an integer or not above 0', () => {
        for (const el of [...CONSTANTS.NOT_INTEGER, 0, -10]) {
            expect(() => debounce(() => {}, el)).toThrow('functions/debounce: Wait should be an integer above 0');
        }
    });

    it('Should delay execution', async () => {
        let counter = 0;
        const increment = debounce(() => {
            counter += 1;
        }, 100);

        increment();
        expect(counter).toBe(0);

        await sleep(50);
        expect(counter).toBe(0);

        await sleep(60);
        expect(counter).toBe(1);
    });

    it('Should cancel delayed execution', async () => {
        let counter = 0;
        const increment = debounce(() => {
            counter += 1;
        }, 100);

        increment();
        expect(counter).toBe(0);

        increment.cancel();
        await sleep(100);
        expect(counter).toBe(0);
    });

    it('Should cancel delayed execution and have flush do nothing', async () => {
        let counter = 0;
        const increment = debounce(() => {
            counter += 1;
        }, 100);

        increment();
        expect(counter).toBe(0);

        increment.cancel();
        increment.flush();
        await sleep(100);
        expect(counter).toBe(0);
    });

    it('Should flush delayed execution', async () => {
        let counter = 0;
        const increment = debounce(() => {
            counter += 1;
        }, 100);

        increment();
        expect(counter).toBe(0);

        increment.flush();
        await sleep(1);
        expect(counter).toBe(1);
    });

    it('Should reset timer if called multiple times within wait period', async () => {
        let counter = 0;
        const increment = debounce(() => {
            counter += 1;
        }, 100);

        increment();
        await sleep(50);
        increment();
        await sleep(50);
        increment();
        await sleep(50);
        expect(counter).toBe(0);

        await sleep(60);
        expect(counter).toBe(1);
    });
});
