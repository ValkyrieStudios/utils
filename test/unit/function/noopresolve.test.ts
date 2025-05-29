import {describe, it, expect} from 'vitest';
import noopresolve from '../../../lib/function/noopresolve';

describe('Function - noopresolve', () => {
    it('Returns a new Promise', () => {
        const prom = noopresolve();
        expect(prom).toBeInstanceOf(Promise);
    });

    it('Resolves the promise', async () => {
        let is_resolved = false;
        await noopresolve().then(() => {
            is_resolved = true; 
        }).catch(() => {});
        expect(is_resolved).toBe(true);
    });

    it('Resolves the promise with passed variable', async () => {
        const out = await noopresolve(56);
        expect(out).toBe(56);
    });
});
