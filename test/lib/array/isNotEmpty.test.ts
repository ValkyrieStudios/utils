import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isNotEmptyArray  from '../../../lib/array/isNotEmpty';

describe('Array - isNotEmptyArray', () => {
    it('Returns false when passing nothing', () => {
        /* @ts-ignore */
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
