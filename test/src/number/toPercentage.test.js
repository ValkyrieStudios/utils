'use strict';

/* eslint-disable max-statements,no-new-wrappers */

import {describe, it}       from 'node:test';
import assert               from 'node:assert/strict';
import CONSTANTS, {getTime} from '../../constants.js';
import toPercentage         from '../../../src/number/toPercentage.js';

describe('Number - toPercentage', () => {
    it('Should throw if not passed anything', () => {
        assert.throws(
            () => toPercentage(),
            new TypeError('value/min/max should be numeric')
        );
    });

    it('Should throw if not passed a numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.throws(
                () => toPercentage(el),
                new TypeError('value/min/max should be numeric')
            );
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
            assert.throws(
                () => toPercentage(20, 0, el, 100),
                new TypeError('value/min/max should be numeric')
            );
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
            assert.throws(
                () => toPercentage(20, 0, 0, el),
                new TypeError('value/min/max should be numeric')
            );
        }
    });

    it('should correctly calculate the percentage', () => {
        assert.equal(toPercentage(0.5), 50);
    });

    it('should correctly calculate the percentage with precision', () => {
        assert.equal(toPercentage(0.50106579, 0), 50);
        assert.equal(toPercentage(0.50106579, 1), 50.1);
        assert.equal(toPercentage(0.50116579, 2), 50.12);
        assert.equal(toPercentage(0.50116579, 3), 50.117);
        assert.equal(toPercentage(0.50116579, 4), 50.1166);
        assert.equal(toPercentage(0.50116579, 5), 50.11658);
    });

    it('should correctly apply range logic when provided', () => {
        assert.equal(toPercentage(5, 0, -10, 10), 75);
        assert.equal(toPercentage(-356, 0, -1000, 1000), 32);
        assert.equal(toPercentage(-356.52, 3, -1000, 1000), 32.174);
        assert.equal(toPercentage(0.005, 0, 0, 0.1), 5);
    });

    it('Should be blazing fast (benchmark 1000000 ops in < 50ms)', () => {
        const start_time = getTime();
        for (let x = 0; x < 1000000; x++) toPercentage(0.42134691918126184, 3, -1, 1);
        assert.ok((getTime() - start_time) < 50);
    });
});
