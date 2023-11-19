'use strict';

/* eslint-disable max-statements */

import {describe, it}       from 'node:test';
import assert               from 'node:assert/strict';
import CONSTANTS, {getTime} from '../../constants.js';
import isIntegerBelow       from '../../../src/number/isIntegerBelow.js';

describe('Number - isIntegerBelow', () => {
    it('Returns false when passing nothing', () => {
        assert.equal(isIntegerBelow(), false);
    });

    it('Return false if passed a non-integer value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            assert.equal(isIntegerBelow(el, 0), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(isIntegerBelow(1/0, 0), false);
    });

    it('Return false if passed a non-numeric comparator', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(isIntegerBelow(0, el), false);
        }
    });

    it('Return false if passed a numerical nan comparator', () => {
        assert.equal(isIntegerBelow(0, 1/0), false);
    });

    it('Treat numeric values below max correctly', () => {
        for (const el of [
            [0, 1],
            [-32, -10],
            [3, 9],
            [0, 0.1],
        ]) assert.ok(isIntegerBelow(el[0], el[1]));
    });

    it('Treat numeric values above max as false', () => {
        for (const el of [
            [1, 0],
            [-99, -100],
            [9, 8.99999],
        ]) assert.equal(isIntegerBelow(el[0], el[1]), false);
    });

    it('Treat numeric values at max as false', () => {
        for (const el of [0, -100, 1]) assert.equal(isIntegerBelow(el, el), false);
    });

    it('Should be blazing fast (benchmark 1000000 ops in < 20ms)', () => {
        const start_time = getTime();
        for (let x = 0; x < 1000000; x++) isIntegerBelow(20, 5);
        assert.ok((getTime() - start_time) < 20);
    });
});