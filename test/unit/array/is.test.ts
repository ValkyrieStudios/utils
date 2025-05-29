import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isArray from '../../../lib/array/is';

describe('Array - is', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(isArray()).toBe(false);
    });

    it('Return false when passed a non-array', () => {
        for (const el of CONSTANTS.NOT_ARRAY) {
            expect(isArray(el)).toBe(false);
        }
    });

    it('Return true when passed an empty array', () => {
        expect(isArray([])).toBe(true);
    });

    it('Return true when passed a non-empty array', () => {
        for (const el of CONSTANTS.IS_ARRAY) {
            expect(isArray(el)).toBe(true);
        }
        expect(isArray([false])).toBe(true);
        expect(isArray([null])).toBe(true);
        expect(isArray([undefined])).toBe(true);
    });
});
