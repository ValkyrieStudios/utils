import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isNotEmptyString from '../../../lib/string/isNotEmpty';

describe('String - isNotEmpty', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(isNotEmptyString()).toBe(false);
    });

    it('Return false when passed a non string or empty string value', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            expect(isNotEmptyString(el)).toBe(false);
        }
    });

    it('Return true when passed a string value without content or spaces regardless of trimmed mode', () => {
        for (const val of [...CONSTANTS.NOT_BOOLEAN, false, true]) {
            expect(isNotEmptyString('', val)).toBe(false);
        }
    });

    it('Return true when passed a string value with content', () => {
        for (const el of CONSTANTS.IS_STRING) {
            expect(isNotEmptyString(el)).toBe(true);
        }
    });

    it('Return true when passed an empty string with spaces value and setting trimmed to false', () => {
        for (const el of [' ', '    ', '   ']) {
            expect(isNotEmptyString(el, false)).toBe(true);
        }
    });

    it('Return false when passed an empty string value and setting trimmed to true (default)', () => {
        for (const el of [...CONSTANTS.NOT_STRING, '', ' ', '   ']) {
            expect(isNotEmptyString(el, true)).toBe(false);
        }
    });
});
