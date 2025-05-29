import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isIntegerAbove from '../../../lib/number/isIntegerAbove';

describe('Number - isIntegerAbove', () => {
    it('Returns false when passing nothing', () => {
        // @ts-ignore
        expect(isIntegerAbove()).toBe(false);
    });

    it('Return false if passed a non-integer value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            expect(isIntegerAbove(el, 0)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        expect(isIntegerAbove(1 / 0, 0)).toBe(false);
    });

    it('Return false if passed a non-numeric comparator', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(isIntegerAbove(0, el)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan comparator', () => {
        expect(isIntegerAbove(0, 1 / 0)).toBe(false);
    });

    it('Treat numeric values above min correctly', () => {
        for (const el of [
            [1, 0],
            [-99, -100],
            [9, 8.99999],
        ]) {
            expect(isIntegerAbove(el[0], el[1])).toBeTruthy();
        }
    });

    it('Treat numeric values below min as false', () => {
        for (const el of [
            [0, 1],
            [-32, -10],
            [3, 9],
            [0, 0.1],
        ]) {
            expect(isIntegerAbove(el[0], el[1])).toBe(false);
        }
    });

    it('Treat numeric values at min as false', () => {
        for (const el of [0, -100, 1]) {
            expect(isIntegerAbove(el, el)).toBe(false);
        }
    });
});
