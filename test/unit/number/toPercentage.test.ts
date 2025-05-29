/* eslint-disable no-new-wrappers */

import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import toPercentage from '../../../lib/number/toPercentage';

describe('Number - toPercentage', () => {
    it('Should throw if not passed anything', () => {
        // @ts-ignore
        expect(() => toPercentage()).toThrow(new TypeError('value/min/max should be numeric'));
    });

    it('Should throw if not passed a numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(() => toPercentage(el)).toThrow(new TypeError('value/min/max should be numeric'));
        }
    });

    it('Should throw if passed a min and its a non-numeric value', () => {
        for (const el of [
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_STRING,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_ARRAY,
            ...CONSTANTS.IS_OBJECT,
            ...CONSTANTS.IS_FUNCTION,
            null,
            new Number(1.12345),
            new Number(Number.EPSILON),
        ]) {
            // @ts-ignore
            expect(() => toPercentage(20, 0, el, 100)).toThrow(new TypeError('value/min/max should be numeric'));
        }
    });

    it('Should throw if passed a max and its a non-numeric value', () => {
        for (const el of [
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_STRING,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_ARRAY,
            ...CONSTANTS.IS_OBJECT,
            ...CONSTANTS.IS_FUNCTION,
            null,
            new Number(1.12345),
            new Number(Number.EPSILON),
        ]) {
            // @ts-ignore
            expect(() => toPercentage(20, 0, 0, el)).toThrow(new TypeError('value/min/max should be numeric'));
        }
    });

    it('should correctly calculate the percentage', () => {
        expect(toPercentage(0.5)).toBe(50);
    });

    it('should correctly calculate the percentage with precision', () => {
        expect(toPercentage(0.50106579, 0)).toBe(50);
        expect(toPercentage(0.50106579, 1)).toBe(50.1);
        expect(toPercentage(0.50116579, 2)).toBe(50.12);
        expect(toPercentage(0.50116579, 3)).toBe(50.117);
        expect(toPercentage(0.50116579, 4)).toBe(50.1166);
        expect(toPercentage(0.50116579, 5)).toBe(50.11658);
    });

    it('should correctly apply range logic when provided', () => {
        expect(toPercentage(5, 0, -10, 10)).toBe(75);
        expect(toPercentage(-356, 0, -1000, 1000)).toBe(32);
        expect(toPercentage(-356.52, 3, -1000, 1000)).toBe(32.174);
        expect(toPercentage(0.005, 0, 0, 0.1)).toBe(5);
    });
});
