import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isString from '../../../lib/string/is';

describe('String - is', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(isString()).toBe(false);
    });

    it('Return false when passed a non string value', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            expect(isString(el)).toBe(false);
        }
    });

    it('Return true when passed a string value', () => {
        for (const el of CONSTANTS.IS_STRING) {
            expect(isString(el)).toBe(true);
        }
    });
});
