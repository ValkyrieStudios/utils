import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isDate from '../../../lib/date/is';

describe('Date - is', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(isDate()).toBe(false);
    });

    it('Return false when passed a non date value', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            expect(isDate(el)).toBe(false);
        }
    });

    it('Return true when passed a date value', () => {
        for (const el of CONSTANTS.IS_DATE) {
            expect(isDate(el)).toBe(true);
        }
    });
});
