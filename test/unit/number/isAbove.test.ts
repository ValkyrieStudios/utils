import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isAbove from '../../../lib/number/isAbove';

describe('Number - isAbove', () => {
    it('Returns false when passing nothing', () => {
        // @ts-ignore
        expect(isAbove()).toBe(false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(isAbove(el, 0)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        expect(isAbove(1 / 0, 0)).toBe(false);
    });

    it('Return false if passed a non-numeric comparator', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(isAbove(0, el)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan comparator', () => {
        expect(isAbove(0, 1 / 0)).toBe(false);
    });

    it('Treat numeric values above min correctly', () => {
        for (const el of [
            [1, 0],
            [-10, -32],
            [9, 3],
            [0.2, 0.1],
        ]) {
            expect(isAbove(el[0], el[1])).toBeTruthy();
        }
    });

    it('Treat numeric values below min as false', () => {
        for (const el of [
            [0, 1],
            [-100, -99],
            [1, 9],
            [-0.1, -0.05],
        ]) {
            expect(isAbove(el[0], el[1])).toBe(false);
        }
    });

    it('Treat numeric values at min as false', () => {
        for (const el of [0, -100, 1, 0, 0.56, 0.89]) {
            expect(isAbove(el, el)).toBe(false);
        }
    });
});
