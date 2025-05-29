import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isBelow from '../../../lib/number/isBelow';

describe('Number - isBelow', () => {
    it('Returns false when passing nothing', () => {
        // @ts-ignore
        expect(isBelow()).toBe(false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(isBelow(el, 0)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        expect(isBelow(1 / 0, 0)).toBe(false);
    });

    it('Return false if passed a non-numeric comparator', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(isBelow(0, el)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan comparator', () => {
        expect(isBelow(0, 1 / 0)).toBe(false);
    });

    it('Treat numeric values below max correctly', () => {
        for (const el of [
            [0, 1],
            [-32, -10],
            [3, 9],
            [0.1, 0.2],
        ]) {
            expect(isBelow(el[0], el[1])).toBeTruthy();
        }
    });

    it('Treat numeric values above max as false', () => {
        for (const el of [
            [1, 0],
            [-99, -100],
            [9, 1],
            [-0.05, -0.1],
        ]) {
            expect(isBelow(el[0], el[1])).toBe(false);
        }
    });

    it('Treat numeric values at max as false', () => {
        for (const el of [0, -100, 1, 0, 0.56, 0.89]) {
            expect(isBelow(el, el)).toBe(false);
        }
    });
});
