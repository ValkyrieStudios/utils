import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isAsyncFunction from '../../../lib/function/isAsync';

describe('Function - isAsync', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(isAsyncFunction()).toBe(false);
    });

    it('Return false when passed a non function value', () => {
        for (const el of CONSTANTS.NOT_FUNCTION) {
            expect(isAsyncFunction(el)).toBe(false);
        }
    });

    it('Return false when passed a function value', () => {
        for (const el of CONSTANTS.IS_FUNCTION) {
            expect(isAsyncFunction(el)).toBe(false);
        }
    });

    it('Return true when passed an async function value', () => {
        for (const el of CONSTANTS.IS_ASYNC_FUNCTION) {
            expect(isAsyncFunction(el)).toBe(true);
        }
    });
});
