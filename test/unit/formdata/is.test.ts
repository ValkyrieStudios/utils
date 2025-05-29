import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isFormData from '../../../lib/formdata/is';

describe('FormData - is', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(isFormData()).toBe(false);
    });

    it('Return false when passed a non FormData value', () => {
        for (const el of CONSTANTS.NOT_FORM_DATA) {
            expect(isFormData(el)).toBe(false);
        }
    });

    it('Return true when passed a FormData value', () => {
        for (const el of CONSTANTS.IS_FORM_DATA) {
            expect(isFormData(el)).toBe(true);
        }
    });
});
