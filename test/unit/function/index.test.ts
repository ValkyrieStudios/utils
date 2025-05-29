import {describe, it, expect} from 'vitest';
import * as LibFunction from '../../../lib/function';
import debounce from '../../../lib/function/debounce';
import is from '../../../lib/function/is';
import isAsync from '../../../lib/function/isAsync';
import noop from '../../../lib/function/noop';
import noopresolve from '../../../lib/function/noopresolve';
import noopreturn from '../../../lib/function/noopreturn';
import sleep from '../../../lib/function/sleep';

describe('Function - *', () => {
    it('Should be a correct export', () => {
        expect(LibFunction.debounce).toEqual(debounce);
        expect(LibFunction.isFunction).toEqual(is);
        expect(LibFunction.isFn).toEqual(is);
        expect(LibFunction.isAsyncFunction).toEqual(isAsync);
        expect(LibFunction.isAsyncFn).toEqual(isAsync);
        expect(LibFunction.noop).toEqual(noop);
        expect(LibFunction.noopresolve).toEqual(noopresolve);
        expect(LibFunction.noopreturn).toEqual(noopreturn);
        expect(LibFunction.sleep).toEqual(sleep);
    });
});
