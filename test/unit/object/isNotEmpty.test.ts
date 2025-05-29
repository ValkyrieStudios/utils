import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import isNotEmptyObject from '../../../lib/object/isNotEmpty';

describe('Object - isNotEmpty', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(isNotEmptyObject()).toBe(false);
    });

    it('Return false when passed a non object value', () => {
        for (const el of CONSTANTS.NOT_OBJECT_WITH_EMPTY) {
            expect(isNotEmptyObject(el)).toBe(false);
        }
    });

    it('Return false when passed an empty object value', () => {
        // eslint-disable-next-line no-new-object
        for (const el of [{}, new Object(), Object.create(null), Object.create([])]) {
            expect(isNotEmptyObject(el)).toBe(false);
        }
    });

    it('Return true when passed a non-empty object value', () => {
        for (const el of [
            {bar: 'foo'},
            {a: null},
        ]) {
            expect(isNotEmptyObject(el)).toBeTruthy();
        }
    });
});
