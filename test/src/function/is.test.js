'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.js';
import isFunction       from '../../../src/function/is.js';

describe('Function - is', () => {
    it('Return false when passing nothing', () => {
        assert.equal(isFunction(), false);
    });

    it('Return false when passed a non function value', () => {
        for (const el of CONSTANTS.NOT_FUNCTION) assert.equal(isFunction(el), false);
    });

    it('Return true when passed a function value', () => {
        for (const el of CONSTANTS.IS_FUNCTION) assert.ok(isFunction(el));
    });
});
