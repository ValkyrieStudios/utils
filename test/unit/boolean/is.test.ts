import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isBoolean from '../../../lib/boolean/is';

describe('Boolean - is', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(isBoolean()).toBe(false);
    });

    it('Return false when passed a non boolean value', () => {
        for (const el of CONSTANTS.NOT_BOOLEAN) {
            expect(isBoolean(el)).toBe(false);
        }
    });

    it('Return true when passed a boolean value', () => {
        for (const el of CONSTANTS.IS_BOOLEAN) {
            expect(isBoolean(el)).toBe(true);
        }
    });
});
