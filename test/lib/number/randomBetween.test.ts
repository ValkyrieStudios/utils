/* eslint-disable max-statements,no-new-wrappers */

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import randomBetween    from '../../../lib/number/randomBetween';

describe('Number - randomBetween', () => {
    it('Returns a number when passing nothing', () => {
        assert.equal(typeof randomBetween(), 'number');
    });

    it('Should default to a random number between 0 and 10', () => {
        for (let i = 0; i < 10000; i++) {
            const random = randomBetween();
            assert.ok(random > 0 && random < 10);
        }
    });

    it('Should return a random number between min and max 0 - 100', () => {
        for (let i = 0; i < 10000; i++) {
            const random = randomBetween(0, 100);
            assert.ok(random > 0 && random < 100);
        }
    });

    it('Should return a random number between min and max 1000 - 100000', () => {
        for (let i = 0; i < 10000; i++) {
            const random = randomBetween(0, 100000);
            assert.ok(random > 0 && random < 100000);
        }
    });

    it('Should return a random number between min and max (random min) - (random max)', () => {
        for (let i = 0; i < 50; i++) {
            const r1 = Math.round(Math.random() * 1000000);
            const r2 = Math.round(Math.random() * 10000000);

            if (r1 < r2) {
                for (let y = 0; y < 10000; y++) {
                    const random = randomBetween(r1, r2);
                    assert.ok(random > r1 && random < r2);
                }
            } else {
                for (let y = 0; y < 10000; y++) {
                    const random = randomBetween(r2, r1);
                    assert.ok(random > r2 && random < r1);
                }
            }
        }
    });

    it('should return a unique random number over subsequent calls', () => {
        const set = new Set();
        for (let i = 0; i < 10000; i++) {
            const random = randomBetween(0, 100);
            set.add(random);
        }
        assert.ok(set.size === 10000);
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
            assert.throws(
                /* @ts-ignore */
                () => randomBetween(el, 2),
                new TypeError('Min/Max should be numeric')
            );
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
            assert.throws(
                /* @ts-ignore */
                () => randomBetween(2, el),
                new TypeError('Min/Max should be numeric')
            );
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
            assert.throws(
                /* @ts-ignore */
                () => randomBetween(el, el),
                new TypeError('Min/Max should be numeric')
            );
        }
    });
});
