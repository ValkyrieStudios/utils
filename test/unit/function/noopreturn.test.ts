import {describe, it, expect} from 'vitest';
import noopreturn from '../../../lib/function/noopreturn';

describe('Function - noopreturn', () => {
    it('Returns undefined when called without values', () => {
        expect(noopreturn()).toBeUndefined();
    });

    it('Returns the passed value', () => {
        expect(noopreturn(45)).toBe(45);
    });

    it('Does not throw an error', () => {
        expect(() => noopreturn()).not.toThrow();
    });
});
