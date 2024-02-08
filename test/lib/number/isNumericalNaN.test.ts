'use strict';

/* eslint-disable max-statements,no-new-wrappers */

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isNumericalNaN   from '../../../lib/number/isNumericalNaN';

describe('Number - isNumericalNaN', () => {
    it('Returns false when passing nothing', () => {
        //  @ts-ignore
        assert.equal(isNumericalNaN(), false);
    });

    it('Returns false when passing a non-numerical value that is not a NaN', () => {
        for (const el of [
            ...CONSTANTS.IS_ARRAY,
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_STRING,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_OBJECT,
            ...CONSTANTS.IS_FUNCTION,
            null,
            undefined,
        ]) assert.equal(isNumericalNaN(el), false);
    });

    it('Returns false when passing a numerical value that is not a NaN', () => {
        for (const el of [
            ...CONSTANTS.IS_NUMERIC,
            ...CONSTANTS.IS_INTEGER,
        ]) assert.equal(isNumericalNaN(el), false);
    });

    it('Returns true when passing something that would evaluate to NaN', () => {
        assert.ok(isNumericalNaN(1/0));
    });

    it('Returns true when passing NaN', () => {
        assert.ok(isNumericalNaN(NaN));
    });

    it('Returns true when passing Infinity', () => {
        assert.ok(isNumericalNaN(Infinity));
    });
});
