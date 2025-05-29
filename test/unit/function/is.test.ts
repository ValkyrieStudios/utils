import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isFunction from '../../../lib/function/is';

describe('Function - is', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(isFunction()).toBe(false);
    });

    it('Return false when passed a non function value', () => {
        for (const el of CONSTANTS.NOT_FUNCTION) {
            expect(isFunction(el)).toBe(false);
        }
    });

    it('Return true when passed a function value', () => {
        for (const el of CONSTANTS.IS_FUNCTION) {
            expect(isFunction(el)).toBe(true);
        }
    });

    it('Return true when passed an async function value', () => {
        for (const el of CONSTANTS.IS_ASYNC_FUNCTION) {
            expect(isFunction(el)).toBe(true);
        }
    });
});
