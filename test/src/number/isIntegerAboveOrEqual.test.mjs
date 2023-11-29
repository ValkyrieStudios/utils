'use strict';

/* eslint-disable max-statements */

import {describe, it}           from 'node:test';
import assert                   from 'node:assert/strict';
import CONSTANTS                from '../../constants.mjs';
import isIntegerAboveOrEqual    from '../../../src/number/isIntegerAboveOrEqual.mjs';

describe('Number - isIntegerAboveOrEqual', () => {
    it('Returns false when passing nothing', () => {
        assert.equal(isIntegerAboveOrEqual(), false);
    });

    it('Return false if passed a non-integer value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            assert.equal(isIntegerAboveOrEqual(el, 0), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(isIntegerAboveOrEqual(1/0, 0), false);
    });

    it('Return false if passed a non-numeric comparator', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isIntegerAboveOrEqual(0, el), false);
        }
    });

    it('Return false if passed a numerical nan comparator', () => {
        assert.equal(isIntegerAboveOrEqual(0, 1/0), false);
    });

    it('Treat numeric values above min correctly', () => {
        for (const el of [
            [1, 0],
            [-99, -100],
            [9, 8.99999],
        ]) assert.ok(isIntegerAboveOrEqual(el[0], el[1]));
    });

    it('Treat numeric values below min as false', () => {
        for (const el of [
            [0, 1],
            [-32, -10],
            [3, 9],
            [0, 0.1],
        ]) assert.equal(isIntegerAboveOrEqual(el[0], el[1]), false);
    });

    it('Treat numeric values at min as true', () => {
        for (const el of [0, -100, 1]) assert.ok(isIntegerAboveOrEqual(el, el));
    });
});
