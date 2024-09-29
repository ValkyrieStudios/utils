import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isAboveOrEqual   from '../../../lib/number/isAboveOrEqual';

describe('Number - isAboveOrEqual', () => {
    it('Returns false when passing nothing', () => {
        /* @ts-ignore */
        assert.equal(isAboveOrEqual(), false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isAboveOrEqual(el, 0), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(isAboveOrEqual(1/0, 0), false);
    });

    it('Return false if passed a non-numeric comparator', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isAboveOrEqual(0, el), false);
        }
    });

    it('Return false if passed a numerical nan comparator', () => {
        assert.equal(isAboveOrEqual(0, 1/0), false);
    });

    it('Treat numeric values above min correctly', () => {
        for (const el of [
            [1, 0],
            [-10, -32],
            [9, 3],
            [0.2, 0.1],
        ]) assert.ok(isAboveOrEqual(el[0], el[1]));
    });

    it('Treat numeric values below min as false', () => {
        for (const el of [
            [0, 1],
            [-100, -99],
            [1, 9],
            [-0.1, -0.05],
        ]) assert.equal(isAboveOrEqual(el[0], el[1]), false);
    });

    it('Treat numeric values at min as true', () => {
        for (const el of [0, -100, 1, 0, 0.56, 0.89]) assert.ok(isAboveOrEqual(el, el));
    });
});
