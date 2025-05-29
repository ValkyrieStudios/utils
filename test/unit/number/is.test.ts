import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import is from '../../../lib/number/is';

describe('Number - is', () => {
    it('Returns false when passing nothing', () => {
        // @ts-ignore
        expect(is()).toBe(false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(is(el)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        expect(is(1/0)).toBe(false);
    });

    it('Return true if passed a numeric value', () => {
        for (const el of CONSTANTS.IS_NUMERIC) {
            expect(is(el)).toBeTruthy();
        }
    });
});
