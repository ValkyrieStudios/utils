import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isBetween        from '../../../lib/number/isBetween';

describe('Number - isBetween', () => {
    it('Returns false when passing nothing', () => {
        /* @ts-ignore */
        assert.equal(isBetween(), false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isBetween(el, 0, 10), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(isBetween(1/0, 0, 20), false);
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
});
