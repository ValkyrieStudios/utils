'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import isNotEmptyArray  from '../../../lib/array/isNotEmpty.mjs';

describe('Array - isNotEmptyArray', () => {
    it('Returns false when passing nothing', () => {
        assert.equal(isNotEmptyArray(), false);
    });

    it('Return false when passed a non-array or empty array', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            assert.equal(isNotEmptyArray(el), false);
        }
    });

    it('Return true when passed a non-empty array', () => {
        assert.equal(isNotEmptyArray(['hi there']), true);
        assert.equal(isNotEmptyArray([false]), true);
        assert.equal(isNotEmptyArray([null]), true);
        assert.equal(isNotEmptyArray([undefined]), true);
    });
});
