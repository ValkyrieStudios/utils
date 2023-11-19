'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.js';
import isArray          from '../../../src/array/is.js';

describe('Array - is', () => {
    it('Return false when passing nothing', () => {
        assert.equal(isArray(), false);
    });

    it('Return false when passed a non-array', () => {
        for (const el of CONSTANTS.NOT_ARRAY) assert.equal(isArray(el), false);
    });

    it('Return true when passed an empty array', () => {
        assert.equal(isArray([]), true);
    });

    it('Return true when passed a non-empty array', () => {
        for (const el of CONSTANTS.IS_ARRAY) assert.equal(isArray(el), true);

        assert.equal(isArray([false]), true);
        assert.equal(isArray([null]), true);
        assert.equal(isArray([undefined]), true);
    });
});
