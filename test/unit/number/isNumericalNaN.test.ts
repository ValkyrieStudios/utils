import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isNumericalNaN from '../../../lib/number/isNumericalNaN';

describe('Number - isNumericalNaN', () => {
    it('Returns false when passing nothing', () => {
        // @ts-ignore
        expect(isNumericalNaN()).toBe(false);
    });

    it('Returns false when passing a non-numerical value that is not a NaN', () => {
        for (const el of [
            ...CONSTANTS.IS_ARRAY,
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_STRING,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_OBJECT,
            ...CONSTANTS.IS_FUNCTION,
            null,
            undefined,
        ]) {
            expect(isNumericalNaN(el)).toBe(false);
        }
    });

    it('Returns false when passing a numerical value that is not a NaN', () => {
        for (const el of [
            ...CONSTANTS.IS_NUMERIC,
            ...CONSTANTS.IS_INTEGER,
        ]) {
            expect(isNumericalNaN(el)).toBe(false);
        }
    });

    it('Returns true when passing something that would evaluate to NaN', () => {
        expect(isNumericalNaN(1 / 0)).toBeTruthy();
    });

    it('Returns true when passing NaN', () => {
        expect(isNumericalNaN(NaN)).toBeTruthy();
    });

    it('Returns true when passing Infinity', () => {
        expect(isNumericalNaN(Infinity)).toBeTruthy();
    });
});
