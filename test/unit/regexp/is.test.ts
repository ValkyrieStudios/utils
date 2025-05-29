import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isRegExp from '../../../lib/regexp/is';

describe('RegExp - is', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(isRegExp()).toBe(false);
    });

    it('Return false when passed a non-regexp value', () => {
        for (const el of CONSTANTS.NOT_REGEXP) {
            expect(isRegExp(el)).toBe(false);
        }
    });

    it('Return true when passed a regexp value', () => {
        for (const el of CONSTANTS.IS_REGEXP) {
            expect(isRegExp(el)).toBe(true);
        }
    });
});
