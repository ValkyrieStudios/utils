'use strict';

/* eslint-disable max-statements */

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isInteger        from '../../../lib/number/isInteger';

describe('Number - isInteger', () => {
    it('Returns false when passing nothing', () => {
        //  @ts-ignore
        assert.equal(isInteger(), false);
    });

    it('Return false if passed a non-integer value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            assert.equal(isInteger(el), false);
        }
    });

    it('Return false if passed a numerical nan value', () => {
        assert.equal(isInteger(1/0), false);
    });

    it('Return true if passed a numeric value', () => {
        for (const el of CONSTANTS.IS_INTEGER) assert.ok(isInteger(el));
    });
});
