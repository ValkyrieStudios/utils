import { equal } from '../../src/equal';
import { isDate } from '../../src/date';

describe("Equal", () => {
//
//  Primitive : Undefined
//

    it ('primitive - undefined : correctly flag equal', () => {
        const a = undefined;
        const b = undefined;
        expect(equal(a, b)).toEqual(true);
    });

    it ('primitive - undefined : correctly flag inconsistency', () => {
        const a = undefined;
        const b = null;
        const c = 'foo';
        const d = false;
        const e = 0;
        expect(equal(a, b)).toEqual(false);
        expect(equal(a, c)).toEqual(false);
        expect(equal(a, d)).toEqual(false);
        expect(equal(a, e)).toEqual(false);
    });

//
//  Primitive : Null
//

    it ('primitive - null : correctly flag equal', () => {
        const a = null;
        const b = null;
        expect(equal(a, b)).toEqual(true);
    });

    it ('primitive - null : correctly flag inconsistency', () => {
        const a = null;
        const b = undefined;
        const c = 'foo';
        const d = false;
        const e = 0;
        expect(equal(a, b)).toEqual(false);
        expect(equal(a, c)).toEqual(false);
        expect(equal(a, d)).toEqual(false);
        expect(equal(a, e)).toEqual(false);
    });

//
//  Primitive : String
//

    it ('primitive - string : correctly flag equal', () => {
        const a = 'hello';
        const b = 'hello';
        expect(equal(a, b)).toEqual(true);
    });

    it ('primitive - string : correctly flag inconsistency', () => {
        const a = 'foo';
        const b = 'bar';
        const c = 'foo ';
        const d = undefined;
        const e = false;
        const f = new String('foo');
        expect(equal(a, b)).toEqual(false);
        expect(equal(a, c)).toEqual(false);
        expect(equal(a, d)).toEqual(false);
        expect(equal(a, e)).toEqual(false);
        expect(equal(a, f)).toEqual(false);
    });

//
//  Primitive : Boolean
//

    it ('primitive - boolean : correctly flag equal', () => {
        const a = false;
        const b = false;
        const c = true;
        const d = true;
        const e = new Boolean(false);
        const f = new Boolean(false);
        expect(equal(a, b)).toEqual(true);
        expect(equal(c, d)).toEqual(true);
        expect(equal(e, f)).toEqual(false);
    });

    it ('primitive - boolean : correctly flag inconsistency', () => {
        const a = false;
        const b = true;
        const c = 1;
        const d = 0;
        const e = new Boolean(false);
        const f = new Boolean(true);
        expect(equal(a, b)).toEqual(false);
        expect(equal(a, c)).toEqual(false);
        expect(equal(b, d)).toEqual(false);
        expect(equal(a, e)).toEqual(false);
        expect(equal(b, f)).toEqual(false);
    });

//
//  Primitive : Boolean
//

    it ('primitive - number : correctly flag equal', () => {
        const a = 512;
        const b = 512;
        const c = 512.00000000000;
        const d = NaN;
        const e = NaN;
        expect(equal(a, b)).toEqual(true);
        expect(equal(a, c)).toEqual(true);
        expect(equal(d, e)).toEqual(true);
    });

    it ('primitive - number : correctly flag inconsistency', () => {
        const a = 512;
        const b = 256;
        const c = NaN;
        const d = '512';
        const e = undefined;
        const f = null;
        const g = new Number(512);
        expect(equal(a, b)).toEqual(false);
        expect(equal(a, c)).toEqual(false);
        expect(equal(a, d)).toEqual(false);
        expect(equal(c, e)).toEqual(false);
        expect(equal(c, f)).toEqual(false);
        expect(equal(a, g)).toEqual(false);
    });

//
//  Date
//

    it ('complex - Date : correctly flag equal', () => {
        const a = new Date(2018, 8, 10);
        const b = new Date(2018, 8, 10);
        const c = new Date('2018-09-10 00:00');
        expect(equal(a, b)).toEqual(true);
        expect(equal(a, c)).toEqual(true);
    });

    it ('complex - Date : correctly flag inconsistency', () => {
        const a = new Date(2018, 8, 10);
        const b = new Date(2018, 9, 10);
        const c = new Date('2018-11-10');
        const d = false;
        const e = 1536530400000;
        expect(equal(a, b)).toEqual(false);
        expect(equal(a, c)).toEqual(false);
        expect(equal(a, d)).toEqual(false);
        expect(equal(a, e)).toEqual(false);
    });

//
//  RegExp
//

    it ('complex - RegExp : correctly flag equal', () => {
        const a = /abcdefg/i;
        const b = /abcdefg/i;
        const c = new RegExp('abcdefg', 'i');
        const d = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const e = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$');
        expect(equal(a, b)).toEqual(true);
        expect(equal(a, c)).toEqual(true);
        expect(equal(d, e)).toEqual(true);
    });

    it ('complex - RegExp : correctly flag inconsistency', () => {
        const a = /abcdefg/i;
        const b = /abcdefg/;
        const c = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const d = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$');
        const e = 'abcdefg';
        const f = true;
        expect(equal(a, b)).toEqual(false);
        expect(equal(c, d)).toEqual(false);
        expect(equal(a, e)).toEqual(false);
        expect(equal(a, f)).toEqual(false);
    });

//
//  Array
//

    it ('complex - Array : correctly flag equal', () => {
        const a = [0, 1, 2];
        const b = [0, 1, 2];
        const c = [
            0,
            { a: 'Valkyrie rules' },
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
                        8
                    ],
                    {
                        a: 'hello world',
                        b: [0, 1, { c: 'foobar' }]
                    }
                ]
            ]
        ];
        const d = [
            0,
            { a: 'Valkyrie rules' },
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
                        8
                    ],
                    {
                        a: 'hello world',
                        b: [0, 1, { c: 'foobar' }]
                    }
                ]
            ]
        ];
        const e = ['hello', 'world', 'foo', 1, 2];
        const f = ['hello', 'world', 'foo', 1, 2];
        expect(equal(a, b)).toEqual(true);
        expect(equal(c, d)).toEqual(true);
        expect(equal(e, f)).toEqual(true);
        expect(equal([], [])).toEqual(true);
    });

    it ('complex - Array : correctly flag inconsistency', () => {
        const a = [0, 1, 2];
        const b = [0, 1, 3];
        const c = [
            0,
            { a: 'Valkyrie rulez' },
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
                        8
                    ],
                    {
                        a: 'hello world',
                        b: [0, 1, { c: 'foobar' }]
                    }
                ]
            ]
        ];
        const d = [
            0,
            { a: 'Valkyrie rules' },
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
                        8
                    ],
                    {
                        a: 'hello world',
                        b: [0, 1, { c: 'footbar' }]
                    }
                ]
            ]
        ];
        const e = ['hello', 'warld', 'foo', 1, 2];
        const f = ['hello', 'world', 'foo', 1, 2];
        expect(equal(a, b)).toEqual(false);
        expect(equal(c, d)).toEqual(false);
        expect(equal(e, f)).toEqual(false);
    });

