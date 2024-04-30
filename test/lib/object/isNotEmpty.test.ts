'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isNotEmptyObject from '../../../lib/object/isNotEmpty';

describe('Object - isNotEmpty', () => {
    it('Return false when passing nothing', () => {
        /* @ts-ignore */
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
