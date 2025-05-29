import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isBetween from '../../../lib/number/isBetween';

describe('Number - isBetween', () => {
    it('Returns false when passing nothing', () => {
        // @ts-ignore
        expect(isBetween()).toBe(false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(isBetween(el, 0, 10)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        expect(isBetween(1 / 0, 0, 20)).toBe(false);
    });

    it('Return false if passed a non-numeric min', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(isBetween(0, el, 0)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan min', () => {
        expect(isBetween(0, 1 / 0, 0)).toBe(false);
    });

    it('Return false if passed a non-numeric max', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(isBetween(0, 0, el)).toBe(false);
        }
    });

    it('Return false if passed a numerical nan max', () => {
        expect(isBetween(0, 0, 1 / 0)).toBe(false);
    });

    it('Treat numeric values between ranges correctly', () => {
        for (const el of [
            [0, -1, 1],
            [-32, -100, -10],
            [3, 1, 9],
            [0.1, 0, 0.2],
        ]) {
            expect(isBetween(el[0], el[1], el[2])).toBeTruthy();
        }
    });

    it('Treat numeric values below lower bound as false', () => {
        for (const el of [
            [-1, 0, 1],
            [-101, -100, -10],
            [0, 1, 9],
            [-0.1, 0, 0.2],
        ]) {
            expect(isBetween(el[0], el[1], el[2])).toBe(false);
        }
    });

    it('Treat numeric values at lower bound as true', () => {
        for (const el of [
            [0, 0, 1],
            [-100, -100, -10],
            [1, 1, 9],
            [0, 0, 0.2],
        ]) {
            expect(isBetween(el[0], el[1], el[2])).toBeTruthy();
        }
    });

    it('Treat numeric values above upper bound as false', () => {
        for (const el of [
            [2, 0, 1],
            [-9, -100, -10],
            [10, 1, 9],
            [0.3, 0, 0.2],
        ]) {
            expect(isBetween(el[0], el[1], el[2])).toBe(false);
        }
    });

    it('Treat numeric values at upper bound as true', () => {
        for (const el of [
            [1, 0, 1],
            [-10, -100, -10],
            [9, 1, 9],
            [0.2, 0, 0.2],
        ]) {
            expect(isBetween(el[0], el[1], el[2])).toBeTruthy();
        }
    });
});
