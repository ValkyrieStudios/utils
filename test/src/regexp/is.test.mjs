'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import isRegExp         from '../../../src/regexp/is.mjs';

describe('RegExp - is', () => {
    it('Return false when passing nothing', () => {
        assert.equal(isRegExp(), false);
    });

    it('Return false when passed a non regexp value', () => {
        for (const el of CONSTANTS.NOT_REGEXP) assert.equal(isRegExp(el), false);
    });

    it('Return true when passed a regexp value', () => {
        for (const el of CONSTANTS.IS_REGEXP) assert.ok(isRegExp(el));
    });
});
