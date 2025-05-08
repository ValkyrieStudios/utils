import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibFunction from '../../../lib/function';
import debounce         from '../../../lib/function/debounce';
import is               from '../../../lib/function/is';
import isAsync          from '../../../lib/function/isAsync';
import noop             from '../../../lib/function/noop';
import noopresolve      from '../../../lib/function/noopresolve';
import noopreturn       from '../../../lib/function/noopreturn';
import sleep            from '../../../lib/function/sleep';

describe('Function - *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibFunction, {
            debounce,
            isFunction: is,
            isFn: is,
            isAsyncFunction: isAsync,
            isAsyncFn: isAsync,
            noop,
            noopresolve,
            noopreturn,
            sleep,
        });
    });
});
