import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isInteger from '../../../lib/number/isInteger';

describe('Number - isInteger', () => {
    it('Returns false when passing nothing', () => {
        // @ts-ignore
        expect(isInteger()).toBe(false);
    });

    it('Return false if passed a non-integer value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            expect(isInteger(el)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        expect(isInteger(1 / 0)).toBe(false);
    });

    it('Return true if passed a numeric value', () => {
        for (const el of CONSTANTS.IS_INTEGER) {
            expect(isInteger(el)).toBeTruthy();
        }
    });
});
