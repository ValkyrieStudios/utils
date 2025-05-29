/* eslint-disable no-new-wrappers */

import {describe, it, expect} from 'vitest';
import equal from '../../lib/equal';

describe('Equal', () => {
    describe('Primitive: Undefined', () => {
        it('Correctly flag equal', () => {
            expect(equal(undefined, undefined)).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            expect(equal(undefined, null)).toBe(false);
            expect(equal(undefined, 'foo')).toBe(false);
            expect(equal(undefined, false)).toBe(false);
            expect(equal(undefined, 0)).toBe(false);
        });
    });

    describe('Primitive: Null', () => {
        it('Correctly flag equal', () => {
            expect(equal(null, null)).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            expect(equal(null, undefined)).toBe(false);
            expect(equal(null, 'foo')).toBe(false);
            expect(equal(null, false)).toBe(false);
            expect(equal(null, 0)).toBe(false);
        });

        describe('Edge Case: Null vs Undefined', () => {
            it('Correctly flag inconsistency', () => {
                expect(equal(null, undefined)).toBe(false);
                expect(equal(null, 0)).toBe(false);
                expect(equal(undefined, false)).toBe(false);
            });
        });
    });

    describe('Primitive: String', () => {
        it('Correctly flag equal', () => {
            expect(equal('hello', 'hello')).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            expect(equal('foo', 'bar')).toBe(false);
            expect(equal('foo', 'foo ')).toBe(false);
            expect(equal('foo', undefined)).toBe(false);
            expect(equal('foo', false)).toBe(false);
            expect(equal('foo', new String('foo'))).toBe(false);
        });
    });

    describe('Primitive: Boolean', () => {
        it('Correctly flag equal', () => {
            expect(equal(false, false)).toBe(true);
            expect(equal(true, true)).toBe(true);
            expect(equal(new Boolean(false), new Boolean(false))).toBe(false);
        });

        it('Correctly flag inconsistency', () => {
            expect(equal(false, true)).toBe(false);
            expect(equal(false, 1)).toBe(false);
            expect(equal(true, 0)).toBe(false);
            expect(equal(false, new Boolean(false))).toBe(false);
            expect(equal(true, new Boolean(true))).toBe(false);
        });
    });

    describe('Primitive: Number', () => {
        it('Correctly flag equal', () => {
            expect(equal(512, 512)).toBe(true);
            expect(equal(512, 512.00000000000)).toBe(true);
            expect(equal(NaN, NaN)).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            expect(equal(512, 256)).toBe(false);
            expect(equal(512, NaN)).toBe(false);
            expect(equal(512, '512')).toBe(false);
            expect(equal(NaN, undefined)).toBe(false);
            expect(equal(NaN, null)).toBe(false);
            expect(equal(512, new Number(512))).toBe(false);
        });
    });

    describe('Primitive: BigInt', () => {
        it('Correctly flag equal', () => {
            expect(equal(10n, 10n)).toBe(true);
            expect(equal(10n, BigInt(10))).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            expect(equal(10n, 20n)).toBe(false);
            expect(equal(10n, 10)).toBe(false);
        });
    });

    describe('Primitive: Function', () => {
        function a () {
            return 1;
        }
        function b () {
            return 1;
        }
        const c = a;

        it('Correctly flag equal', () => {
            expect(equal(a, c)).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            expect(equal(a, b)).toBe(false); // different function objects even if same code
            expect(equal(a, () => 1)).toBe(false); // arrow functions
        });
    });

    describe('Complex: Date', () => {
        it('Correctly flag equal', () => {
            expect(equal(new Date(2018, 8, 10), new Date(2018, 8, 10))).toBe(true);
            expect(equal(new Date(2018, 8, 10), new Date('2018-09-10 00:00'))).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            expect(equal(new Date(2018, 8, 10), new Date(2018, 9, 10))).toBe(false);
            expect(equal(new Date(2018, 8, 10), new Date('2018-11-10'))).toBe(false);
            expect(equal(new Date(2018, 8, 10), false)).toBe(false);
            expect(equal(new Date(2018, 8, 10), 1536530400000)).toBe(false);
        });
    });

    describe('Complex: RegExp', () => {
        it('Correctly flag equal', () => {
            expect(equal(/abcdefg/i, /abcdefg/i)).toBe(true);
            expect(equal(/abcdefg/i, new RegExp('abcdefg', 'i'))).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            expect(equal(/abcdefg/i, /abcdefg/)).toBe(false);
            expect(equal(/abcdefg/i, 'abcdefg')).toBe(false);
            expect(equal(/abcdefg/i, true)).toBe(false);
        });
    });

    describe('Complex: Array', () => {
        it('Correctly flag inequality', () => {
            expect(equal([0, 1], [0])).toBe(false);
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
            expect(equal(a, b)).toBe(true);
            expect(equal(c, d)).toBe(true);
            expect(equal(['hello', 'world', 'foo', 1, 2], ['hello', 'world', 'foo', 1, 2])).toBe(true);
            expect(equal([], [])).toBe(true);
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
            expect(equal(a, b)).toBe(false);
            expect(equal(c, d)).toBe(false);
            expect(equal(['hello', 'warld', 'foo', 1, 2], ['hello', 'world', 'foo', 1, 2])).toBe(false);
        });
    });

    describe('Complex: Array with nested values', () => {
        it('Correctly flag equal', () => {
            const a = [
                0,
                {a: 'Valkyrie', map: new Map([['key', 'value']])},
                new RegExp('foo', 'g'),
                [1, 2, 3],
            ];
            const b = [
                0,
                {a: 'Valkyrie', map: new Map([['key', 'value']])},
                new RegExp('foo', 'g'),
                [1, 2, 3],
            ];
            expect(equal(a, b)).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            const a = [
                0,
                {a: 'Valkyrie', map: new Map([['key', 'value']])},
                new RegExp('foo', 'g'),
                [1, 2, 3],
            ];
            const b = [
                0,
                {a: 'Valkyrie', map: new Map([['key', 'different']])},
                new RegExp('foo', 'g'),
                [1, 2, 3],
            ];
            expect(equal(a, b)).toBe(false);
        });
    });

    describe('Complex: Object', () => {
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
            expect(equal(a, b)).toBe(true);
            expect(equal(c, d)).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            expect(equal({a: 1}, {b: 2, c:3})).toBe(false);

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
            expect(equal(a, b)).toBe(false);
            expect(equal(c, d)).toBe(false);
        });
    });

    describe('Complex: Error', () => {
        it('Correctly flag equal', () => {
            const errorA = new Error('test error');
            const errorB = new Error('test error');
            expect(equal(errorA, errorB)).toBe(true);

            const errorC = new TypeError('type error');
            const errorD = new TypeError('type error');
            expect(equal(errorC, errorD)).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            const errorA = new Error('test error');
            const errorB = new Error('different error');
            expect(equal(errorA, errorB)).toBe(false);

            const errorC = new Error('test error');
            const errorD = new TypeError('test error');
            expect(equal(errorC, errorD)).toBe(false);
        });
    });

    describe('Complex: Map', () => {
        it('Correctly flag equal', () => {
            const a = new Map([['a', 1], ['b', 2]]);
            const b = new Map([['a', 1], ['b', 2]]);
            expect(equal(a, b)).toBe(true);

            /* @ts-ignore */
            const c = new Map([['a', {x: 1}], ['b', 2]]);
            /* @ts-ignore */
            const d = new Map([['a', {x: 1}], ['b', 2]]);
            expect(equal(c, d)).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            const a = new Map([['a', 1], ['b', 2]]);
            const b = new Map([['a', 1], ['b', 3]]);
            expect(equal(a, b)).toBe(false);

            /* @ts-ignore */
            const c = new Map([['a', {x: 1}], ['b', 2]]);
            /* @ts-ignore */
            const d = new Map([['a', {x: 2}], ['b', 2]]);
            expect(equal(c, d)).toBe(false);

            const f = new Map([['a', 1], ['b', 2]]);
            const g = new Map([['a', 1], ['b', 2], ['c', 3]]);
            expect(equal(f, g)).toBe(false);
        });
    });

    describe('Complex: Custom Object Instances', () => {
        class MyClass {

            public prop:number;

            constructor (prop: number) {
                this.prop = prop;
            }

        }

        it('Correctly flag equal', () => {
            const a = new MyClass(1);
            const b = new MyClass(1);
            expect(equal(a, b)).toBe(true);
        });

        it('Correctly flag inconsistency', () => {
            const a = new MyClass(1);
            const b = new MyClass(2);
            expect(equal(a, b)).toBe(false);
        });
    });
});