//
//  Object
//

    it ('complex - Object : correctly flag equal', () => {
        const a = {
            foo: 'bar',
            a: 1,
            b: 2,
            c: [
                0,
                1,
                2,
                3,
                { x : [0, 'Hello', 'world'], y: 'foobar42', z: 42 }
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
                { x : [0, 'Hello', 'world'], y: 'foobar42', z: 42 }
            ],
        };
        const c = { a: new Date(2018, 9, 10), b: new RegExp('abcdefg', 'i'), c: true, d: 0.001 };
        const d = { a: new Date(2018, 9, 10), b: new RegExp('abcdefg', 'i'), c: true, d: 0.001 };
        expect(equal(a, b)).toEqual(true);
        expect(equal(c, d)).toEqual(true);
    });

    it ('complex - Object : correctly flag inconsistency', () => {
        const a = {
            fooz: 'bar',
            a: 1,
            b: 3,
            c: [
                0,
                1,
                2,
                3,
                { x : [0, 'Hello', 'world'], y: 'foobar42', z: 42 }
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
                { x : [0, 'Hello', 'world'], y: 'foobar42', z: 42 }
            ],
        };
        const c = { a: new Date(2018, 9, 10), b: new RegExp('abcdefg', 'i'), c: true, d: 0.001 };
        const d = { a: new Date(2018, 10, 10), b: new RegExp('abcdefg', 'i'), c: true, d: 0.001 };
        expect(equal(a, b)).toEqual(false);
        expect(equal(c, d)).toEqual(false);
    });

});
