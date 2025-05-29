/* eslint-disable no-new-wrappers */

import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import randomIntBetween from '../../../lib/number/randomIntBetween';

describe('Number - randomIntBetween', () => {
    it('Returns a number when passing nothing', () => {
        expect(typeof randomIntBetween()).toBe('number');
    });

    it('Should default to a random integer between 0 and 10', () => {
        for (let i = 0; i < 100; i++) {
            const random = randomIntBetween();
            expect(Number.isInteger(random)).toBe(true);
            expect(random).toBeGreaterThanOrEqual(0);
            expect(random).toBeLessThan(10);
        }
    });

    it('Should return a random integer between min and max 0 - 100', () => {
        for (let i = 0; i < 100; i++) {
            const random = randomIntBetween(0, 100);
            expect(Number.isInteger(random)).toBe(true);
            expect(random).toBeGreaterThanOrEqual(0);
            expect(random).toBeLessThan(100);
        }
    });

    it('Should return a random integer between min and max 1000 - 100000', () => {
        for (let i = 0; i < 100; i++) {
            const random = randomIntBetween(0, 100000);
            expect(Number.isInteger(random)).toBe(true);
            expect(random).toBeGreaterThanOrEqual(0);
            expect(random).toBeLessThan(100000);
        }
    });

    it('Should return a random integer between min and max (random min) - (random max)', () => {
        for (let i = 0; i < 50; i++) {
            const r1 = Math.round(Math.random() * 1000000);
            const r2 = Math.round(Math.random() * 10000000);

            if (r1 < r2) {
                for (let y = 0; y < 100; y++) {
                    const random = randomIntBetween(r1, r2);
                    expect(Number.isInteger(random)).toBe(true);
                    expect(random).toBeGreaterThanOrEqual(r1);
                    expect(random).toBeLessThan(r2);
                }
            } else {
                for (let y = 0; y < 100; y++) {
                    const random = randomIntBetween(r2, r1);
                    expect(Number.isInteger(random)).toBe(true);
                    expect(random).toBeGreaterThanOrEqual(r2);
                    expect(random).toBeLessThan(r1);
                }
            }
        }
    });

    it('should return a unique random integer over subsequent calls', () => {
        const set = new Set();
        for (let i = 0; i < 100; i++) {
            const random = randomIntBetween(0, 10000000000);
            set.add(random);
        }
        expect(set.size).toBe(100);
    });

    it('should throw an error if the min is not numeric', () => {
        for (const el of [
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_STRING,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_ARRAY,
            ...CONSTANTS.IS_OBJECT,
            ...CONSTANTS.IS_FUNCTION,
            new Number(1.12345),
            new Number(Number.EPSILON),
        ]) {
            expect(() => randomIntBetween(
                // @ts-ignore
                el,
                2
            )).toThrow(new TypeError('Min/Max should be numeric'));
        }
    });

    it('should throw an error if the max is not numeric', () => {
        for (const el of [
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_STRING,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_ARRAY,
            ...CONSTANTS.IS_OBJECT,
            ...CONSTANTS.IS_FUNCTION,
            new Number(1.12345),
            new Number(Number.EPSILON),
        ]) {
            expect(() => randomIntBetween(
                2,
                // @ts-ignore
                el
            )).toThrow(new TypeError('Min/Max should be numeric'));
        }
    });

    it('should throw an error if the min and max are not numeric', () => {
        for (const el of [
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_STRING,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_ARRAY,
            ...CONSTANTS.IS_OBJECT,
            ...CONSTANTS.IS_FUNCTION,
            new Number(1.12345),
            new Number(Number.EPSILON),
        ]) {
            expect(() => randomIntBetween(
                // @ts-ignore
                el,
                // @ts-ignore
                el
            )).toThrow(new TypeError('Min/Max should be numeric'));
        }
    });
});
