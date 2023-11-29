'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import isObject         from '../../../src/object/is.mjs';

describe('Object - is', () => {
    it('Return false when passing nothing', () => {
        assert.equal(isObject(), false);
    });

    it('Return false when passed a non object value', () => {
        for (const el of CONSTANTS.NOT_OBJECT) assert.equal(isObject(el), false);
    });

    it('Return true when passed an empty object value', () => {
        assert.ok(isObject({}));
    });

    it('Return true when passed an object value', () => {
        for (const el of CONSTANTS.IS_OBJECT) assert.ok(isObject(el));
    });
});
