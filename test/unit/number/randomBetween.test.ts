/* eslint-disable no-new-wrappers */

import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import randomBetween from '../../../lib/number/randomBetween';

describe('Number - randomBetween', () => {
    it('Returns a number when passing nothing', () => {
        expect(typeof randomBetween()).toBe('number');
    });

    it('Should default to a random number between 0 and 10', () => {
        for (let i = 0; i < 100; i++) {
            const random = randomBetween();
            expect(random).toBeGreaterThan(0);
            expect(random).toBeLessThan(10);
        }
    });

    it('Should return a random number between min and max 0 - 100', () => {
        for (let i = 0; i < 100; i++) {
            const random = randomBetween(0, 100);
            expect(random).toBeGreaterThan(0);
            expect(random).toBeLessThan(100);
        }
    });

    it('Should return a random number between min and max 1000 - 100000', () => {
        for (let i = 0; i < 100; i++) {
            const random = randomBetween(0, 100000);
            expect(random).toBeGreaterThan(0);
            expect(random).toBeLessThan(100000);
        }
    });

    it('Should return a random number between min and max (random min) - (random max)', () => {
        for (let i = 0; i < 50; i++) {
            const r1 = Math.round(Math.random() * 1000000);
            const r2 = Math.round(Math.random() * 10000000);

            if (r1 < r2) {
                for (let y = 0; y < 100; y++) {
                    const random = randomBetween(r1, r2);
                    expect(random).toBeGreaterThan(r1);
                    expect(random).toBeLessThan(r2);
                }
            } else {
                for (let y = 0; y < 100; y++) {
                    const random = randomBetween(r2, r1);
                    expect(random).toBeGreaterThan(r2);
                    expect(random).toBeLessThan(r1);
                }
            }
        }
    });

    it('should return a unique random number over subsequent calls', () => {
        const set = new Set();
        for (let i = 0; i < 100; i++) {
            const random = randomBetween(0, 100);
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
            expect(() => randomBetween(
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
            expect(() => randomBetween(
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
            expect(() => randomBetween(
                // @ts-ignore
                el,
                // @ts-ignore
                el
            )).toThrow(new TypeError('Min/Max should be numeric'));
        }
    });
});
