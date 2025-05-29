import {describe, it, expect} from 'vitest';
import noop from '../../../lib/function/noop';

describe('Function - noop', () => {
    it('Return nothing', () => {
        expect(noop()).toBe(undefined);
    });

    it('Not throw an error', () => {
        expect(() => noop()).not.toThrow();
    });
});
