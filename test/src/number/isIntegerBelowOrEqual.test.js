'use strict';

/* eslint-disable max-statements */

import {describe, it}           from 'node:test';
import assert                   from 'node:assert/strict';
import CONSTANTS                from '../../constants.js';
import isIntegerBelowOrEqual    from '../../../src/number/isIntegerBelowOrEqual.js';

describe('Number - isIntegerBelowOrEqual', () => {
    it('Returns false when passing nothing', () => {
        assert.equal(isIntegerBelowOrEqual(), false);
    });

    it('Return false if passed a non-integer value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            assert.equal(isIntegerBelowOrEqual(el, 0), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(isIntegerBelowOrEqual(1/0, 0), false);
    });

    it('Return false if passed a non-numeric comparator', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isIntegerBelowOrEqual(0, el), false);
        }
    });

    it('Return false if passed a numerical nan comparator', () => {
        assert.equal(isIntegerBelowOrEqual(0, 1/0), false);
    });

    it('Treat numeric values below max correctly', () => {
        for (const el of [
            [0, 1],
            [-32, -10],
            [3, 9],
            [0, 0.1],
        ]) assert.ok(isIntegerBelowOrEqual(el[0], el[1]));
    });

    it('Treat numeric values above max as false', () => {
        for (const el of [
            [1, 0],
            [-99, -100],
            [9, 8.99999],
        ]) assert.equal(isIntegerBelowOrEqual(el[0], el[1]), false);
    });

    it('Treat numeric values at max as true', () => {
        for (const el of [0, -100, 1]) assert.ok(isIntegerBelowOrEqual(el, el));
    });
});
