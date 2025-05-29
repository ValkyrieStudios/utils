import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isNotEmptyArray from '../../../lib/array/isNotEmpty';

describe('Array - isNotEmptyArray', () => {
    it('Returns false when passing nothing', () => {
        // @ts-ignore
        expect(isNotEmptyArray()).toBe(false);
    });

    it('Return false when passed a non-array or empty array', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            expect(isNotEmptyArray(el)).toBe(false);
        }
    });

    it('Return true when passed a non-empty array', () => {
        expect(isNotEmptyArray(['hi there'])).toBe(true);
        expect(isNotEmptyArray([false])).toBe(true);
        expect(isNotEmptyArray([null])).toBe(true);
        expect(isNotEmptyArray([undefined])).toBe(true);
    });
});
