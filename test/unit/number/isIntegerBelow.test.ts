import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isIntegerBelow from '../../../lib/number/isIntegerBelow';

describe('Number - isIntegerBelow', () => {
    it('Returns false when passing nothing', () => {
        // @ts-ignore
        expect(isIntegerBelow()).toBe(false);
    });

    it('Return false if passed a non-integer value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            expect(isIntegerBelow(el, 0)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        expect(isIntegerBelow(1 / 0, 0)).toBe(false);
    });

    it('Return false if passed a non-numeric comparator', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(isIntegerBelow(0, el)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan comparator', () => {
        expect(isIntegerBelow(0, 1 / 0)).toBe(false);
    });

    it('Treat numeric values below max correctly', () => {
        for (const el of [
            [0, 1],
            [-32, -10],
            [3, 9],
            [0, 0.1],
        ]) {
            expect(isIntegerBelow(el[0], el[1])).toBeTruthy();
        }
    });

    it('Treat numeric values above max as false', () => {
        for (const el of [
            [1, 0],
            [-99, -100],
            [9, 8.99999],
        ]) {
            expect(isIntegerBelow(el[0], el[1])).toBe(false);
        }
    });

    it('Treat numeric values at max as false', () => {
        for (const el of [0, -100, 1]) {
            expect(isIntegerBelow(el, el)).toBe(false);
        }
    });
});
