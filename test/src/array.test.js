'use strict';

import isArray          from '../../src/array/is';
import isNotEmptyArray  from '../../src/array/isNotEmpty';
import dedupe           from '../../src/array/dedupe';
import {
    fnNumericValues,
    fnBooleanValues,
    fnRegexValues,
    fnStringValues,
    fnObjectValues,
    fnDateValues,
    fnArrayValues,
    fnFunctionValues,
    fnFormDataValues,
    fnNullables,
} from '../constants';

describe("Array - isArray", () => {
    it ('not see a string as an array', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isArray(el)).toEqual(false);
    });

    it ('not see a numeric value as an array', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isArray(el)).toEqual(false);
    });

    it ('not see a boolean as an array', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isArray(el)).toEqual(false);
    });

    it ('not see a regex as an array', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isArray(el)).toEqual(false);
    });

    it ('not see an object as an array', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isArray(el)).toEqual(false);
    });

    it ('not see a nullable as an array', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isArray(el)).toEqual(false);
    });

    it ('not see a date as an array', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isArray(el)).toEqual(false);
    });

    it ('see an array as an array', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isArray(el)).toEqual(true);
    });

    it ('not see a function as an array', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isArray(el)).toEqual(false);
    });

    it ('not see formdata as an array', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isArray(el)).toEqual(false);
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

describe("Array - isNotEmptyArray", () => {
    it ('not see a string as a non empty array', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNotEmptyArray(el)).toEqual(false);
    });

    it ('not see a numeric value as a non empty array', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isNotEmptyArray(el)).toEqual(false);
    });

    it ('not see a boolean as a non empty array', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNotEmptyArray(el)).toEqual(false);
    });

    it ('not see a regex as a non empty array', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNotEmptyArray(el)).toEqual(false);
    });

    it ('not see an object as a non empty array', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNotEmptyArray(el)).toEqual(false);
    });

    it ('not see a nullable as a non empty array', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNotEmptyArray(el)).toEqual(false);
    });

    it ('not see a date as a non empty array', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNotEmptyArray(el)).toEqual(false);
    });

    it ('see a non empty array as a non empty array', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNotEmptyArray(el)).toEqual(true);

        expect(isNotEmptyArray([false])).toEqual(true);
        expect(isNotEmptyArray([null])).toEqual(true);
        expect(isNotEmptyArray([undefined])).toEqual(true);
    });

    it ('not see an empty array as a non empty array', () => {
        expect(isNotEmptyArray(new Array())).toEqual(false);
        expect(isNotEmptyArray([])).toEqual(false);
    });

    it ('not see a function as a non empty array', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNotEmptyArray(el)).toEqual(false);
    });

    it ('not see formdata as a non empty array', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isNotEmptyArray(el)).toEqual(false);
    });
});
