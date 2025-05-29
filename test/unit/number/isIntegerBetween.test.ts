import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isIntegerBetween from '../../../lib/number/isIntegerBetween';

describe('Number - isIntegerBetween', () => {
    it('Returns false when passing nothing', () => {
        // @ts-ignore
        expect(isIntegerBetween()).toBe(false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            expect(isIntegerBetween(el, 0, 10)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        expect(isIntegerBetween(1 / 0, 0, 10)).toBe(false);
    });

    it('Return false if passed a non-numeric min', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(isIntegerBetween(0, el, 0)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan min', () => {
        expect(isIntegerBetween(0, 1 / 0, 0)).toBe(false);
    });

    it('Return false if passed a non-numeric max', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(isIntegerBetween(0, 0, el)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan max', () => {
        expect(isIntegerBetween(0, 0, 1 / 0)).toBe(false);
    });

    it('Treat numeric values between ranges correctly', () => {
        for (const el of [
            [0, -1, 1],
            [-32, -100, -10],
            [3, 1, 9],
            [1, 0, 2],
        ]) {
            expect(isIntegerBetween(el[0], el[1], el[2])).toBeTruthy();
        }
    });

    it('Treat numeric values below lower bound as false', () => {
        for (const el of [
            [-1, 0, 1],
            [-101, -100, -10],
            [0, 1, 9],
            [-1, -0.5, 1],
        ]) {
            expect(isIntegerBetween(el[0], el[1], el[2])).toBe(false);
        }
    });

    it('Treat numeric values at lower bound as true', () => {
        for (const el of [
            [0, 0, 1],
            [-100, -100, -10],
            [1, 1, 9],
            [0, 0, 0.2],
        ]) {
            expect(isIntegerBetween(el[0], el[1], el[2])).toBeTruthy();
        }
    });

    it('Treat numeric values above upper bound as false', () => {
        for (const el of [
            [2, 0, 1],
            [-9, -100, -10],
            [10, 1, 9],
            [1, 0, 0.5],
        ]) {
            expect(isIntegerBetween(el[0], el[1], el[2])).toBe(false);
        }
    });

    it('Treat numeric values at upper bound as true', () => {
        for (const el of [
            [1, 0, 1],
            [-10, -100, -10],
            [9, 1, 9],
        ]) {
            expect(isIntegerBetween(el[0], el[1], el[2])).toBeTruthy();
        }
    });
});
