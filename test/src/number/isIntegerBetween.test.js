'use strict';

/* eslint-disable max-statements */

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.js';
import isIntegerBetween from '../../../src/number/isIntegerBetween.js';

describe('Number - isIntegerBetween', () => {
    it('Returns false when passing nothing', () => {
        assert.equal(isIntegerBetween(), false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            assert.equal(isIntegerBetween(el, 0), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(isIntegerBetween(1/0, 0), false);
    });

    it('Return false if passed a non-numeric min', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isIntegerBetween(0, el, 0), false);
        }
    });

    it('Return false if passed a numerical nan min', () => {
        assert.equal(isIntegerBetween(0, 1/0, 0), false);
    });

    it('Return false if passed a non-numeric max', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isIntegerBetween(0, 0, el), false);
        }
    });

    it('Return false if passed a numerical nan max', () => {
        assert.equal(isIntegerBetween(0, 0, 1/0), false);
    });

    it('Treat numeric values between ranges correctly', () => {
        for (const el of [
            [0, -1, 1],
            [-32, -100, -10],
            [3, 1, 9],
            [1, 0, 2],
        ]) assert.ok(isIntegerBetween(el[0], el[1], el[2]));
    });

    it('Treat numeric values below lower bound as false', () => {
        for (const el of [
            [-1, 0, 1],
            [-101, -100, -10],
            [0, 1, 9],
            [-1, -0.5, 1],
        ]) assert.equal(isIntegerBetween(el[0], el[1], el[2]), false);
    });

    it('Treat numeric values at lower bound as true', () => {
        for (const el of [
            [0, 0, 1],
            [-100, -100, -10],
            [1, 1, 9],
            [0, 0, 0.2],
        ]) assert.ok(isIntegerBetween(el[0], el[1], el[2]));
    });

    it('Treat numeric values above upper bound as false', () => {
        for (const el of [
            [2, 0, 1],
            [-9, -100, -10],
            [10, 1, 9],
            [1, 0, 0.5],
        ]) assert.equal(isIntegerBetween(el[0], el[1], el[2]), false);
    });

    it('Treat numeric values at upper bound as true', () => {
        for (const el of [
            [1, 0, 1],
            [-10, -100, -10],
            [9, 1, 9],
        ]) assert.ok(isIntegerBetween(el[0], el[1], el[2]));
    });
});
