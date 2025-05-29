/* eslint-disable id-denylist */

import {describe, it, beforeEach, expect} from 'vitest';
import CONSTANTS from '../../constants';
import deepFreeze from '../../../lib/deep/freeze';

describe('Deep - Freeze', () => {
    let subject: any;

    beforeEach(() => {
        subject = deepFreeze({
            a: 1,
            test: [1, 2, 3],
            c: {
                d: 'foo',
                e: {
                    f: 'bar',
                },
            },
            bla: [
                {
                    a: 1,
                },
            ],
        });
    });

    it('isSealed flag on every nested object', () => {
        expect(Object.isSealed(subject)).toBe(true);
        expect(Object.isSealed(subject.test)).toBe(true);
        expect(Object.isSealed(subject.c)).toBe(true);
        expect(Object.isSealed(subject.c.e)).toBe(true);
    });

    it('Should throw when not passed an object or array', () => {
        for (const el of [
            ...CONSTANTS.IS_NUMERIC,
            ...CONSTANTS.IS_INTEGER,
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_STRING,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_FUNCTION,
            ...CONSTANTS.IS_NULLABLE,
        ]) {
            expect(() => deepFreeze(el)).toThrow(new TypeError('Only objects/arrays can be frozen'));
        }
    });
});
