import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isObject from '../../../lib/object/is';

describe('Object - is', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(isObject()).toBe(false);
    });

    it('Return false when passed a non object value', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            expect(isObject(el)).toBe(false);
        }
    });

    it('Return true when passed an empty object value', () => {
        expect(isObject({})).toBeTruthy();
    });

    it('Return true when passed an object value', () => {
        for (const el of CONSTANTS.IS_OBJECT) {
            expect(isObject(el)).toBeTruthy();
        }
    });
});
