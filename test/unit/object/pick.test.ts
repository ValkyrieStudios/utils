import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import pick from '../../../lib/object/pick';

describe('Object - pick', () => {
    it('Correctly retrieve the selected keys', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                d: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        expect(pick(subject, ['a'])).toEqual({a: 100});
        expect(pick(subject, ['a', 'b'])).toEqual({a: 100, b: 200});
        expect(pick(subject, ['a', 'c.bar'])).toEqual({a: 100, c: {bar: true}});
        expect(pick(subject, ['a', 'c.d', 'c.f'])).toEqual({a: 100, c: {d: 5, f: [0, 1, 2]}});
        // @ts-ignore
        expect(pick(subject, ['a', 'b', 'd'])).toEqual({a: 100, b: 200});
    });

    it('Correctly filter out non-string keys', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                d: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        expect(pick(subject, ['a', ...CONSTANTS.NOT_STRING, 'd'])).toEqual({a: 100});
    });

    it('Correctly filters out keys for which deep retrieval cant find them', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                j: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        expect(pick(subject, [
            'a',
            // @ts-ignore
            '  ',
            // @ts-ignore
            'c.d',
            'b',
        ])).toEqual({a: 100, b: 200});
    });

    it('Throws a type error when passed something else than an object to pick from', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            expect(() => pick(el, ['a', 'b'])).toThrowError(/Please pass an object to pick from and a keys array/);
        }
    });

    it('Throws a type error when passed something else than an array as keys', () => {
        for (const el of CONSTANTS.NOT_ARRAY) {
            expect(() => pick({a: 'hello'}, el)).toThrowError(/Please pass an object to pick from and a keys array/);
        }
    });
});
