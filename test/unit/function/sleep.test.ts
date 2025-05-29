import {describe, it, expect} from 'vitest';
import sleep from '../../../lib/function/sleep';

describe('Function - sleep', () => {
    it('Returns a new Promise', () => {
        const prom = sleep();
        expect(prom).toBeInstanceOf(Promise);
    });

    it('Returns a promise that resolves', async () => {
        let is_resolved = false;
        await sleep().then(() => {
            is_resolved = true; 
        });
        expect(is_resolved).toBe(true);
    });

    it('Resolves after the provided time', async () => {
        const timer_start = Date.now();
        await sleep(205);
        const timer_end = Date.now() - timer_start;
        expect(timer_end).toBeGreaterThanOrEqual(200);
    });

    it('Resolves immediately if provided time is smaller than 0', async () => {
        const timer_start = Date.now();
        await sleep(-1);
        const timer_end = Date.now() - timer_start;
        expect(timer_end).toBeLessThanOrEqual(5);
    });
});
