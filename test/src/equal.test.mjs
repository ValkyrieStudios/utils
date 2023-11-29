'use strict';

/* eslint-disable no-new-wrappers */

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import equal            from '../../src/equal.mjs';

describe('Equal', () => {
    describe('Primitive: Undefined', () => {
        it('Correctly flag equal', () => {
            assert.ok(equal(undefined, undefined));
        });

        it('Correctly flag inconsistency', () => {
            assert.equal(equal(undefined, null), false);
            assert.equal(equal(undefined, 'foo'), false);
            assert.equal(equal(undefined, false), false);
            assert.equal(equal(undefined, 0), false);
        });
    });

    describe('Primitive: Null', () => {
        it('Correctly flag equal', () => {
            assert.ok(equal(null, null));
        });

        it('Correctly flag inconsistency', () => {
            assert.equal(equal(null, undefined), false);
            assert.equal(equal(null, 'foo'), false);
            assert.equal(equal(null, false), false);
            assert.equal(equal(null, 0), false);
        });
    });

    describe('Primitive: String', () => {
        it('Correctly flag equal', () => {
            assert.ok(equal('hello', 'hello'));
        });

        it('Correctly flag inconsistency', () => {
            assert.equal(equal('foo', 'bar'), false);
            assert.equal(equal('foo', 'foo '), false);
            assert.equal(equal('foo', undefined), false);
            assert.equal(equal('foo', false), false);
            assert.equal(equal('foo', new String('foo')), false);
        });
    });

    describe('Primitive: Boolean', () => {
        it('Correctly flag equal', () => {
            assert.ok(equal(false, false));
            assert.ok(equal(true, true));
            assert.equal(equal(new Boolean(false), new Boolean(false)), false);
        });

        it('Correctly flag inconsistency', () => {
            assert.equal(equal(false, true), false);
            assert.equal(equal(false, 1), false);
            assert.equal(equal(true, 0), false);
            assert.equal(equal(false, new Boolean(false)), false);
            assert.equal(equal(true, new Boolean(true)), false);
        });
    });

    describe('Primitive: Number', () => {
        it('Correctly flag equal', () => {
            assert.ok(equal(512, 512));
            assert.ok(equal(512, 512.00000000000));
            assert.ok(equal(NaN, NaN));
        });

        it('Correctly flag inconsistency', () => {
            assert.equal(equal(512, 256), false);
            assert.equal(equal(512, NaN), false);
            assert.equal(equal(512, '512'), false);
            assert.equal(equal(NaN, undefined), false);
            assert.equal(equal(NaN, null), false);
            assert.equal(equal(512, new Number(512)), false);
        });
    });

    describe('Complex: Date', () => {
        it('Correctly flag equal', () => {
            assert.ok(equal(new Date(2018, 8, 10), new Date(2018, 8, 10)));
            assert.ok(equal(new Date(2018, 8, 10), new Date('2018-09-10 00:00')));
        });

        it('Correctly flag inconsistency', () => {
            assert.equal(equal(new Date(2018, 8, 10), new Date(2018, 9, 10)), false);
            assert.equal(equal(new Date(2018, 8, 10), new Date('2018-11-10')), false);
            assert.equal(equal(new Date(2018, 8, 10), false), false);
            assert.equal(equal(new Date(2018, 8, 10), 1536530400000), false);
        });
    });

    describe('Complex: RegExp', () => {
        it('Correctly flag equal', () => {
            assert.ok(equal(/abcdefg/i, /abcdefg/i));
            assert.ok(equal(/abcdefg/i, new RegExp('abcdefg', 'i')));
        });

        it('Correctly flag inconsistency', () => {
            assert.equal(equal(/abcdefg/i, /abcdefg/), false);
            assert.equal(equal(/abcdefg/i, 'abcdefg'), false);
            assert.equal(equal(/abcdefg/i, true), false);
        });
    });

    describe('Complex: Array', () => {
        it('Correctly flag inequality', () => {
            assert.equal(equal([0, 1], [0]), false);
        });

        it('Correctly flag equal', () => {
            const a = [0, 1, 2];
            const b = [0, 1, 2];
            const c = [
                0,
                {a: 'Valkyrie rules'},
                new RegExp('abcdefg', 'i'),
                true,
                false,
                [
                    1,
                    2,
                    3,
                    [
                        new Date(2018, 9, 19),
                        5,
                        'the secret to life is 42',
                        [
                            6,
                            7,
                            8,
                        ],
                        {
                            a: 'hello world',
                            b: [0, 1, {c: 'foobar'}],
                        },
                    ],
                ],
            ];
            const d = [
                0,
                {a: 'Valkyrie rules'},
                new RegExp('abcdefg', 'i'),
                true,
                false,
                [
                    1,
                    2,
                    3,
                    [
                        new Date(2018, 9, 19),
                        5,
                        'the secret to life is 42',
                        [
                            6,
                            7,
                            8,
                        ],
                        {
                            a: 'hello world',
                            b: [0, 1, {c: 'foobar'}],
                        },
                    ],
                ],
            ];
            assert.ok(equal(a, b));
            assert.ok(equal(c, d));
            assert.ok(equal(['hello', 'world', 'foo', 1, 2], ['hello', 'world', 'foo', 1, 2]));
            assert.ok(equal([], []));
        });

        it('Correctly flag inconsistency', () => {
            const a = [0, 1, 2];
            const b = [0, 1, 3];
            const c = [
                0,
                {a: 'Valkyrie rulez'},
                new RegExp('abcdefg', 'i'),
                true,
                false,
                [
                    1,
                    2,
                    3,
                    [
                        new Date(2018, 9, 19),
                        5,
                        'the secret to life is 42',
                        [
                            6,
                            7,
                            8,
                        ],
                        {
                            a: 'hello world',
                            b: [0, 1, {c: 'foobar'}],
                        },
                    ],
                ],
            ];
            const d = [
                0,
                {a: 'Valkyrie rules'},
                new RegExp('abcdefg', 'i'),
                true,
                false,
                [
                    1,
                    2,
                    3,
                    [
                        new Date(2018, 9, 19),
                        5,
                        'the secret to life is 43',
                        [
                            6,
                            7,
                            8,
                        ],
                        {
                            a: 'hello world',
                            b: [0, 1, {c: 'footbar'}],
                        },
                    ],
                ],
            ];
            assert.equal(equal(a, b), false);
            assert.equal(equal(c, d), false);
            assert.equal(equal(['hello', 'warld', 'foo', 1, 2], ['hello', 'world', 'foo', 1, 2]), false);
        });
    });

    describe('Complex: Object', () => {
        it('Correctly flag inconsistency', () => {
            assert.equal(equal({a: 1}, {b: 2, c:3}), false);
        });

        it('Correctly flag equal', () => {
            const a = {
                foo: 'bar',
                a: 1,
                b: 2,
                c: [
                    0,
                    1,
                    2,
                    3,
                    {x : [0, 'Hello', 'world'], y: 'foobar42', z: 42},
                ],
            };
            const b = {
                foo: 'bar',
                a: 1,
                b: 2,
                c: [
                    0,
                    1,
                    2,
                    3,
                    {x : [0, 'Hello', 'world'], y: 'foobar42', z: 42},
                ],
            };
            const c = {a: new Date(2018, 9, 10), b: new RegExp('abcdefg', 'i'), c: true, d: 0.001};
            const d = {a: new Date(2018, 9, 10), b: new RegExp('abcdefg', 'i'), c: true, d: 0.001};
            assert.ok(equal(a, b));
            assert.ok(equal(c, d));
        });

        it('Correctly flag inconsistency', () => {
            const a = {
                fooz: 'bar',
                a: 1,
                b: 3,
                c: [
                    0,
                    1,
                    2,
                    3,
                    {x : [0, 'Hello', 'world'], y: 'foobar42', z: 42},
                ],
            };
            const b = {
                foo: 'bar',
                a: 1,
                b: 2,
                c: [
                    0,
                    1,
                    2,
                    3,
                    {x : [0, 'Hello', 'world'], y: 'foobar42', z: 42},
                ],
            };
            const c = {a: new Date(2018, 9, 10), b: new RegExp('abcdefg', 'i'), c: true, d: 0.001};
            const d = {a: new Date(2018, 10, 10), b: new RegExp('abcdefg', 'i'), c: true, d: 0.001};
            assert.equal(equal(a, b), false);
            assert.equal(equal(c, d), false);
        });
    });
});
