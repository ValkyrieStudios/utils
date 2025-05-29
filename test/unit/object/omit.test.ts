import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import omit from '../../../lib/object/omit';

describe('Object - omit', () => {
    it('Correctly omits the specified keys', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                d: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        expect(omit(subject, ['a'])).toEqual({b: 200, c: {d: 5, bar: true, f: [0, 1, 2]}});
        expect(omit(subject, ['a', 'b'])).toEqual({c: {d: 5, bar: true, f: [0, 1, 2]}});
        expect(omit(subject, ['a', 'c.bar'])).toEqual({b: 200, c: {d: 5, f: [0, 1, 2]}});
        expect(omit(subject, ['a', 'c.d', 'c.f'])).toEqual({b: 200, c: {bar: true}});
        // @ts-ignore
        expect(omit(subject, ['a', 'b', 'd'])).toEqual({c: {d: 5, bar: true, f: [0, 1, 2]}});
    });

    it('Correctly ignores non-string keys', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                d: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        expect(omit(subject, ['a', ...CONSTANTS.NOT_STRING, 'd'])).toEqual({b: 200, c: {d: 5, bar: true, f: [0, 1, 2]}});
    });

    it('Correctly filters out keys for which deep retrieval can’t find them', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                j: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        expect(omit(subject, [
            'a',
            // @ts-ignore
            '  ',
            // @ts-ignore
            'c.d',
            'b',
        ])).toEqual({c: {j: 5, bar: true, f: [0, 1, 2]}});
    });

    it('Correctly filters out keys for which the root object doesnt exist', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                j: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        expect(omit(subject, [
            'a',
            // @ts-ignore
            '  ',
            // @ts-ignore
            'c.d',
            // @ts-ignore
            'd.f',
            'b',
        ])).toEqual({c: {j: 5, bar: true, f: [0, 1, 2]}});
    });

    it('Correctly filters out deeply nested keys', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                j: 5,
                bar: true,
                f: {
                    age: 42,
                    world: 'hello',
                },
            },
        };

        expect(omit(subject, [
            'a',
            'c.f.age',
            'c.j',
        ])).toEqual({b: 200, c: {bar: true, f: {world: 'hello'}}});
    });

    it('Throws a type error when passed something other than an object to omit from', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            expect(() => omit(el, ['a', 'b'])).toThrowError(/Please pass an object to omit from and a keys array/);
        }
    });

    it('Throws a type error when passed something other than an array as keys', () => {
        for (const el of CONSTANTS.NOT_ARRAY) {
            expect(() => omit({a: 'hello'}, el)).toThrowError(/Please pass an object to omit from and a keys array/);
        }
    });
});
