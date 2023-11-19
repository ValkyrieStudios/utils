'use strict';

/* eslint-disable max-statements */

import {describe, it}       from 'node:test';
import assert               from 'node:assert/strict';
import CONSTANTS, {getTime} from '../../constants.js';
import isBetween            from '../../../src/number/isBetween.js';

describe('Number - isBetween', () => {
    it('Returns false when passing nothing', () => {
        assert.equal(isBetween(), false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isBetween(el, 0), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(isBetween(1/0, 0), false);
    });

    it('Return false if passed a non-numeric min', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isBetween(0, el, 0), false);
        }
    });

    it('Return false if passed a numerical nan min', () => {
        assert.equal(isBetween(0, 1/0, 0), false);
    });

    it('Return false if passed a non-numeric max', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isBetween(0, 0, el), false);
        }
    });

    it('Return false if passed a numerical nan max', () => {
        assert.equal(isBetween(0, 0, 1/0), false);
    });

    it('Treat numeric values between ranges correctly', () => {
        for (const el of [
            [0, -1, 1],
            [-32, -100, -10],
            [3, 1, 9],
            [0.1, 0, 0.2],
        ]) assert.ok(isBetween(el[0], el[1], el[2]));
    });

    it('Treat numeric values below lower bound as false', () => {
        for (const el of [
            [-1, 0, 1],
            [-101, -100, -10],
            [0, 1, 9],
            [-0.1, 0, 0.2],
        ]) assert.equal(isBetween(el[0], el[1], el[2]), false);
    });

    it('Treat numeric values at lower bound as true', () => {
        for (const el of [
            [0, 0, 1],
            [-100, -100, -10],
            [1, 1, 9],
            [0, 0, 0.2],
        ]) assert.ok(isBetween(el[0], el[1], el[2]));
    });

    it('Treat numeric values above upper bound as false', () => {
        for (const el of [
            [2, 0, 1],
            [-9, -100, -10],
            [10, 1, 9],
            [0.3, 0, 0.2],
        ]) assert.equal(isBetween(el[0], el[1], el[2]), false);
    });

    it('Treat numeric values at upper bound as true', () => {
        for (const el of [
            [1, 0, 1],
            [-10, -100, -10],
            [9, 1, 9],
            [0.2, 0, 0.2],
        ]) assert.ok(isBetween(el[0], el[1], el[2]));
    });

    it('Should be blazing fast (benchmark 1000000 ops in < 20ms)', () => {
        const start_time = getTime();
        for (let x = 0; x < 1000000; x++) isBetween(20, 5, 25);
        assert.ok((getTime() - start_time) < 20);
    });
});
