'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.js';
import isDate           from '../../../src/date/is.js';

describe('Date - is', () => {
    it('Return false when passing nothing', () => {
        assert.equal(isDate(), false);
    });

    it('Return false when passed a non date value', () => {
        for (const el of CONSTANTS.NOT_DATE) assert.equal(isDate(el), false);
    });

    it('Return true when passed a date value', () => {
        for (const el of CONSTANTS.IS_DATE) assert.ok(isDate(el));
    });
});
