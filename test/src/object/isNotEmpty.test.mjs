'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import isNotEmptyObject from '../../../src/object/isNotEmpty.mjs';

describe('Object - isNotEmpty', () => {
    it('Return false when passing nothing', () => {
        assert.equal(isNotEmptyObject(), false);
    });

    it('Return false when passed a non object value', () => {
        for (const el of CONSTANTS.NOT_OBJECT_WITH_EMPTY) assert.equal(isNotEmptyObject(el), false);
    });

    it('Return false when passed an empty object value', () => {
        for (const el of [{}, new Object(), Object.create(null), Object.create([])]) { // eslint-disable-line no-new-object
            assert.equal(isNotEmptyObject(el), false);
        }
    });

    it('Return true when passed a non-empty object value', () => {
        for (const el of [
            {bar: 'foo'},
            {a: null},
        ]) assert.ok(isNotEmptyObject(el));
    });
});
