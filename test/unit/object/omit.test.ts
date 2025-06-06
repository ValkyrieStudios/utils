/* eslint-disable id-denylist */

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

    it('Correctly omits wildcard keys from nested objects', () => {
        const subject = {
            id: 1,
            account: {password: 'abc123', token: 't1'},
            profile: {password: 'def456', name: 'peter'},
            config: {enabled: true},
        };

        expect(omit(subject, ['*.password'])).toEqual({
            id: 1,
            account: {token: 't1'},
            profile: {name: 'peter'},
            config: {enabled: true},
        });
    });

    it('Ignores wildcard keys if sub-objects don’t contain the property', () => {
        const subject = {
            a: {name: 'foo'},
            b: {value: 123},
        };

        expect(omit(subject, ['*.missing'])).toEqual({
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
        const result = omit(subject, ['*.password']);

        expect(subject).toEqual(copy);
        expect(result).toEqual({
            user: {email: 'x@y.com'},
            meta: {status: 'ok'},
        });
    });

    it('Correctly clones only once for multiple wildcard deletions', () => {
        const subject = {
            user: {a: 1, b: 2, c: 3},
            meta: {a: 10, b: 20, c: 30},
        };

        const result = omit(subject, ['*.a', '*.b']);

        expect(result).toEqual({
            user: {c: 3},
            meta: {c: 30},
        });

        // ensure only user & meta are affected
        expect(result.user).not.toBe(subject.user);
        expect(result.meta).not.toBe(subject.meta);
    });

    it('Correctly handles empty object with wildcard', () => {
        expect(omit({}, ['*.a'])).toEqual({});
    });

    it('Handles wildcard targeting non-object values gracefully', () => {
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

        expect(() => omit(subject, ['*.foo'])).not.toThrow();
        expect(omit(subject, ['*.foo'])).toEqual(subject);
    });

    it('Correctly omits keys inside array of objects', () => {
        const subject = {
            users: [
                {id: 1, token: 'abc', email: 'a@x.com'},
                {id: 2, token: 'def', email: 'b@x.com'},
            ],
        };

        expect(omit(subject, ['users.token'])).toEqual({
            users: [
                {id: 1, email: 'a@x.com'},
                {id: 2, email: 'b@x.com'},
            ],
        });
    });

    it('Correctly omits deeply nested keys in array of objects', () => {
        const subject = {
            data: {
                rows: [
                    {meta: {secret: 'x', id: 1}},
                    {meta: {secret: 'y', id: 2}},
                ],
            },
        };

        expect(omit(subject, ['data.rows.meta.secret'])).toEqual({
            data: {
                rows: [
                    {meta: {id: 1}},
                    {meta: {id: 2}},
                ],
            },
        });
    });

    it('Correctly omits keys with a mix of wildcard and normal patterns', () => {
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

        expect(omit(subject, ['*.secret', '*.age', 'data.accessToken', 'pin'])).toEqual({
            user: {
                name: 'Peter',
            },
            data: {
                rows: [
                    {meta: {id: 1}},
                    {meta: {id: 2}},
                ],
            },
        });
    });

    it('Gracefully skips non-object values inside arrays', () => {
        const subject = {
            a: [1, 2, 3],
            b: [{x: 1}, 'string', {x: 2}],
        };

        expect(omit(subject, ['b.x'])).toEqual({
            a: [1, 2, 3],
            b: [{}, 'string', {}],
        });
    });

    it('Does not mutate arrays while omitting from them', () => {
        const subject = {
            users: [{id: 1, token: 'abc'}, {id: 2, token: 'def'}],
        };

        const copy = JSON.parse(JSON.stringify(subject));
        const result = omit(subject, ['users.token']);

        expect(subject).toEqual(copy);
        expect(result).not.toBe(subject);
        expect(result.users[0]).not.toBe(subject.users[0]);
        expect(result.users[1]).not.toBe(subject.users[1]);
    });

    it('Skips cloning if array item is not strictly equal to source', () => {
        const altered = [{id: 1}, {id: 2}];
        const result = omit({users: altered}, ['users.id']);
        expect(result).toEqual({users: [{}, {}]});
    });

    it('Ignores non-object items inside arrays during omit', () => {
        const input = {
            items: ['hello', 123, true],
        };

        /* @ts-ignore */
        const result = omit(input, ['items.nonexistent']);
        expect(result).toEqual(input);
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
