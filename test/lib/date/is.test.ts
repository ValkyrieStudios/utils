import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isDate           from '../../../lib/date/is';

describe('Date - is', () => {
    it('Return false when passing nothing', () => {
        /* @ts-ignore */
        assert.equal(isDate(), false);
    });

    it('Return false when passed a non date value', () => {
        for (const el of CONSTANTS.NOT_DATE) assert.equal(isDate(el), false);
    });

    it('Return true when passed a date value', () => {
        for (const el of CONSTANTS.IS_DATE) assert.ok(isDate(el));
    });
});
