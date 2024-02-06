'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import isArray          from '../../../lib/array/is.mjs';

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
