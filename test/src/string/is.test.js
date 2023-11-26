'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.js';
import isString         from '../../../src/string/is.js';

describe('String - is', () => {
    it('Return false when passing nothing', () => {
        assert.equal(isString(), false);
    });

    it('Return false when passed a non string value', () => {
        for (const el of CONSTANTS.NOT_STRING) assert.equal(isString(el), false);
    });

    it('Return true when passed a string value', () => {
        for (const el of CONSTANTS.IS_STRING) assert.ok(isString(el));
    });
});
