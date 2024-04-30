'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isString         from '../../../lib/string/is';

describe('String - is', () => {
    it('Return false when passing nothing', () => {
        /* @ts-ignore */
        assert.equal(isString(), false);
    });

    it('Return false when passed a non string value', () => {
        for (const el of CONSTANTS.NOT_STRING) assert.equal(isString(el), false);
    });

    it('Return true when passed a string value', () => {
        for (const el of CONSTANTS.IS_STRING) assert.ok(isString(el));
    });
});
