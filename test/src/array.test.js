'use strict';

import isArray  from '../../src/array/is';
import dedupe   from '../../src/array/dedupe';

describe("Array - isArray", () => {
    it ('not see a string as an array', () => {
        expect(isArray('foo')).toEqual(false);
        expect(isArray(new String('bar'))).toEqual(false);
    });

    it ('not see a numeric value as an array', () => {
        expect(isArray(1)).toEqual(false);
        expect(isArray(NaN)).toEqual(false);
        expect(isArray(0.000001)).toEqual(false);
        expect(isArray(8e10)).toEqual(false);
        expect(isArray(Math.PI)).toEqual(false);
        expect(isArray(new Number(1.12345))).toEqual(false);
        expect(isArray(new Number(Number.EPSILON))).toEqual(false);
    });

    it ('not see a boolean as an array', () => {
        expect(isArray(true)).toEqual(false);
        expect(isArray(false)).toEqual(false);
        expect(isArray(Boolean(true))).toEqual(false);
        expect(isArray(Boolean(false))).toEqual(false);
        expect(isArray(Boolean('foo'))).toEqual(false);
        expect(isArray(new Boolean(false))).toEqual(false);
    });

    it ('not see a regex as an array', () => {
        expect(isArray(/abcdefg/i)).toEqual(false);
        expect(isArray(new RegExp('\\w+'))).toEqual(false);
    });

    it ('not see an object as an array', () => {
        expect(isArray({bar:'foo'})).toEqual(false);
        expect(isArray(new Object())).toEqual(false);
        expect(isArray(Object.create(null))).toEqual(false);
        expect(isArray(Object.create([]))).toEqual(false);
    });

    it ('not see a null as an array', () => {
        expect(isArray(null)).toEqual(false);
    });

    it ('not see a date as an array', () => {
        expect(isArray(new Date())).toEqual(false);
        expect(isArray(Date.now())).toEqual(false);
    });

    it ('not see an undefined as an array', () => {
        expect(isArray(undefined)).toEqual(false);
    });

    it ('see an array as an array', () => {
        expect(isArray([0, 1, 2])).toEqual(true);
        expect(isArray(new Array(1, 2, 3))).toEqual(true);
        expect(isArray(new Array(5))).toEqual(true);
    });

    it ('not see a function as an array', () => {
        function testFunction () {}

        const testArrowFunction = () => {};

        expect(isArray(testFunction)).toEqual(false);
        expect(isArray(testArrowFunction)).toEqual(false);
    });

    it ('not see formdata as an array', () => {
        let fdata = new FormData();
        expect(isArray(fdata)).toEqual(false);
    });
});

describe("Array - dedupe", () => {
    it ('correctly remove duplicate bool flags from an array', () => {
        expect(dedupe([true, false, false, false, true])).toEqual([true, false]);
    });

    it ('correctly remove duplicate numeric values from an array', () => {
        expect(dedupe([0, 1, 1, 2, 99, 100, 99, 2, 3, 3, 4])).toEqual([0, 1, 2, 99, 100, 3, 4]);
    });

    it ('correctly remove duplicate strings from an array', () => {
        expect(dedupe(['foo', 'bar', 'foo', 'foo', 'bar', 'test', 'test'])).toEqual(['foo', 'bar', 'test']);
    });

    it ('correctly remove duplicates in a mixed primitive array', () => {
        expect(dedupe(['foo', null, 1, 2, NaN, 'bar', undefined, 'bar', true, true, false, NaN, 1, 2, false, null, undefined ]))
        .toEqual(['foo', null, 1, 2, NaN, 'bar', undefined, true, false]);
    });

    it ('correctly remove duplicate arrays from an array', () => {
        let test_a = [0, 1, 2, 3, 'hello', 'world', 4, 5];
        let test_b = [0, 1, [ 'foo', 'bar'], 2, 3, [['a'], ['b']]];

        expect(dedupe([test_a, test_b, test_b, test_a])).toEqual([test_a, test_b]);
    });

    it ('correctly remove duplicate objects from an array', () => {
        let test_a = { foo : 'bar' };
        let test_b = {
            a : 1,
            b : {
                c : 2,
            },
            d : {
                e : [ 'hello', 'world' ],
                f : {
                    g : 1,
                },
                h : 'Hello world',
                i : true,
            }
        };

        expect(dedupe([
            test_a,
            test_b,
            test_a,
            test_b,
        ])).toEqual([test_a, test_b]);
    });
});
