'use strict';

/* eslint-disable max-statements,no-new-wrappers,no-loss-of-precision */

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import round            from '../../../src/number/round.mjs';

describe('Number - round', () => {
    it('Should throw if not passed anything', () => {
        assert.throws(
            () => round(),
            new TypeError('Value should be numeric')
        );
    });

    it('Should throw if not passed a numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.throws(
                () => round(el),
                new TypeError('Value should be numeric')
            );
        }
    });

    it('Should correctly round a value', () => {
        assert.equal(round(5.123456789), 5);
    });

    it('Should correctly round a value and default to 0 precision if not passed an integer for precision', () => {
        for (const el of CONSTANTS.NOT_INTEGER) assert.equal(round(5.123456789, el), 5);
    });

    it('Should correctly round a value and default to 0 precision if passed an integer below 0 for precision', () => {
        for (const el of [-1, -10, -999]) assert.equal(round(5.123456789, el), 5);
    });

    it('Should correctly round a value with precision', () => {
        assert.equal(round(5.123456789, 0), 5);
        assert.equal(round(5.123456789, 1), 5.1);
        assert.equal(round(5.123456789, 2), 5.12);
        assert.equal(round(5.123456789, 3), 5.123);
        assert.equal(round(5.123456789, 4), 5.1235);
        assert.equal(round(5.123456789, 5), 5.12346);
        assert.equal(round(42.139691918126184, 3), 42.14);
        assert.equal(round(42.134691918126184, 3), 42.135);
        assert.equal(round(0.5), 1);
        assert.equal(round(-0.5), -1);
        assert.equal(round(5.12, 1), 5.1);
        assert.equal(round(-5.12, 1), -5.1);
        assert.equal(round(1.005, 2), 1.01);
        assert.equal(round(39.425, 2), 39.43);
        assert.equal(round(-1.005, 2), -1.01);
        assert.equal(round(-39.425, 2), -39.43);
    });
});
