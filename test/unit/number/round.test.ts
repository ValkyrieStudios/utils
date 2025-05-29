/* eslint-disable no-loss-of-precision */

import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import round from '../../../lib/number/round';

describe('Number - round', () => {
    it('Should throw if not passed anything', () => {
        // @ts-ignore
        expect(() => round()).toThrow(new TypeError('Value should be numeric'));
    });

    it('Should throw if not passed a numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(() => round(el)).toThrow(new TypeError('Value should be numeric'));
        }
    });

    it('Should correctly round a value', () => {
        expect(round(5.123456789)).toBe(5);
    });

    it('Should correctly round a value and default to 0 precision if not passed an integer for precision', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            expect(round(5.123456789, el)).toBe(5);
        }
    });

    it('Should correctly round a value and default to 0 precision if passed an integer below 0 for precision', () => {
        for (const el of [-1, -10, -999]) {
            expect(round(5.123456789, el)).toBe(5);
        }
    });

    it('Should correctly round a value with precision', () => {
        expect(round(5.123456789, 0)).toBe(5);
        expect(round(5.123456789, 1)).toBe(5.1);
        expect(round(5.123456789, 2)).toBe(5.12);
        expect(round(5.123456789, 3)).toBe(5.123);
        expect(round(5.123456789, 4)).toBe(5.1235);
        expect(round(5.123456789, 5)).toBe(5.12346);
        expect(round(42.139691918126184, 3)).toBe(42.14);
        expect(round(42.134691918126184, 3)).toBe(42.135);
        expect(round(0.5)).toBe(1);
        expect(round(-0.5)).toBe(-1);
        expect(round(5.12, 1)).toBe(5.1);
        expect(round(-5.12, 1)).toBe(-5.1);
        expect(round(1.005, 2)).toBe(1.01);
        expect(round(39.425, 2)).toBe(39.43);
        expect(round(-1.005, 2)).toBe(-1.01);
        expect(round(-39.425, 2)).toBe(-39.43);
    });
});
