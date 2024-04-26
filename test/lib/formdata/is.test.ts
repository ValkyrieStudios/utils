'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isFormData       from '../../../lib/formdata/is';

describe('FormData - is', () => {
    it('Return false when passing nothing', () => {
        //  @ts-ignore
        assert.equal(isFormData(), false);
    });

    it('Return false when passed a non date value', () => {
        for (const el of CONSTANTS.NOT_FORM_DATA) assert.equal(isFormData(el), false);
    });

    it('Return true when passed a date value', () => {
        for (const el of CONSTANTS.IS_FORM_DATA) assert.ok(isFormData(el));
    });
});
