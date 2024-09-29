import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isIntegerAbove   from '../../../lib/number/isIntegerAbove';

describe('Number - isIntegerAbove', () => {
    it('Returns false when passing nothing', () => {
        /* @ts-ignore */
        assert.equal(isIntegerAbove(), false);
    });

    it('Return false if passed a non-integer value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            assert.equal(isIntegerAbove(el, 0), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(isIntegerAbove(1/0, 0), false);
    });

    it('Return false if passed a non-numeric comparator', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isIntegerAbove(0, el), false);
        }
    });

    it('Return false if passed a numerical nan comparator', () => {
        assert.equal(isIntegerAbove(0, 1/0), false);
    });

    it('Treat numeric values above min correctly', () => {
        for (const el of [
            [1, 0],
            [-99, -100],
            [9, 8.99999],
        ]) assert.ok(isIntegerAbove(el[0], el[1]));
    });

    it('Treat numeric values below min as false', () => {
        for (const el of [
            [0, 1],
            [-32, -10],
            [3, 9],
            [0, 0.1],
        ]) assert.equal(isIntegerAbove(el[0], el[1]), false);
    });

    it('Treat numeric values at min as false', () => {
        for (const el of [0, -100, 1]) assert.equal(isIntegerAbove(el, el), false);
    });
});
