'use strict';

/* eslint-disable max-statements */

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import is               from '../../../lib/number/is';

describe('Number - is', () => {
    it('Returns false when passing nothing', () => {
        //  @ts-ignore
        assert.equal(is(), false);
    });

    it('Return false if passed a non-numeric value', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(is(el), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(is(1/0), false);
    });

    it('Return true if passed a numeric value', () => {
        for (const el of CONSTANTS.IS_NUMERIC) assert.ok(is(el));
    });
});
