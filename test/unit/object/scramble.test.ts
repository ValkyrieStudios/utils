/* eslint-disable id-denylist */

import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import scramble from '../../../lib/object/scramble';

describe('Object - scramble', () => {
    it('Correctly scrambles the specified keys', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                d: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        expect(scramble(subject, ['a'])).toEqual({a: '***', b: 200, c: {d: 5, bar: true, f: [0, 1, 2]}});
        expect(scramble(subject, ['a', 'b'])).toEqual({a: '***', b: '***', c: {d: 5, bar: true, f: [0, 1, 2]}});
        expect(scramble(subject, ['a', 'c.bar'])).toEqual({a: '***', b: 200, c: {d: 5, bar: '***', f: [0, 1, 2]}});
        expect(scramble(subject, ['a', 'c.d', 'c.f'])).toEqual({a: '***', b: 200, c: {bar: true, d: '***', f: '***'}});
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

        expect(scramble(subject, ['a', ...CONSTANTS.NOT_STRING, 'd'])).toEqual({
            a: '***',
            b: 200,
            c: {d: 5, bar: true, f: [0, 1, 2]},
        });
    });

    it('Correctly ignores paths that cannot be reached', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                j: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        /* @ts-ignore */
        expect(scramble(subject, ['a', '  ', 'c.d', 'b'])).toEqual({
            a: '***',
            b: '***',
            c: {j: 5, bar: true, f: [0, 1, 2]},
        });
    });

    it('Correctly ignores missing root paths', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                j: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        /* @ts-ignore */
        expect(scramble(subject, ['a', '  ', 'c.d', 'd.f', 'b'])).toEqual({
            a: '***',
            b: '***',
            c: {j: 5, bar: true, f: [0, 1, 2]},
        });
    });

    it('Correctly scrambles deeply nested keys', () => {
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

        expect(scramble(subject, ['a', 'c.f.age', 'c.j'])).toEqual({
            a: '***',
            b: 200,
            c: {
                bar: true,
                f: {
                    age: '***',
                    world: 'hello',
                },
                j: '***',
            },
        });
    });

    it('Correctly scrambles wildcard keys from nested objects', () => {
        const subject = {
            id: 1,
            account: {password: 'abc123', token: 't1'},
            profile: {password: 'def456', name: 'peter'},
            config: {enabled: true},
        };

        expect(scramble(subject, ['*.password'])).toEqual({
            id: 1,
            account: {password: '***', token: 't1'},
            profile: {password: '***', name: 'peter'},
            config: {enabled: true},
        });
    });

    it('Correctly scrambles wildcard keys from nested objects with a provided replacement', () => {
        const subject = {
            id: 1,
            account: {password: 'abc123', token: 't1'},
            profile: {password: 'def456', name: 'peter'},
            config: {enabled: true},
        };

        expect(scramble(subject, ['*.password'], {replacement: 'NO_SECRETS_FOR_YOU'})).toEqual({
            id: 1,
            account: {password: 'NO_SECRETS_FOR_YOU', token: 't1'},
            profile: {password: 'NO_SECRETS_FOR_YOU', name: 'peter'},
            config: {enabled: true},
        });
    });

    it('Ignores wildcard keys if sub-objects don’t contain the property', () => {
        const subject = {
            a: {name: 'foo'},
            b: {value: 123},
        };

        expect(scramble(subject, ['*.missing'])).toEqual({
            a: {name: 'foo'},
            b: {value: 123},
        });
    });

    it('Does not mutate the original object when using wildcards', () => {
        const subject = {
            user: {password: 'secret', email: 'x@y.com'},
            meta: {password: 'hidden', status: 'ok'},
        };

        const copy = JSON.parse(JSON.stringify(subject));
        const result = scramble(subject, ['*.password']);

        expect(subject).toEqual(copy);
        expect(result).toEqual({
            user: {password: '***', email: 'x@y.com'},
            meta: {password: '***', status: 'ok'},
        });
    });

    it('Correctly clones only once for multiple wildcard scrambles', () => {
        const subject = {
            user: {a: 1, b: 2, c: 3},
            meta: {a: 10, b: 20, c: 30},
        };

        const result = scramble(subject, ['*.a', '*.b']);

        expect(result).toEqual({
            user: {a: '***', b: '***', c: 3},
            meta: {a: '***', b: '***', c: 30},
        });

        expect(result.user).not.toBe(subject.user);
        expect(result.meta).not.toBe(subject.meta);
    });

    it('Handles empty object with wildcard', () => {
        expect(scramble({}, ['*.a'])).toEqual({});
    });

    it('Handles wildcard on non-object values gracefully', () => {
        const subject = {
            a: 123,
            b: 'string',
            c: true,
            d: null,
            e: undefined,
            f: () => {},
            g: [],
            h: {},
        };

        expect(() => scramble(subject, ['*.foo'])).not.toThrow();
        expect(scramble(subject, ['*.foo'])).toEqual(subject);
    });

    it('Correctly scrambles keys in array of objects', () => {
        const subject = {
            items: [
                {id: 1, token: 'abc'},
                {id: 2, token: 'def'},
            ],
        };

        expect(scramble(subject, ['items.token'])).toEqual({
            items: [
                {id: 1, token: '***'},
                {id: 2, token: '***'},
            ],
        });
    });

    it('Correctly scrambles deeply nested arrays', () => {
        const subject = {
            data: {
                rows: [
                    {meta: {secret: 'a'}},
                    {meta: {secret: 'b'}},
                ],
            },
        };

        expect(scramble(subject, ['data.rows.meta.secret'])).toEqual({
            data: {
                rows: [
                    {meta: {secret: '***'}},
                    {meta: {secret: '***'}},
                ],
            },
        });
    });

    it('Correctly scrambles deeply nested arrays with a provided replacement', () => {
        const subject = {
            data: {
                rows: [
                    {meta: {secret: 'a', name: 'Peter'}},
                    {meta: {secret: 'b', name: 'Bob'}},
                ],
            },
        };

        expect(scramble(subject, ['data.rows.meta.secret'], {replacement: 'NO_SECRETS_FOR_YOU'})).toEqual({
            data: {
                rows: [
                    {meta: {secret: 'NO_SECRETS_FOR_YOU', name: 'Peter'}},
                    {meta: {secret: 'NO_SECRETS_FOR_YOU', name: 'Bob'}},
                ],
            },
        });
    });

    it('Correctly scrambles keys with a mix of wildcard and normal patterns', () => {
        const subject = {
            user: {
                name: 'Peter',
                secret: 'Z',
                age: 35,
            },
            pin: 1234,
            data: {
                rows: [
                    {meta: {secret: 'x', id: 1}},
                    {meta: {secret: 'y', id: 2}},
                ],
                accessToken: 'whadup',
            },
        };

        expect(scramble(subject, ['*.secret', '*.age', 'data.accessToken', 'pin'])).toEqual({
            user: {
                name: 'Peter',
                secret: '***',
                age: '***',
            },
            pin: '***',
            data: {
                rows: [
                    {meta: {secret: '***', id: 1}},
                    {meta: {secret: '***', id: 2}},
                ],
                accessToken: '***',
            },
        });
    });

    it('Does not mutate arrays while omitting from them', () => {
        const subject = {
            users: [{id: 1, token: 'abc'}, {id: 2, token: 'def'}],
        };

        const copy = JSON.parse(JSON.stringify(subject));
        const result = scramble(subject, ['users.token']);

        expect(subject).toEqual(copy);
        expect(result).not.toBe(subject);
        expect(result.users[0]).not.toBe(subject.users[0]);
        expect(result.users[1]).not.toBe(subject.users[1]);
    });

    it('Throws a type error when passed something other than an object to scramble', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            expect(() => scramble(el, ['a', 'b'])).toThrowError(/Please pass an object to scramble and a keys array/);
        }
    });

    it('Throws a type error when passed something other than an array as keys', () => {
        for (const el of CONSTANTS.NOT_ARRAY) {
            expect(() => scramble({a: 'hello'}, el)).toThrowError(/Please pass an object to scramble and a keys array/);
        }
    });
});
