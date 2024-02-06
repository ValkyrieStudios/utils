'use strict';

/* eslint-disable max-statements */

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import isBelowOrEqual   from '../../../lib/number/isBelowOrEqual.mjs';

describe('Number - isBelowOrEqual', () => {
    it('Returns false when passing nothing', () => {
        assert.equal(isBelowOrEqual(), false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isBelowOrEqual(el, 0), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(isBelowOrEqual(1/0, 0), false);
    });

    it('Return false if passed a non-numeric comparator', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isBelowOrEqual(0, el), false);
        }
    });

    it('Return false if passed a numerical nan comparator', () => {
        assert.equal(isBelowOrEqual(0, 1/0), false);
    });

    it('Treat numeric values below max correctly', () => {
        for (const el of [
            [0, 1],
            [-32, -10],
            [3, 9],
            [0.1, 0.2],
        ]) assert.ok(isBelowOrEqual(el[0], el[1]));
    });

    it('Treat numeric values above max as false', () => {
        for (const el of [
            [1, 0],
            [-99, -100],
            [9, 1],
            [-0.05, -0.1],
        ]) assert.equal(isBelowOrEqual(el[0], el[1]), false);
    });

    it('Treat numeric values at max as true', () => {
        for (const el of [0, -100, 1, 0, 0.56, 0.89]) assert.ok(isBelowOrEqual(el, el));
    });
});
