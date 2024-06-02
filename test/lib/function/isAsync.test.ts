import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isAsyncFunction  from '../../../lib/function/isAsync';

describe('Function - isAsync', () => {
    it('Return false when passing nothing', () => {
        /* @ts-ignore */
        assert.equal(isAsyncFunction(), false);
    });

    it('Return false when passed a non function value', () => {
        for (const el of CONSTANTS.NOT_FUNCTION) assert.equal(isAsyncFunction(el), false);
    });

    it('Return false when passed a function value', () => {
        for (const el of CONSTANTS.IS_FUNCTION) assert.equal(isAsyncFunction(el), false);
    });

    it('Return true when passed an async function value', () => {
        for (const el of CONSTANTS.IS_ASYNC_FUNCTION) assert.ok(isAsyncFunction(el));
    });
});
