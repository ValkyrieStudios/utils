'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isBoolean        from '../../../lib/boolean/is';

describe('Boolean - is', () => {
    it('Return false when passing nothing', () => {
        //  @ts-ignore
        assert.equal(isBoolean(), false);
    });

    it('Return false when passed a non boolean value', () => {
        for (const el of CONSTANTS.NOT_BOOLEAN) assert.equal(isBoolean(el), false);
    });

    it('Return true when passed a boolean value', () => {
        for (const el of CONSTANTS.IS_BOOLEAN) assert.ok(isBoolean(el));
    });
});
