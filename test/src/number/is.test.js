'use strict';

/* eslint-disable max-statements */

import {describe, it}       from 'node:test';
import assert               from 'node:assert/strict';
import CONSTANTS, {getTime} from '../../constants.js';
import is                   from '../../../src/number/is.js';

describe('Number - is', () => {
    it('Returns false when passing nothing', () => {
        assert.equal(is(), false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(is(el), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(is(1/0), false);
    });

    it('Return true if passed a numeric value', () => {
        for (const el of CONSTANTS.IS_NUMERIC) assert.ok(is(el));
    });

    it('Should be blazing fast (benchmark 1000000 ops in < 5ms)', () => {
        const start_time = getTime();
        for (let x = 0; x < 1000000; x++) is(20);
        assert.ok((getTime() - start_time) < 5);
    });
});