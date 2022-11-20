'use strict';

import fnv1A            from '../../src/hash/fnv1A';
import isArray          from '../../src/array/is';
import isNotEmptyArray  from '../../src/array/isNotEmpty';
import dedupe           from '../../src/array/dedupe';
import mapKey           from '../../src/array/mapKey';
import mapFn            from '../../src/array/mapFn';
import mapPrimitive     from '../../src/array/mapPrimitive';
import join             from '../../src/array/join';
import shuffle          from '../../src/array/shuffle';
import {
    fnNumericValues,
    fnBooleanValues,
    fnRegexValues,
    fnStringValues,
    fnObjectValues,
    fnDateValues,
    fnArrayValues,
    fnFunctionValues,
    fnNullables,
} from '../constants';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

function getTime () {
    const hr_time = process.hrtime();
    return hr_time[0] * 1000 + hr_time[1] / 1000000;
}

describe("Array - isArray", () => {
    it ('not see a string as an array', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isArray(el)).to.eql(false);
    });

    it ('not see a numeric value as an array', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isArray(el)).to.eql(false);
    });

    it ('not see a boolean as an array', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isArray(el)).to.eql(false);
    });

    it ('not see a regex as an array', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isArray(el)).to.eql(false);
    });

    it ('not see an object as an array', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isArray(el)).to.eql(false);
    });

    it ('not see a nullable as an array', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isArray(el)).to.eql(false);
    });

    it ('not see a date as an array', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isArray(el)).to.eql(false);
    });

    it ('see an array as an array', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isArray(el)).to.eql(true);
    });

    it ('not see a function as an array', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isArray(el)).to.eql(false);
    });
});

describe("Array - dedupe", () => {
    it ('returns empty array when passing a string', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(dedupe(el)).to.deep.equal([]);
    });

    it ('returns empty array when passing a numeric value', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(dedupe(el)).to.deep.equal([]);
    });

    it ('returns empty array when passing a boolean', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(dedupe(el)).to.deep.equal([]);
    });

    it ('returns empty array when passing a regex', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(dedupe(el)).to.deep.equal([]);
    });

    it ('returns empty array when passing an object', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(dedupe(el)).to.deep.equal([]);
    });

    it ('returns empty array when passing a nullable', () => {
        let vals = fnNullables();
        for (let el of vals) expect(dedupe(el)).to.deep.equal([]);
    });

    it ('returns empty array when passing a date', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(dedupe(el)).to.deep.equal([]);
    });

    it ('returns empty array when passing an empty aray', () => {
        expect(dedupe([])).to.deep.equal([]);
    });

    it ('returns empty array when passing nothing', () => {
        expect(dedupe()).to.deep.equal([]);
    });

    it ('returns empty array when passing a function', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(dedupe(el)).to.deep.equal([]);
    });

    it ('correctly remove duplicate bool flags from an array', () => {
        expect(dedupe([true, false, false, false, true])).to.eql([true, false]);
    });

    it ('correctly remove duplicate numeric values from an array', () => {
        expect(dedupe([0, 1, 1, 2, 99, 100, 99, 2, 3, 3, 4])).to.eql([0, 1, 2, 99, 100, 3, 4]);
    });

    it ('correctly remove duplicate strings from an array', () => {
        expect(dedupe(['foo', 'bar', 'foo', 'foo', 'bar', 'test', 'test'])).to.eql(['foo', 'bar', 'test']);
    });

    it ('correctly remove duplicates in a mixed primitive array', () => {
        expect(dedupe(['foo', null, 1, 2, NaN, 'bar', undefined, 'bar', true, true, false, NaN, 1, 2, false, null, undefined ]))
        .to.eql(['foo', null, 1, 2, NaN, 'bar', undefined, true, false]);
    });

    it ('correctly remove duplicate arrays from an array', () => {
        let test_a = [0, 1, 2, 3, 'hello', 'world', 4, 5];
        let test_b = [0, 1, [ 'foo', 'bar'], 2, 3, [['a'], ['b']]];

        expect(dedupe([test_a, test_b, test_b, test_a])).to.eql([test_a, test_b]);
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
        ])).to.eql([test_a, test_b]);
    });
});

describe("Array - isNotEmptyArray", () => {
    it ('not see a string as a non empty array', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNotEmptyArray(el)).to.eql(false);
    });

    it ('not see a numeric value as a non empty array', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isNotEmptyArray(el)).to.eql(false);
    });

    it ('not see a boolean as a non empty array', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNotEmptyArray(el)).to.eql(false);
    });

    it ('not see a regex as a non empty array', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNotEmptyArray(el)).to.eql(false);
    });

    it ('not see an object as a non empty array', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNotEmptyArray(el)).to.eql(false);
    });

    it ('not see a nullable as a non empty array', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNotEmptyArray(el)).to.eql(false);
    });

    it ('not see a date as a non empty array', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNotEmptyArray(el)).to.eql(false);
    });

    it ('see a non empty array as a non empty array', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNotEmptyArray(el)).to.eql(true);

        expect(isNotEmptyArray([false])).to.eql(true);
        expect(isNotEmptyArray([null])).to.eql(true);
        expect(isNotEmptyArray([undefined])).to.eql(true);
    });

    it ('not see an empty array as a non empty array', () => {
        expect(isNotEmptyArray(new Array())).to.eql(false);
        expect(isNotEmptyArray([])).to.eql(false);
    });

    it ('not see a function as a non empty array', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNotEmptyArray(el)).to.eql(false);
    });
});

describe("Array - MapKey", () => {

    it ('should correctly map an array of objects by key', () => {
        expect(mapKey([
            {uid: 12, name: 'Peter'},
            {uid: 15, name: 'Jonas'},
            {uid: 87, name: 'Josh'},
        ], 'uid')).to.deep.equal({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it ('should correctly map an array of objects by key when passing a non-object config', () => {
        expect(mapKey([
            {uid: 12, name: 'Peter'},
            {uid: 15, name: 'Jonas'},
            {uid: 87, name: 'Josh'},
        ], 'uid', 'foo')).to.deep.equal({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it ('should correctly remove non-objects from the array when mapping an array of objects by key', () => {
        expect(mapKey([
            0,
            {uid: 12, name: 'Peter'},
            false,
            'foobar',
            {uid: 15, name: 'Jonas'},
            [{hi: 'there'}],
            null,
            undefined,
            new Date(),
            {uid: 87, name: 'Josh'},
        ], 'uid')).to.deep.equal({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it ('should correctly remove objects without the provided key from the array when mapping an array of objects by key', () => {
        expect(mapKey([
            0,
            {uid: 12, name: 'Peter'},
            false,
            'foobar',
            {uid: 15, name: 'Jonas'},
            [{hi: 'there'}],
            null,
            undefined,
            {name: 'Alana'},
            new Date(),
            {uid: 87, name: 'Josh'},
        ], 'uid')).to.deep.equal({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it ('should correctly take the last object for a key-match when passed an array where there are duplicates', () => {
        expect(mapKey([
            0,
            {uid: 12, name: 'Peter'},
            false,
            'foobar',
            {uid: 15, name: 'Jonas'},
            [{hi: 'there'}],
            {uid: 15, name: 'Bob'},
            null,
            undefined,
            {name: 'Alana'},
            new Date(),
            {uid: 87, name: 'Josh'},
            {uid: 12, name: 'Farah'},
        ], 'uid')).to.deep.equal({
            12: {uid: 12, name: 'Farah'},
            15: {uid: 15, name: 'Bob'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it ('should ensure the objects are assigned on top of each other for a key-match when passed an array where there are duplicates and setting merge to true', () => {
        expect(mapKey([
            0,
            {uid: 12, name: 'Peter'},
            false,
            'foobar',
            {uid: 15, name: 'Jonas', dob: '2022-02-07'},
            [{hi: 'there'}],
            {uid: 15, name: 'Bob'},
            null,
            undefined,
            {name: 'Alana'},
            new Date(),
            {uid: 87, name: 'Josh'},
            {uid: 12, name: 'Farah'},
        ], 'uid', {merge: true})).to.deep.equal({
            12: {uid: 12, name: 'Farah'},
            15: {uid: 15, name: 'Bob', dob: '2022-02-07'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    //  Value sanity checks

    it ('return an empty object if passed a string as value', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(mapKey(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a numeric as value', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(mapKey(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a boolean as value', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(mapKey(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a regex as value', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(mapKey(el)).to.deep.equal({});
    });

    it ('return an empty object if passed an object as value', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(mapKey(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a nullable as value', () => {
        let vals = fnNullables();
        for (let el of vals) expect(mapKey(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a date as value', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(mapKey(el)).to.deep.equal({});
    });

    it ('return an empty object if passed an empty array as value', () => {
        expect(mapKey(new Array())).to.deep.equal({});
        expect(mapKey([])).to.deep.equal({});
    });

    it ('return an empty object if passed a function as value', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(mapKey(el)).to.deep.equal({});
    });

    //  Key sanity checks

    it ('return an empty object if passed a numeric as value', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(mapKey([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed a boolean as value', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(mapKey([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed a regex as value', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(mapKey([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed an object as value', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(mapKey([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed a nullable as value', () => {
        let vals = fnNullables();
        for (let el of vals) expect(mapKey([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed a date as value', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(mapKey([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed an empty array as value', () => {
        expect(mapKey([{foo: 'bar'}], new Array())).to.deep.equal({});
        expect(mapKey([{foo: 'bar'}], [])).to.deep.equal({});
    });

    it ('return an empty object if passed a function as value', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(mapKey([{foo: 'bar'}], el)).to.deep.equal({});
    });
});

describe("Array - MapFn", () => {

    it ('should correctly map an array of objects', () => {
        expect(mapFn([
            {uid: 12, name: 'Peter'},
            {uid: 15, name: 'Jonas'},
            {uid: 87, name: 'Josh'},
        ], el => el.uid)).to.deep.equal({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it ('should correctly map an array of objects when passing a non-object options', () => {
        expect(mapFn([
            {uid: 12, name: 'Peter'},
            {uid: 15, name: 'Jonas'},
            {uid: 87, name: 'Josh'},
        ], el => el.uid, 'foo')).to.deep.equal({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it ('should correctly remove non-objects from the array when mapping an array of objects', () => {
        expect(mapFn([
            0,
            {uid: 12, name: 'Peter'},
            false,
            'foobar',
            {uid: 15, name: 'Jonas'},
            [{hi: 'there'}],
            null,
            undefined,
            new Date(),
            {uid: 87, name: 'Josh'},
        ], el => el.uid)).to.deep.equal({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it ('should correctly remove objects without the provided key from the array when mapping an array of objects', () => {
        expect(mapFn([
            0,
            {uid: 12, name: 'Peter'},
            false,
            'foobar',
            {uid: 15, name: 'Jonas'},
            [{hi: 'there'}],
            null,
            undefined,
            {name: 'Alana'},
            new Date(),
            {uid: 87, name: 'Josh'},
        ], el => el.uid)).to.deep.equal({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it ('should correctly take the last object for a key-match when passed an array where there are duplicates', () => {
        expect(mapFn([
            0,
            {uid: 12, name: 'Peter'},
            false,
            'foobar',
            {uid: 15, name: 'Jonas'},
            [{hi: 'there'}],
            {uid: 15, name: 'Bob'},
            null,
            undefined,
            {name: 'Alana'},
            new Date(),
            {uid: 87, name: 'Josh'},
            {uid: 12, name: 'Farah'},
        ], el => el.uid)).to.deep.equal({
            12: {uid: 12, name: 'Farah'},
            15: {uid: 15, name: 'Bob'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it ('should ensure the objects are assigned on top of each other for a key-match when passed an array where there are duplicates and setting merge to true', () => {
        expect(mapFn([
            0,
            {uid: 12, name: 'Peter'},
            false,
            'foobar',
            {uid: 15, name: 'Jonas', dob: '2022-02-07'},
            [{hi: 'there'}],
            {uid: 15, name: 'Bob'},
            null,
            undefined,
            {name: 'Alana'},
            new Date(),
            {uid: 87, name: 'Josh'},
            {uid: 12, name: 'Farah'},
        ], el => el.uid, {merge: true})).to.deep.equal({
            12: {uid: 12, name: 'Farah'},
            15: {uid: 15, name: 'Bob', dob: '2022-02-07'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it ('should not do anything when passed a function that returns nothing', () => {
        expect(mapFn([
            0,
            {uid: 12, name: 'Peter'},
            false,
            'foobar',
            {uid: 15, name: 'Jonas', dob: '2022-02-07'},
            [{hi: 'there'}],
            {uid: 15, name: 'Bob'},
            null,
            undefined,
            {name: 'Alana'},
            new Date(),
            {uid: 87, name: 'Josh'},
            {uid: 12, name: 'Farah'},
        ], () => {}, {merge: true})).to.deep.equal({});
    });

    //  Value sanity checks

    it ('return an empty object if passed a string as value', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(mapFn(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a numeric as value', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(mapFn(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a boolean as value', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(mapFn(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a regex as value', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(mapFn(el)).to.deep.equal({});
    });

    it ('return an empty object if passed an object as value', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(mapFn(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a nullable as value', () => {
        let vals = fnNullables();
        for (let el of vals) expect(mapFn(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a date as value', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(mapFn(el)).to.deep.equal({});
    });

    it ('return an empty object if passed an empty array as value', () => {
        expect(mapFn(new Array())).to.deep.equal({});
        expect(mapFn([])).to.deep.equal({});
    });

    it ('return an empty object if passed a function as value', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(mapFn(el)).to.deep.equal({});
    });

    //  Key sanity checks

    it ('return an empty object if passed a string as value', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(mapFn([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed a numeric as value', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(mapFn([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed a boolean as value', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(mapFn([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed a regex as value', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(mapFn([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed an object as value', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(mapFn([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed a nullable as value', () => {
        let vals = fnNullables();
        for (let el of vals) expect(mapFn([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed a date as value', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(mapFn([{foo: 'bar'}], el)).to.deep.equal({});
    });

    it ('return an empty object if passed an empty array as value', () => {
        expect(mapFn([{foo: 'bar'}], new Array())).to.deep.equal({});
        expect(mapFn([{foo: 'bar'}], [])).to.deep.equal({});
    });

});

describe("Array - MapPrimitive", () => {

    it ('should correctly map a numeric primitive array', () => {
        expect(mapPrimitive([1, 4, 5, 8, 4023])).to.deep.equal({
            1: 1,
            4: 4,
            5: 5,
            8: 8,
            4023: 4023
        });
    });

    it ('should correctly map a numeric primitive array, when passing a non-object options', () => {
        expect(mapPrimitive([1, 4, 5, 8, 4023], 'foo')).to.deep.equal({
            1: 1,
            4: 4,
            5: 5,
            8: 8,
            4023: 4023
        });
    });

    it ('should correctly map a numeric primitive array', () => {
        expect(mapPrimitive([1, 4, 5, 8, 4023])).to.deep.equal({
            1: 1,
            4: 4,
            5: 5,
            8: 8,
            4023: 4023
        });
    });

    it ('should correctly map a numeric primitive array and not autoround by default', () => {
        expect(mapPrimitive([1, 4, 5, 5.4, 8, 4023])).to.deep.equal({
            1: 1,
            4: 4,
            5: 5,
            '5.4': 5.4,
            8: 8,
            4023: 4023
        });
    });

    it ('should correctly map a numeric primitive array and autoround if asked', () => {
        expect(mapPrimitive([1, 4, 4.1, 5, 5.4, 8, 8.6, 4023], {keyround: true})).to.deep.equal({
            1: 1,
            4: 4.1,
            5: 5.4,
            8: 8,
            9: 8.6,
            4023: 4023
        });
    });

    it ('should correctly map a numeric primitive array and valround if asked', () => {
        expect(mapPrimitive([1, 4, 4.1, 5, 5.4, 8, 8.6, 4023], {valround: true})).to.deep.equal({
            1: 1,
            4: 4,
            '4.1': 4,
            5: 5,
            '5.4': 5,
            8: 8,
            '8.6': 9,
            4023: 4023
        });
    });

    it ('should correctly map a numeric primitive array and valround and keyround if asked', () => {
        expect(mapPrimitive([1, 4, 4.1, 5, 5.4, 8, 8.6, 4023], {valround: true, keyround: true})).to.deep.equal({
            1: 1,
            4: 4,
            5: 5,
            8: 8,
            9: 9,
            4023: 4023
        });
    });

    it ('should correctly map a string primitive array', () => {
        expect(mapPrimitive(['hello', 'foo', 'bar'])).to.deep.equal({
            'hello': 'hello',
            'foo': 'foo',
            'bar': 'bar'
        });
    });

    it ('should automatically trim strings for key storage when mapping a string primitive array', () => {
        expect(mapPrimitive(['  hello   ', ' foo', 'bar'])).to.deep.equal({
            'hello': '  hello   ',
            'foo': ' foo',
            'bar': 'bar'
        });
    });

    it ('should automatically trim strings for key storage and dedupe when mapping a string primitive array', () => {
        expect(mapPrimitive(['  hello   ', 'hello  ', ' foo', 'bar'])).to.deep.equal({
            'foo': ' foo',
            'bar': 'bar',
            'hello': 'hello  '
        });
    });

    it ('should allow turning off autotrimming strings for key storage and dedupe when mapping a string primitive array', () => {
        expect(mapPrimitive(['  hello   ', 'hello  ', ' foo', 'bar'], {keytrim: false})).to.deep.equal({
            '  hello   ': '  hello   ',
            'hello  ': 'hello  ',
            ' foo': ' foo',
            'bar': 'bar'
        });
    });

    it ('should allow turning off autotrimming and turning on value trimming and dedupe when mapping a string primitive array', () => {
        expect(mapPrimitive(['  hello   ', 'hello  ', ' foo', 'bar'], {keytrim: false, valtrim: true})).to.deep.equal({
            '  hello   ': 'hello',
            'hello  ': 'hello',
            ' foo': 'foo',
            'bar': 'bar'
        });
    });

    it ('should allow turning on value trimming and dedupe when mapping a string primitive array', () => {
        expect(mapPrimitive(['  hello   ', 'hello  ', ' foo', 'bar'], {valtrim: true})).to.deep.equal({
            'hello': 'hello',
            'foo': 'foo',
            'bar': 'bar'
        });
    });

    //  Value sanity checks

    it ('return an empty object if passed a string as value', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(mapPrimitive(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a numeric as value', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(mapPrimitive(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a boolean as value', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(mapPrimitive(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a regex as value', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(mapPrimitive(el)).to.deep.equal({});
    });

    it ('return an empty object if passed an object as value', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(mapPrimitive(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a nullable as value', () => {
        let vals = fnNullables();
        for (let el of vals) expect(mapPrimitive(el)).to.deep.equal({});
    });

    it ('return an empty object if passed a date as value', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(mapPrimitive(el)).to.deep.equal({});
    });

    it ('return an empty object if passed an empty array as value', () => {
        expect(mapPrimitive(new Array())).to.deep.equal({});
        expect(mapPrimitive([])).to.deep.equal({});
    });

    it ('return an empty object if passed a function as value', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(mapPrimitive(el)).to.deep.equal({});
    });
});

describe("Array - join", () => {

    it ('returns empty string when passing a string', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(join(el)).to.eql('');
    });

    it ('returns empty string when passing a numeric value', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(join(el)).to.eql('');
    });

    it ('returns empty string when passing a boolean', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(join(el)).to.eql('');
    });

    it ('returns empty string when passing a regex', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(join(el)).to.eql('');
    });

    it ('returns empty string when passing an object', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(join(el)).to.eql('');
    });

    it ('returns empty string when passing a nullable', () => {
        let vals = fnNullables();
        for (let el of vals) expect(join(el)).to.eql('');
    });

    it ('returns empty string when passing a date', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(join(el)).to.eql('');
    });

    it ('returns empty string when passing an empty aray', () => {
        expect(join([])).to.eql('');
    });

    it ('returns empty string when passing nothing', () => {
        expect(join()).to.eql('');
    });

    it ('returns empty string when passing a function', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(join(el)).to.eql('');
    });

    it ('returns empty string when passing an array containing no strings or numbers', () => {
        let vals = [
            ...fnNullables(),
            ...fnFunctionValues(),
            ...fnRegexValues(),
            ...fnArrayValues(),
            ...fnObjectValues(),
            ...fnBooleanValues(),
            ...fnDateValues(),
        ];
        expect(join(vals)).to.eql('');
    });

    it ('autotrims strings when joining by default', () => {
        let vals = [
            '   valkyrie ',
            '   studios  '
        ];
        expect(join(vals)).to.eql('valkyrie studios');
    });

    it ('does not autotrims strings when joining if option is turned off', () => {
        let vals = [
            '   valkyrie ',
            '   studios  '
        ];
        expect(join(vals, {valtrim: false})).to.eql('valkyrie     studios');
    });

    it ('does not autotrims strings when joining and after joining if option is turned off', () => {
        let vals = [
            '   valkyrie ',
            '   studios  '
        ];
        expect(join(vals, {valtrim: false, trim: false})).to.eql('   valkyrie     studios  ');
    });

    it ('allows you to override the delimiter with an empty string when joining with trimming turned off', () => {
        let vals = [
            '   valkyrie ',
            '   studios  '
        ];
        expect(join(vals, {delim: '', valtrim: false, trim: false})).to.eql('   valkyrie    studios  ');
    });

    it ('allows you to override the delimiter with an empty string when joining with trimming turned on', () => {
        let vals = [
            '   valkyrie ',
            '   studios  '
        ];
        expect(join(vals, {delim: ''})).to.eql('valkyriestudios');
    });

    it ('allows you to override the delimiter with a different string when joining with trimming turned on', () => {
        let vals = [
            '   valkyrie ',
            '   studios  '
        ];
        expect(join(vals, {delim: '@'})).to.eql('valkyrie@studios');
    });

    it ('allows you to join a mix of numbers and strings', () => {
        let vals = [
            '   valkyrie ',
            569.45,
            '   studios  ',
        ];
        expect(join(vals, {delim: '@'})).to.eql('valkyrie@569.45@studios');
    });

    it ('allows you to join a mix of numbers and strings and autoround to a certain precision', () => {
        let vals = [
            '   valkyrie ',
            569.45,
            '   studios  ',
        ];
        expect(join(vals, {delim: '@', valround: 0})).to.eql('valkyrie@569@studios');
        expect(join(vals, {delim: '@', valround: 1})).to.eql('valkyrie@569.5@studios');
        expect(join(vals, {delim: '@', valround: 2})).to.eql('valkyrie@569.45@studios');
        expect(join(vals, {delim: '@', valround: 3})).to.eql('valkyrie@569.45@studios');
    });

});

describe("Array - shuffle", () => {
    it ('does nothing and doesnt touch the passed variable when passed a string', () => {
        let vals = fnStringValues();
        for (let el of vals) {
            const el_copy = el;
            shuffle(el);
            expect(el).to.eql(el_copy);
        }
    });

    it ('does nothing and doesnt touch the passed variable when passed a numeric value', () => {
        let vals = fnNumericValues();
        for (let el of vals) {
            const el_copy = el;
            shuffle(el);
            expect(el).to.eql(el_copy);
        }
    });

    it ('does nothing and doesnt touch the passed variable when passed a boolean', () => {
        let vals = fnBooleanValues();
        for (let el of vals) {
            const el_copy = el;
            shuffle(el);
            expect(el).to.eql(el_copy);
        }
    });

    it ('does nothing and doesnt touch the passed variable when passed a regex', () => {
        let vals = fnRegexValues();
        for (let el of vals) {
            const el_copy = el;
            shuffle(el);
            expect(el).to.eql(el_copy);
        }
    });

    it ('does nothing and doesnt touch the passed variable when passed an object', () => {
        for (let el of [{bar:'foo'}, new Object(), Object.create(null)]) {
            const el_copy = Object.assign({}, el);
            shuffle(el);
            expect(el).to.deep.equal(el_copy);
        }
    });

    it ('does nothing and doesnt touch the passed variable when passed a nullable', () => {
        let vals = fnNullables();
        for (let el of vals) {
            const el_copy = el;
            shuffle(el_copy);
            expect(el).to.eql(el_copy);
        }
    });

    it ('does nothing and doesnt touch the passed variable when passed a date', () => {
        let vals = fnDateValues();
        for (let el of vals) {
            const el_copy = el;
            shuffle(el);
            expect(el).to.eql(el_copy);
        }
    });

    it ('does nothing and doesnt touch the passed variable when passed a function', () => {
        let vals = fnFunctionValues();
        for (let el of vals) {
            const el_copy = el;
            shuffle(el);
            expect(el).to.eql(el_copy);
        }
    });

    it ('does nothing and doesnt touch the passed variable when passed an empty array', () => {
        const el = [];
        shuffle(el);
        expect(el).to.deep.equal([]);
    });

    it ('Should shuffle an array of primitives (numbers)', () => {
        const el = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        shuffle(el);
        expect(el).to.not.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(el.length).to.eql(10);

        let map = {};
        for (const v of el) map[v] = v;
        expect(Object.values(map)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it ('Should shuffle an array of primitives (numbers) in a unique way (benchmark 100 shuffles with a 10 number array)', () => {
        let hashmap = {};
        for (let i = 0; i < 100; i++) {
            const el = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            shuffle(el);
            hashmap[fnv1A(el)] = el;
        }
        expect(Object.keys(hashmap).length).to.be.gt(90);
    });

    it ('Should shuffle an array of primitives (numbers) in a fast way (benchmark 1000000 shuffles with a 10 number array) in < 1sec', () => {
        let start_time = getTime();
        for (let x = 0; x < 1000000; x++) {
            shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        }
        expect(getTime() - start_time).to.be.lt(1000);
    });

    it ('Should shuffle an array of primitives (numbers) in a fast way (benchmark 100000 shuffles with a 100 number array) in < 1sec', () => {
        let start_time = getTime();
        let arr = [];
        for (let i = 1; i <= 100; i++) arr.push(i);
        for (let x = 0; x < 100000; x++) {
            shuffle(arr);
        }
        expect(getTime() - start_time).to.be.lt(1000);
    });

    it ('Should shuffle an array of primitives (strings) in a unique way (benchmark 100 shuffles with a 10 number array)', () => {
        let hashmap = {};
        for (let i = 0; i < 100; i++) {
            const el = [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie nisi interdum dui facilisis vestibulum. Cras et velit sodales, consectetur sem vitae, imperdiet tellus. Vivamus vulputate aliquam nunc non faucibus. Nunc eget enim sollicitudin, semper magna et, congue odio. Nullam sagittis condimentum sollicitudin. Vestibulum venenatis ullamcorper ligula, eu dapibus arcu aliquet a. Fusce eleifend non nulla vitae tempus. Integer varius libero vitae tincidunt volutpat. Praesent vitae velit mollis, tincidunt magna in, maximus ligula. Phasellus feugiat leo dolor, eget mattis justo condimentum luctus. Sed varius massa eget sagittis ultricies. Pellentesque maximus enim ultricies porta pellentesque. Quisque varius magna magna, quis accumsan odio venenatis in. Sed fringilla dapibus metus. Proin non feugiat metus. Nulla non neque tristique, pulvinar orci in, fermentum lacus.',
                'Phasellus pulvinar diam id commodo condimentum. Etiam at erat vel urna lobortis porta. Curabitur vulputate tellus a tellus feugiat luctus. Nulla sem turpis, placerat id arcu et, auctor rutrum sapien. Donec vehicula lacus nisi, vel bibendum lorem dapibus a. Quisque blandit nulla nec pretium bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus est, tincidunt ut nibh in, consectetur tristique sapien. Praesent feugiat purus quis enim condimentum, sit amet mattis sem cursus. Aenean sodales tortor justo, in ornare velit lobortis at. Fusce aliquam felis sed ligula dignissim, luctus malesuada ipsum dictum. Nulla pretium, tortor rhoncus auctor vehicula, nisi elit convallis orci, vel ultrices leo lacus quis ante. Integer viverra fringilla nunc, in dignissim felis aliquam non. Pellentesque nec viverra risus.',
                'Nunc eget placerat dolor. Integer lobortis eros ac interdum tincidunt. Maecenas vulputate tortor metus, quis fermentum nisi facilisis ut. Phasellus cursus quis ex ut finibus. Maecenas nulla lectus, rutrum eget efficitur sed, vestibulum rutrum ante. Donec rutrum efficitur orci, id ullamcorper ipsum dictum id. Vivamus eu felis at dolor malesuada pellentesque. Fusce sit amet nisi a dolor tempus laoreet. Phasellus vehicula odio vel efficitur auctor. Nam ac lacus condimentum sem vestibulum volutpat.',
                'Curabitur bibendum posuere arcu, a maximus nisl fringilla id. Proin aliquam aliquet neque id vestibulum. Sed efficitur felis in ullamcorper ultricies. Cras pharetra massa orci, id vestibulum ex molestie ac. Ut pretium mattis ante a pulvinar. Donec eu felis in nisi varius volutpat. Nam dignissim laoreet feugiat. Praesent sed lectus a enim tincidunt imperdiet sit amet at ante. Aliquam erat volutpat. Vestibulum non nisl id eros elementum eleifend a vel nulla. Pellentesque euismod vel est aliquam condimentum. Aliquam pellentesque orci odio, sit amet consequat magna luctus non.',
                'Donec vel lorem eget velit tristique varius. Curabitur sagittis odio magna, non molestie ligula egestas vel. Proin lobortis lorem sit amet mi malesuada, eu maximus augue vestibulum. Ut bibendum ullamcorper ipsum eget facilisis. Nulla maximus eleifend tempus. Phasellus eget pretium quam, id tempus nibh. Praesent tempor ultricies sapien ut tempus. Pellentesque at lorem enim. Donec mollis suscipit augue, in pulvinar tortor consectetur id. Integer commodo erat sed lorem ultricies euismod. Mauris eu porttitor ipsum. Integer id finibus enim. In eros purus, euismod facilisis vestibulum rhoncus, ornare et tellus.',
                'Sed vitae orci quis elit dapibus pharetra. Morbi sed tristique mi, et pulvinar odio. Nulla erat sem, vehicula in tincidunt lobortis, ultrices sed justo. Suspendisse hendrerit sed erat eget volutpat. Etiam nec nulla ex. Aliquam odio quam, mollis nec orci vitae, scelerisque vulputate mauris. Etiam elementum metus mi, vitae scelerisque urna dapibus sit amet. Vivamus sit amet tortor accumsan, ornare diam id, posuere erat. Mauris consequat, ligula quis faucibus suscipit, nisi mi consectetur sapien, at pretium nulla massa ut nulla. Vivamus vulputate aliquam ullamcorper. In consequat consectetur egestas. Praesent rutrum dolor at quam rutrum luctus.',
                'Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce aliquam nibh eget nisi varius, sed pellentesque sapien sagittis. Morbi sit amet lacus eget magna aliquam congue. Quisque sit amet nisl et justo sodales faucibus eu non massa. In non ornare ex, tristique ultrices quam. Suspendisse potenti. Fusce et mauris at sapien sodales iaculis.',
                'Mauris tristique auctor tincidunt. Nam sed elit ut metus suscipit suscipit vel in tortor. Maecenas enim tortor, dapibus non odio ac, volutpat venenatis nulla. Maecenas ac velit faucibus, eleifend magna non, elementum velit. Nullam sed urna at nisl iaculis sodales. Aenean porttitor purus purus, et ullamcorper dolor pretium sed. Proin tempor rutrum libero. Mauris faucibus, urna interdum laoreet dictum, lorem justo tristique metus, sed lobortis nisl tellus id nisi. Nullam vel lacus et lacus sagittis scelerisque ac non dui. Nulla nec augue urna. Curabitur consectetur turpis urna, non efficitur enim varius id. Vestibulum porta finibus nulla. Aenean enim est, eleifend quis arcu non, suscipit tincidunt diam.',
                'Sed neque velit, ullamcorper non neque eget, semper porttitor justo. Fusce faucibus augue rutrum, scelerisque eros vel, ornare diam. Donec a pulvinar velit. Morbi mattis ornare massa id aliquet. Morbi bibendum aliquet nunc eu consequat. Donec laoreet lectus in augue pulvinar viverra. Nunc id gravida arcu, id ornare massa. Integer interdum quam purus, eget semper purus placerat aliquet. Phasellus leo ex, semper sed urna a, maximus commodo lacus. Sed et semper nulla. Pellentesque sed tempor tellus. Etiam facilisis nunc at tellus commodo, id ullamcorper purus interdum. Morbi lectus enim, venenatis id metus ut, commodo pulvinar metus.',
                'Cras sit amet nisl non libero pellentesque maximus. Sed sed lacus quam. Maecenas ultricies dui nulla, sed tempor magna viverra at. Morbi a risus egestas, congue mi eu, vestibulum sem. Vestibulum viverra elit libero, eu faucibus lectus hendrerit ac. Praesent auctor ullamcorper massa, sed aliquam metus fermentum non. Morbi lacinia finibus lorem quis suscipit. Aliquam erat volutpat. Morbi tincidunt nec nunc at consequat. Nulla porta et tellus id ornare.',
            ];
            shuffle(el);
            hashmap[fnv1A(el)] = el;
        }
        expect(Object.keys(hashmap).length).to.be.gt(90);
    });

    it ('Should shuffle an array of primitives (strings) in a fast way (benchmark 1000000 shuffles with a 10 string array) in < 1sec', () => {
        let start_time = getTime();
        for (let x = 0; x < 1000000; x++) {
            shuffle([
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie nisi interdum dui facilisis vestibulum. Cras et velit sodales, consectetur sem vitae, imperdiet tellus. Vivamus vulputate aliquam nunc non faucibus. Nunc eget enim sollicitudin, semper magna et, congue odio. Nullam sagittis condimentum sollicitudin. Vestibulum venenatis ullamcorper ligula, eu dapibus arcu aliquet a. Fusce eleifend non nulla vitae tempus. Integer varius libero vitae tincidunt volutpat. Praesent vitae velit mollis, tincidunt magna in, maximus ligula. Phasellus feugiat leo dolor, eget mattis justo condimentum luctus. Sed varius massa eget sagittis ultricies. Pellentesque maximus enim ultricies porta pellentesque. Quisque varius magna magna, quis accumsan odio venenatis in. Sed fringilla dapibus metus. Proin non feugiat metus. Nulla non neque tristique, pulvinar orci in, fermentum lacus.',
                'Phasellus pulvinar diam id commodo condimentum. Etiam at erat vel urna lobortis porta. Curabitur vulputate tellus a tellus feugiat luctus. Nulla sem turpis, placerat id arcu et, auctor rutrum sapien. Donec vehicula lacus nisi, vel bibendum lorem dapibus a. Quisque blandit nulla nec pretium bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus est, tincidunt ut nibh in, consectetur tristique sapien. Praesent feugiat purus quis enim condimentum, sit amet mattis sem cursus. Aenean sodales tortor justo, in ornare velit lobortis at. Fusce aliquam felis sed ligula dignissim, luctus malesuada ipsum dictum. Nulla pretium, tortor rhoncus auctor vehicula, nisi elit convallis orci, vel ultrices leo lacus quis ante. Integer viverra fringilla nunc, in dignissim felis aliquam non. Pellentesque nec viverra risus.',
                'Nunc eget placerat dolor. Integer lobortis eros ac interdum tincidunt. Maecenas vulputate tortor metus, quis fermentum nisi facilisis ut. Phasellus cursus quis ex ut finibus. Maecenas nulla lectus, rutrum eget efficitur sed, vestibulum rutrum ante. Donec rutrum efficitur orci, id ullamcorper ipsum dictum id. Vivamus eu felis at dolor malesuada pellentesque. Fusce sit amet nisi a dolor tempus laoreet. Phasellus vehicula odio vel efficitur auctor. Nam ac lacus condimentum sem vestibulum volutpat.',
                'Curabitur bibendum posuere arcu, a maximus nisl fringilla id. Proin aliquam aliquet neque id vestibulum. Sed efficitur felis in ullamcorper ultricies. Cras pharetra massa orci, id vestibulum ex molestie ac. Ut pretium mattis ante a pulvinar. Donec eu felis in nisi varius volutpat. Nam dignissim laoreet feugiat. Praesent sed lectus a enim tincidunt imperdiet sit amet at ante. Aliquam erat volutpat. Vestibulum non nisl id eros elementum eleifend a vel nulla. Pellentesque euismod vel est aliquam condimentum. Aliquam pellentesque orci odio, sit amet consequat magna luctus non.',
                'Donec vel lorem eget velit tristique varius. Curabitur sagittis odio magna, non molestie ligula egestas vel. Proin lobortis lorem sit amet mi malesuada, eu maximus augue vestibulum. Ut bibendum ullamcorper ipsum eget facilisis. Nulla maximus eleifend tempus. Phasellus eget pretium quam, id tempus nibh. Praesent tempor ultricies sapien ut tempus. Pellentesque at lorem enim. Donec mollis suscipit augue, in pulvinar tortor consectetur id. Integer commodo erat sed lorem ultricies euismod. Mauris eu porttitor ipsum. Integer id finibus enim. In eros purus, euismod facilisis vestibulum rhoncus, ornare et tellus.',
                'Sed vitae orci quis elit dapibus pharetra. Morbi sed tristique mi, et pulvinar odio. Nulla erat sem, vehicula in tincidunt lobortis, ultrices sed justo. Suspendisse hendrerit sed erat eget volutpat. Etiam nec nulla ex. Aliquam odio quam, mollis nec orci vitae, scelerisque vulputate mauris. Etiam elementum metus mi, vitae scelerisque urna dapibus sit amet. Vivamus sit amet tortor accumsan, ornare diam id, posuere erat. Mauris consequat, ligula quis faucibus suscipit, nisi mi consectetur sapien, at pretium nulla massa ut nulla. Vivamus vulputate aliquam ullamcorper. In consequat consectetur egestas. Praesent rutrum dolor at quam rutrum luctus.',
                'Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce aliquam nibh eget nisi varius, sed pellentesque sapien sagittis. Morbi sit amet lacus eget magna aliquam congue. Quisque sit amet nisl et justo sodales faucibus eu non massa. In non ornare ex, tristique ultrices quam. Suspendisse potenti. Fusce et mauris at sapien sodales iaculis.',
                'Mauris tristique auctor tincidunt. Nam sed elit ut metus suscipit suscipit vel in tortor. Maecenas enim tortor, dapibus non odio ac, volutpat venenatis nulla. Maecenas ac velit faucibus, eleifend magna non, elementum velit. Nullam sed urna at nisl iaculis sodales. Aenean porttitor purus purus, et ullamcorper dolor pretium sed. Proin tempor rutrum libero. Mauris faucibus, urna interdum laoreet dictum, lorem justo tristique metus, sed lobortis nisl tellus id nisi. Nullam vel lacus et lacus sagittis scelerisque ac non dui. Nulla nec augue urna. Curabitur consectetur turpis urna, non efficitur enim varius id. Vestibulum porta finibus nulla. Aenean enim est, eleifend quis arcu non, suscipit tincidunt diam.',
                'Sed neque velit, ullamcorper non neque eget, semper porttitor justo. Fusce faucibus augue rutrum, scelerisque eros vel, ornare diam. Donec a pulvinar velit. Morbi mattis ornare massa id aliquet. Morbi bibendum aliquet nunc eu consequat. Donec laoreet lectus in augue pulvinar viverra. Nunc id gravida arcu, id ornare massa. Integer interdum quam purus, eget semper purus placerat aliquet. Phasellus leo ex, semper sed urna a, maximus commodo lacus. Sed et semper nulla. Pellentesque sed tempor tellus. Etiam facilisis nunc at tellus commodo, id ullamcorper purus interdum. Morbi lectus enim, venenatis id metus ut, commodo pulvinar metus.',
                'Cras sit amet nisl non libero pellentesque maximus. Sed sed lacus quam. Maecenas ultricies dui nulla, sed tempor magna viverra at. Morbi a risus egestas, congue mi eu, vestibulum sem. Vestibulum viverra elit libero, eu faucibus lectus hendrerit ac. Praesent auctor ullamcorper massa, sed aliquam metus fermentum non. Morbi lacinia finibus lorem quis suscipit. Aliquam erat volutpat. Morbi tincidunt nec nunc at consequat. Nulla porta et tellus id ornare.',
            ]);
        }
        expect(getTime() - start_time).to.be.lt(1000);
    });

    it ('Should shuffle an array of primitives (strings) in a fast way (benchmark 100000 shuffles with a 100 string array) in < 1sec', () => {
        let start_time = getTime();
        for (let x = 0; x < 100000; x++) {
            shuffle([
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie nisi interdum dui facilisis vestibulum. Cras et velit sodales, consectetur sem vitae, imperdiet tellus. Vivamus vulputate aliquam nunc non faucibus. Nunc eget enim sollicitudin, semper magna et, congue odio. Nullam sagittis condimentum sollicitudin. Vestibulum venenatis ullamcorper ligula, eu dapibus arcu aliquet a. Fusce eleifend non nulla vitae tempus. Integer varius libero vitae tincidunt volutpat. Praesent vitae velit mollis, tincidunt magna in, maximus ligula. Phasellus feugiat leo dolor, eget mattis justo condimentum luctus. Sed varius massa eget sagittis ultricies. Pellentesque maximus enim ultricies porta pellentesque. Quisque varius magna magna, quis accumsan odio venenatis in. Sed fringilla dapibus metus. Proin non feugiat metus. Nulla non neque tristique, pulvinar orci in, fermentum lacus.',
                'Phasellus pulvinar diam id commodo condimentum. Etiam at erat vel urna lobortis porta. Curabitur vulputate tellus a tellus feugiat luctus. Nulla sem turpis, placerat id arcu et, auctor rutrum sapien. Donec vehicula lacus nisi, vel bibendum lorem dapibus a. Quisque blandit nulla nec pretium bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus est, tincidunt ut nibh in, consectetur tristique sapien. Praesent feugiat purus quis enim condimentum, sit amet mattis sem cursus. Aenean sodales tortor justo, in ornare velit lobortis at. Fusce aliquam felis sed ligula dignissim, luctus malesuada ipsum dictum. Nulla pretium, tortor rhoncus auctor vehicula, nisi elit convallis orci, vel ultrices leo lacus quis ante. Integer viverra fringilla nunc, in dignissim felis aliquam non. Pellentesque nec viverra risus.',
                'Nunc eget placerat dolor. Integer lobortis eros ac interdum tincidunt. Maecenas vulputate tortor metus, quis fermentum nisi facilisis ut. Phasellus cursus quis ex ut finibus. Maecenas nulla lectus, rutrum eget efficitur sed, vestibulum rutrum ante. Donec rutrum efficitur orci, id ullamcorper ipsum dictum id. Vivamus eu felis at dolor malesuada pellentesque. Fusce sit amet nisi a dolor tempus laoreet. Phasellus vehicula odio vel efficitur auctor. Nam ac lacus condimentum sem vestibulum volutpat.',
                'Curabitur bibendum posuere arcu, a maximus nisl fringilla id. Proin aliquam aliquet neque id vestibulum. Sed efficitur felis in ullamcorper ultricies. Cras pharetra massa orci, id vestibulum ex molestie ac. Ut pretium mattis ante a pulvinar. Donec eu felis in nisi varius volutpat. Nam dignissim laoreet feugiat. Praesent sed lectus a enim tincidunt imperdiet sit amet at ante. Aliquam erat volutpat. Vestibulum non nisl id eros elementum eleifend a vel nulla. Pellentesque euismod vel est aliquam condimentum. Aliquam pellentesque orci odio, sit amet consequat magna luctus non.',
                'Donec vel lorem eget velit tristique varius. Curabitur sagittis odio magna, non molestie ligula egestas vel. Proin lobortis lorem sit amet mi malesuada, eu maximus augue vestibulum. Ut bibendum ullamcorper ipsum eget facilisis. Nulla maximus eleifend tempus. Phasellus eget pretium quam, id tempus nibh. Praesent tempor ultricies sapien ut tempus. Pellentesque at lorem enim. Donec mollis suscipit augue, in pulvinar tortor consectetur id. Integer commodo erat sed lorem ultricies euismod. Mauris eu porttitor ipsum. Integer id finibus enim. In eros purus, euismod facilisis vestibulum rhoncus, ornare et tellus.',
                'Sed vitae orci quis elit dapibus pharetra. Morbi sed tristique mi, et pulvinar odio. Nulla erat sem, vehicula in tincidunt lobortis, ultrices sed justo. Suspendisse hendrerit sed erat eget volutpat. Etiam nec nulla ex. Aliquam odio quam, mollis nec orci vitae, scelerisque vulputate mauris. Etiam elementum metus mi, vitae scelerisque urna dapibus sit amet. Vivamus sit amet tortor accumsan, ornare diam id, posuere erat. Mauris consequat, ligula quis faucibus suscipit, nisi mi consectetur sapien, at pretium nulla massa ut nulla. Vivamus vulputate aliquam ullamcorper. In consequat consectetur egestas. Praesent rutrum dolor at quam rutrum luctus.',
                'Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce aliquam nibh eget nisi varius, sed pellentesque sapien sagittis. Morbi sit amet lacus eget magna aliquam congue. Quisque sit amet nisl et justo sodales faucibus eu non massa. In non ornare ex, tristique ultrices quam. Suspendisse potenti. Fusce et mauris at sapien sodales iaculis.',
                'Mauris tristique auctor tincidunt. Nam sed elit ut metus suscipit suscipit vel in tortor. Maecenas enim tortor, dapibus non odio ac, volutpat venenatis nulla. Maecenas ac velit faucibus, eleifend magna non, elementum velit. Nullam sed urna at nisl iaculis sodales. Aenean porttitor purus purus, et ullamcorper dolor pretium sed. Proin tempor rutrum libero. Mauris faucibus, urna interdum laoreet dictum, lorem justo tristique metus, sed lobortis nisl tellus id nisi. Nullam vel lacus et lacus sagittis scelerisque ac non dui. Nulla nec augue urna. Curabitur consectetur turpis urna, non efficitur enim varius id. Vestibulum porta finibus nulla. Aenean enim est, eleifend quis arcu non, suscipit tincidunt diam.',
                'Sed neque velit, ullamcorper non neque eget, semper porttitor justo. Fusce faucibus augue rutrum, scelerisque eros vel, ornare diam. Donec a pulvinar velit. Morbi mattis ornare massa id aliquet. Morbi bibendum aliquet nunc eu consequat. Donec laoreet lectus in augue pulvinar viverra. Nunc id gravida arcu, id ornare massa. Integer interdum quam purus, eget semper purus placerat aliquet. Phasellus leo ex, semper sed urna a, maximus commodo lacus. Sed et semper nulla. Pellentesque sed tempor tellus. Etiam facilisis nunc at tellus commodo, id ullamcorper purus interdum. Morbi lectus enim, venenatis id metus ut, commodo pulvinar metus.',
                'Cras sit amet nisl non libero pellentesque maximus. Sed sed lacus quam. Maecenas ultricies dui nulla, sed tempor magna viverra at. Morbi a risus egestas, congue mi eu, vestibulum sem. Vestibulum viverra elit libero, eu faucibus lectus hendrerit ac. Praesent auctor ullamcorper massa, sed aliquam metus fermentum non. Morbi lacinia finibus lorem quis suscipit. Aliquam erat volutpat. Morbi tincidunt nec nunc at consequat. Nulla porta et tellus id ornare.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dolor sed enim eleifend molestie vel nec diam. Mauris quis mi eu eros euismod varius. Quisque eu justo ac quam aliquet malesuada eu ut purus. Praesent commodo nulla vitae ligula facilisis laoreet et ut enim. Phasellus sit amet scelerisque velit. Vivamus sit amet elit et massa molestie faucibus. Praesent in leo ultricies, venenatis tellus nec, consectetur tortor. Duis sit amet ex ante. Donec eget augue porttitor, consequat diam quis, mollis est. Aenean ac elit et metus rutrum sodales quis ac ligula. Quisque vehicula mollis metus.',
                'Nunc vitae orci eget massa convallis interdum quis non dui. Nam dui felis, finibus ac cursus id, lacinia sed ante. Fusce aliquet malesuada ex, id venenatis velit bibendum a. Suspendisse posuere ultrices massa, suscipit ultrices ex sollicitudin vel. Pellentesque imperdiet ullamcorper bibendum. Aliquam fermentum ligula a vulputate porttitor. Nulla facilisi. Donec quis libero et ex interdum auctor vitae ut ante. Ut laoreet turpis ac lorem cursus euismod. Nunc at aliquet massa.',
                'Integer dictum metus vitae odio dapibus interdum. Suspendisse tincidunt nec ligula sit amet dapibus. Maecenas eget pharetra nisi, sed semper libero. Morbi at interdum ligula. In facilisis neque at ipsum mollis, vitae aliquam lectus consectetur. Sed ac urna condimentum, ultricies ante sit amet, mollis enim. Nam laoreet tempus tristique. Suspendisse ut quam id arcu finibus tincidunt. Donec placerat, sem luctus scelerisque cursus, metus nisl maximus nibh, a sollicitudin velit neque maximus odio. Morbi tempus placerat diam, in sollicitudin velit. Phasellus hendrerit urna sem, vel mattis odio mattis at. Aenean iaculis dui fermentum dignissim vehicula. Etiam congue dolor id rhoncus iaculis.',
                'Cras euismod dolor a elit tempus feugiat. Nullam tincidunt ipsum scelerisque ligula ullamcorper, sed convallis metus condimentum. In sed ipsum tempus, feugiat dolor aliquam, iaculis felis. Pellentesque lectus nibh, egestas a ligula at, gravida dictum tortor. In blandit tellus in ex hendrerit, ut elementum sapien faucibus. Curabitur arcu risus, imperdiet mattis cursus at, molestie in orci. Quisque gravida cursus nisl, vitae laoreet nisi pellentesque sed. Quisque venenatis, est vel vehicula auctor, ex ex placerat diam, vitae pretium libero sapien nec magna. Pellentesque odio libero, interdum sed felis vitae, molestie laoreet magna.',
                'Vestibulum enim eros, dignissim id velit eu, dignissim consectetur nibh. Phasellus diam augue, hendrerit vel facilisis vitae, pharetra ut dui. In euismod eu mi nec interdum. Donec cursus at libero quis dapibus. Ut vitae metus sed nisi cursus lobortis a ut libero. Sed pulvinar dui a tortor elementum, nec molestie lectus convallis. Aliquam imperdiet libero sed gravida condimentum. Fusce augue sem, suscipit ac sapien rutrum, porttitor accumsan lectus. Mauris nec urna dui. Donec tempus sodales nisi a tempor. Praesent at dui purus.',
                'Nulla varius risus sed neque pretium, in molestie felis ornare. Fusce at justo a ex vehicula sagittis vel eget augue. Nulla facilisi. Maecenas non metus nec justo pharetra venenatis quis non quam. Sed dictum aliquam ipsum, vitae bibendum nisl. Vestibulum eu arcu aliquam, venenatis justo nec, venenatis arcu. Phasellus fermentum arcu ex, eu dictum leo ullamcorper eget. Aliquam erat volutpat. Nullam felis ante, posuere sit amet viverra ac, consequat ac dolor. Phasellus ornare consectetur egestas. Quisque fringilla lorem vitae est fringilla, a feugiat diam vestibulum. Morbi molestie tempor orci. Praesent facilisis hendrerit ex, non pretium turpis. Phasellus ullamcorper turpis quis tincidunt vulputate. Sed sagittis, dui in fringilla hendrerit, dui ante dictum mi, eu feugiat diam diam ac mauris.',
                'Pellentesque ac suscipit dolor. Fusce a tempor elit, eu ornare mi. Vestibulum tristique vestibulum dui luctus pulvinar. Duis sed ligula dictum, consectetur lacus eget, facilisis sem. Quisque a ipsum eu massa faucibus gravida. Quisque malesuada elit quis ipsum iaculis volutpat. Donec nec ultrices arcu. Sed gravida, purus ac efficitur sagittis, nunc sapien sollicitudin orci, eu luctus ante odio in est. Sed tincidunt, massa vel rutrum sagittis, risus turpis elementum ante, sed feugiat magna mi lobortis tellus. Donec eleifend efficitur mi vel eleifend. Integer libero orci, commodo et eros eget, bibendum efficitur sem. Vestibulum tristique dictum dolor at luctus. Pellentesque placerat leo urna, id interdum magna consectetur vitae. In sollicitudin velit eu orci ultricies, sit amet porta arcu efficitur. Nulla sed sapien quis libero ullamcorper elementum ac non orci. Maecenas egestas commodo varius.',
                'Cras tempor aliquam metus, non gravida tellus auctor ac. Phasellus quis hendrerit mauris. Duis non ligula facilisis, porta tortor at, hendrerit felis. Vestibulum sit amet venenatis nibh. Aenean arcu urna, tristique non sapien quis, tempor congue risus. Phasellus consectetur, nisl rhoncus hendrerit laoreet, enim eros maximus ipsum, eu laoreet nibh urna ac ante. Integer tincidunt sed arcu vel dapibus. Donec convallis enim vitae est luctus, id tempor magna consectetur. Aliquam erat volutpat. Morbi vehicula luctus sem id ultrices.',
                'Phasellus odio eros, posuere ac lorem quis, gravida accumsan metus. Morbi mollis faucibus ornare. In vitae odio lectus. Morbi ut dui volutpat nisi blandit placerat eget lobortis nulla. Duis eleifend pharetra sapien facilisis facilisis. Praesent tempor at nisi ac elementum. Sed efficitur turpis vitae metus volutpat blandit.',
                'Pellentesque id mauris vel est pellentesque aliquam. Proin vulputate metus vel augue egestas, sit amet auctor est maximus. Cras pretium malesuada tincidunt. Maecenas consectetur augue justo, et malesuada mauris mattis a. Aenean eu tincidunt enim. Cras quis urna mattis, commodo est eget, pellentesque neque. Fusce eget maximus felis. Sed at nisi vel tortor vulputate tempus sodales malesuada dui. Sed lectus massa, vulputate volutpat vestibulum ac, vestibulum id dui. Sed in lacus vitae nisl porttitor pulvinar. Fusce vel enim a eros ornare vulputate. In tincidunt ornare mauris non malesuada. Suspendisse varius enim nec mattis laoreet. Proin scelerisque magna in felis feugiat tempus.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida arcu nibh, vitae porttitor tellus commodo at. Vivamus id orci volutpat, aliquet leo ut, faucibus nisi. Vivamus consectetur lacinia orci, ut vestibulum lacus congue ac. Integer convallis semper vehicula. Aliquam ut nunc ipsum. Mauris facilisis luctus tellus sit amet vulputate. In ut neque at quam varius maximus. Aenean quis est venenatis, suscipit justo eget, pretium diam. Donec auctor tortor ornare dolor porttitor, scelerisque blandit ante tempor. Donec sit amet convallis ex. Nulla luctus, neque tristique aliquam gravida, enim tortor ullamcorper est, nec gravida purus nisl et erat. Duis ut risus augue.',
                'Integer efficitur odio convallis, tincidunt risus et, lobortis magna. Etiam nec tortor dolor. Etiam varius leo eget dapibus porttitor. Duis varius mattis purus. Integer et urna ultrices, porta sapien sed, viverra diam. Maecenas at eros convallis, rhoncus tellus ut, semper nibh. Donec quis neque libero. Vestibulum aliquet neque a leo rhoncus, eu tempus lorem pulvinar. Etiam in nunc consectetur, scelerisque dui sit amet, dictum turpis. In aliquet lacus nec lorem vestibulum dapibus. Sed auctor, erat eu efficitur rutrum, augue neque rutrum justo, pretium ultricies mauris quam nec arcu. Sed non lacinia tellus. Donec malesuada, mi at pretium vulputate, tellus sapien sagittis massa, tincidunt aliquam ante massa quis sapien. Suspendisse potenti.',
                'Donec et luctus est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque metus augue, pharetra sit amet vestibulum vitae, bibendum vel sapien. Phasellus eros risus, rutrum at eleifend at, rhoncus ut leo. Donec ac luctus urna. Nullam elementum id turpis et venenatis. Praesent convallis leo et augue mollis facilisis. Nulla facilisi. Phasellus metus nunc, mattis quis metus sit amet, aliquet consectetur sapien. Aliquam et porttitor erat. Aenean condimentum malesuada magna, in pretium tortor luctus at. In sit amet gravida tellus. Maecenas vel arcu convallis, placerat magna mattis, blandit leo. Phasellus blandit turpis ac dolor ornare auctor.',
                'Nam dictum leo risus, et ultrices nibh venenatis non. Suspendisse fermentum ullamcorper convallis. Sed pharetra metus a ipsum pellentesque, id ullamcorper erat vestibulum. Ut nec est tellus. Cras sollicitudin sagittis ullamcorper. Vestibulum laoreet commodo lobortis. Donec et sapien eu mauris porttitor tempor. Curabitur efficitur sollicitudin porta. Pellentesque ac feugiat lacus, sed consequat leo. Phasellus euismod ante at mauris vehicula, in sollicitudin velit lobortis. Praesent lobortis mollis molestie. Integer leo dui, rhoncus ut posuere sit amet, volutpat at velit. Quisque ornare maximus lacinia.',
                'Vestibulum mollis turpis mi, ut scelerisque ligula elementum quis. Ut vitae dolor auctor, pretium lacus at, hendrerit libero. Praesent consequat quis ipsum ut dapibus. Nullam varius consequat risus sed dapibus. Ut suscipit diam velit, a euismod orci sagittis eget. Morbi mollis bibendum mi, eget porttitor nunc hendrerit nec. Phasellus id dui at quam consequat lobortis. Nunc at nunc imperdiet, ultrices nunc vel, feugiat dui. Mauris ut interdum nisi, luctus iaculis justo.',
                'Pellentesque tincidunt facilisis purus vel lobortis. Donec ut aliquam lacus, sit amet pretium tortor. Pellentesque sed libero eu ligula suscipit aliquet et eget metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc tortor mi, dignissim quis elit quis, lobortis semper ipsum. Aliquam erat volutpat. Donec facilisis vestibulum cursus. Maecenas est eros, bibendum at aliquet sed, dignissim quis nisl. Cras at diam malesuada, rhoncus orci sed, ultricies massa.',
                'Sed sed tincidunt lacus. Ut pulvinar faucibus arcu et mollis. Praesent fringilla neque et erat faucibus, dictum lacinia mauris fermentum. Vivamus venenatis, purus eget pretium rutrum, sapien neque auctor ante, in viverra mauris erat rhoncus lectus. Vivamus eu orci fermentum, molestie ipsum eget, consequat libero. Vivamus metus ante, auctor eu consectetur sit amet, ultrices nec mi. Sed at mauris vitae eros dapibus laoreet id quis metus. Mauris dignissim justo non lorem placerat sodales. Suspendisse tincidunt libero sit amet quam dapibus venenatis. Nam sit amet dui eget est tincidunt tempor. Morbi elementum, diam ut maximus bibendum, augue arcu pellentesque mi, nec tempor nisl augue commodo urna.',
                'Integer arcu ante, tincidunt sit amet justo ut, dapibus interdum massa. Mauris malesuada malesuada est, id congue sem venenatis sed. Curabitur laoreet interdum tellus at finibus. Aliquam ut tristique justo, eget accumsan nisi. Sed vehicula ac leo suscipit sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac nulla magna. Nullam accumsan efficitur erat, a mollis erat egestas id. Sed ut sem pulvinar, pretium neque et, aliquet lectus. In luctus euismod massa vel gravida. Ut at ligula sapien. Ut placerat ullamcorper facilisis. Sed in finibus enim. Maecenas lacus libero, mattis ut placerat vitae, varius quis mauris. Proin at sem eget metus fermentum tempor rutrum at lorem. Ut consectetur convallis metus, a commodo erat luctus vel.',
                'Cras lorem ante, accumsan id ultricies quis, gravida ac nibh. Donec pharetra suscipit velit vitae sollicitudin. Nunc egestas vel velit a sodales. Duis a felis congue, porta nunc nec, convallis massa. Vestibulum tempor ante nisl. Nam tortor velit, mattis at quam quis, facilisis auctor dui. Maecenas eget elit vel libero maximus tincidunt sed sed ligula. Cras finibus nibh laoreet ante elementum, sed fringilla sapien ornare.',
                'Etiam vel ex at erat elementum mollis. Mauris justo felis, tincidunt in enim eget, gravida venenatis ex. Donec suscipit est ut dolor bibendum, in molestie diam interdum. Mauris commodo urna nec purus suscipit, vel condimentum dolor euismod. Nunc dapibus ante eget enim commodo, vel mattis odio rutrum. Praesent vehicula erat a tempor hendrerit. Aenean tempus vitae sem vitae ultricies. Proin congue elementum pulvinar. Nam sed pulvinar elit, at tincidunt arcu. Nullam a convallis odio. Curabitur mattis eros leo, sit amet venenatis velit consectetur a. Fusce tristique eu velit interdum tempus. Pellentesque id rhoncus nisi, sed vestibulum massa. Pellentesque dignissim facilisis justo vitae ornare.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate massa nec lobortis tristique. Quisque vitae commodo dolor. Nunc quis iaculis arcu. Ut lorem massa, accumsan ac erat ut, commodo fermentum lacus. Aenean quis porta libero. Sed mi ante, commodo at arcu ac, rhoncus cursus nisi. Quisque cursus ante nec tellus commodo egestas. Vivamus rutrum metus quis luctus malesuada.',
                'Proin vitae dolor interdum, tincidunt erat in, fringilla lacus. Aenean eleifend aliquet diam, porta ultricies nulla vehicula vel. Mauris posuere facilisis ultrices. Phasellus tempor tortor et tincidunt volutpat. Pellentesque sed libero non orci porta placerat et vitae metus. Etiam facilisis nulla sit amet ante condimentum, quis dictum enim efficitur. Integer eleifend massa eu nunc commodo pellentesque. Phasellus iaculis vel risus sed congue. Donec tempus ex eu lectus bibendum, consequat hendrerit purus elementum. Quisque mattis ante tempus ornare placerat. Suspendisse consectetur gravida est, id finibus nisi porttitor hendrerit. Sed nec consequat nibh, quis molestie nisi. Nunc vitae nulla magna. Curabitur semper, magna in sagittis ullamcorper, nisl lectus rhoncus tortor, ut dignissim quam odio ut lacus.',
                'Pellentesque eget scelerisque lectus, vehicula maximus mi. Curabitur convallis odio at viverra pulvinar. Phasellus viverra nibh dolor, id egestas nisi ultrices consectetur. Etiam sed ornare dolor, id condimentum massa. Nullam ut purus vitae lacus iaculis gravida a id mauris. Aliquam posuere eget felis eu aliquam. Cras dictum odio magna, sit amet tincidunt magna interdum eu. Aliquam rutrum maximus scelerisque. Morbi ac dignissim quam. Nulla lectus lectus, vulputate eget varius vel, dignissim quis ante. Duis odio nisl, volutpat vitae lacus eu, vehicula aliquet metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eu nibh ut eros consectetur fermentum at ac libero. Nulla luctus urna eget dictum feugiat. Proin mi felis, tempus elementum convallis nec, elementum quis sapien.',
                'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi quis elit risus. Curabitur vulputate mattis maximus. Proin laoreet placerat consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In non erat nisl. Fusce quis bibendum lorem, et hendrerit turpis. Quisque convallis tellus arcu, id congue risus lacinia a. Ut et elit sit amet magna pharetra fringilla. Vivamus interdum diam ut sagittis tristique.',
                'Sed quis eros nec augue volutpat imperdiet non id neque. Cras volutpat condimentum purus vel convallis. Etiam posuere cursus sapien, nec posuere sapien vestibulum id. Fusce id condimentum dui. Maecenas eu ullamcorper enim, vitae laoreet ipsum. Vivamus ligula lacus, elementum lacinia dapibus a, fermentum nec velit. Curabitur varius tincidunt enim, et porta magna suscipit viverra.',
                'Nullam viverra arcu id porta consequat. Donec blandit quis lacus eget mollis. In nec eros tellus. Mauris consequat orci ipsum. Phasellus ac arcu cursus, posuere neque in, rutrum diam. Curabitur vulputate ipsum in nisl imperdiet interdum. Nullam viverra arcu eget odio volutpat, quis eleifend magna accumsan. Curabitur lorem massa, porta at purus ac, pellentesque pretium lacus. Suspendisse sed sapien pharetra, eleifend velit pretium, posuere dolor. Etiam nisl erat, ultrices nec vulputate vitae, commodo vel tellus. Praesent at nulla diam. Morbi tristique ipsum urna.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id vulputate ipsum, vitae sollicitudin arcu. Duis id congue nisl. Curabitur lacus est, condimentum nec leo euismod, pharetra placerat sem. Donec rhoncus molestie risus in blandit. Suspendisse non libero ultrices, facilisis mi a, dignissim sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur nisl nisi, condimentum et pellentesque id, rutrum sit amet orci. Suspendisse potenti. In volutpat, arcu sit amet tristique gravida, mi augue malesuada ante, at faucibus elit eros a nisi. Sed sed tincidunt turpis.',
                'Nullam tincidunt ligula eget enim accumsan, a varius est semper. Mauris porttitor facilisis porta. Integer a purus porta enim fermentum interdum at ac metus. Vivamus eu faucibus nisi. Etiam in arcu vitae sapien blandit consequat. Cras quis ultrices dolor. Fusce sollicitudin sagittis felis, ut lobortis ante maximus eget. Etiam tempus metus et pellentesque ultricies. Fusce ut consectetur turpis, quis aliquam metus. Donec tempus ut ligula ac luctus.',
                'Etiam rhoncus et ex non molestie. Vivamus laoreet magna id magna pretium mollis. Duis dui odio, maximus in viverra vel, rhoncus sit amet nisi. Ut malesuada ipsum et diam tempor, vitae maximus lectus semper. Vivamus non mauris et magna ullamcorper pellentesque. Aliquam tempus ligula pharetra, mattis orci a, eleifend dolor. Pellentesque iaculis diam sit amet fermentum tristique. Suspendisse tincidunt lectus id turpis pulvinar finibus. Donec eget sollicitudin arcu.',
                'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce molestie turpis nec eros elementum, convallis varius dolor ullamcorper. Vestibulum id vestibulum diam, nec molestie dui. Pellentesque et augue mattis, tristique diam vel, tempor sapien. Nam ultricies, odio vel tincidunt finibus, enim eros porta ex, eget pharetra sem lacus in nisi. Proin feugiat sodales porta. Fusce mauris odio, sodales sit amet metus sed, aliquam vulputate justo. Nullam et vestibulum urna, in interdum sem.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cursus massa eros, vitae suscipit felis ultricies nec. Nam convallis fringilla pharetra. Nunc sed leo felis. Aliquam aliquet magna quis nisl mollis, et rutrum mauris pharetra. Suspendisse id tortor vitae sapien varius blandit non sit amet leo. Proin vel orci in quam blandit pellentesque. Nulla facilisi.',
                'Vestibulum eu auctor dui. Duis porttitor dolor et mauris tincidunt lacinia. Duis sapien velit, laoreet a finibus vel, varius et tellus. Morbi sed malesuada nibh, non dictum erat. Aliquam est velit, volutpat in diam nec, tincidunt vulputate magna. Mauris fringilla dolor non leo ultricies, non pretium justo ultricies. Aenean in mi lobortis, interdum tortor tristique, iaculis neque. Aliquam imperdiet, arcu ut bibendum laoreet, eros urna condimentum nisl, vitae pellentesque arcu neque a ipsum. Ut ac felis in orci tempus pulvinar eu a arcu. Fusce quis sodales enim, ut feugiat nisi.',
                'Pellentesque eu purus libero. Cras ultrices nisi ultricies mi fermentum vehicula. Suspendisse rutrum, odio et convallis condimentum, orci dolor eleifend massa, bibendum elementum ex est eu est. Etiam viverra lobortis arcu, vel vehicula lacus facilisis ut. Aliquam nulla tortor, fringilla in metus id, vulputate facilisis massa. Sed ac lorem lobortis, viverra erat in, ornare tellus. Maecenas egestas posuere ligula, et rutrum quam cursus vitae. Phasellus tempus ante ut mauris euismod, sit amet iaculis magna semper. Sed vulputate viverra mauris sit amet vulputate. Vestibulum tempus vitae nisi ac feugiat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dapibus metus laoreet ultrices vestibulum. Cras erat massa, eleifend quis ex nec, ornare dapibus urna. Nunc et aliquam est. Suspendisse tempor erat quis ex tincidunt suscipit.',
                'Mauris a lacus non ligula interdum dignissim quis vitae neque. In ut lacus sed massa feugiat posuere sed sit amet leo. Sed maximus vel sapien vitae ullamcorper. Aenean tincidunt venenatis mi, vel fringilla mauris rhoncus quis. Morbi scelerisque pulvinar elit. Quisque sollicitudin tortor mi, vel hendrerit nibh congue nec. Vestibulum euismod at tortor id porttitor. Vivamus consequat fermentum felis, a consequat leo dictum vel. Nulla aliquet odio dui, quis commodo ante condimentum facilisis. Fusce nec suscipit lorem. Aenean ex metus, dapibus ac ipsum nec, faucibus luctus lacus. Morbi aliquet urna non finibus consectetur.',
                'Sed sapien erat, placerat ut consectetur at, iaculis ac urna. Integer pretium et tellus non egestas. Aliquam vulputate, sem a vestibulum vulputate, dolor nulla maximus dui, in finibus massa dolor non ex. Nulla sollicitudin sollicitudin dui, eget gravida tellus ornare nec. Curabitur nunc ligula, ullamcorper et porta ut, consectetur vitae nisi. Nam nisi leo, placerat ac sem vitae, pellentesque aliquet massa. Phasellus eleifend quis metus at consectetur. Vestibulum lobortis auctor odio. Quisque pretium metus ornare risus tempor elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla congue quis ligula quis tincidunt. Nulla id ipsum dignissim, commodo leo sit amet, accumsan sapien. Quisque tincidunt condimentum eros eu feugiat.',
                'Mauris porttitor nibh diam, id pharetra enim maximus vel. Vivamus scelerisque eu nibh at sollicitudin. Nam faucibus nisl ipsum, id cursus lectus imperdiet a. Etiam placerat, metus et imperdiet feugiat, justo risus dignissim erat, in pulvinar ligula dolor vitae massa. Quisque mattis eros eu velit ornare gravida. Suspendisse molestie cursus volutpat. Vivamus consequat tortor efficitur semper imperdiet. Donec eget ornare tellus. Morbi nec nibh mattis, sagittis neque mollis, aliquet elit. Integer id porta justo, eu ornare lectus. Etiam nec leo in sapien imperdiet lobortis ac ac risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In dignissim vitae tellus et faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a libero efficitur, pharetra erat ac, ornare elit. Nam ut sapien eu mauris ullamcorper accumsan at non tellus.',
                'Nullam auctor placerat diam, eget pretium nunc convallis sit amet. Praesent ex felis, elementum at lectus ac, semper mattis mauris. Duis efficitur tortor erat, at tempor ligula euismod et. Etiam convallis, magna quis scelerisque mollis, libero diam tristique ex, non aliquet orci enim vitae dui. Curabitur sed semper enim, a ultricies nisi. Aliquam quam risus, aliquet at urna non, tempor congue turpis. Suspendisse ullamcorper nisi sit amet lectus finibus, a condimentum lectus rutrum. Cras eu nisl tellus.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in elit enim. Nam eget augue accumsan, venenatis est id, viverra nunc. Quisque luctus interdum turpis eu dignissim. Suspendisse porta varius imperdiet. Morbi mattis, tortor ut aliquet mattis, quam nisi porta lorem, vel scelerisque est sapien ac eros. Quisque non luctus quam, ut tempus dui. Praesent eget tincidunt libero. Vestibulum ultrices sed mauris scelerisque rutrum. Nulla rutrum gravida efficitur. Maecenas ut eleifend dolor, ut molestie ante.',
                'Duis semper viverra enim, ac imperdiet leo viverra eu. Aliquam nulla mauris, tempus in purus id, facilisis cursus enim. Nam et laoreet nunc. Integer tristique sem sit amet nunc consequat fermentum. Nullam bibendum imperdiet fermentum. Pellentesque porta odio nec fermentum pretium. Nullam consequat elementum orci a fermentum. Vivamus tincidunt diam non massa auctor, quis semper eros facilisis. Vestibulum et augue massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce efficitur fermentum laoreet.',
                'Mauris commodo iaculis nulla et fringilla. Nam interdum hendrerit aliquet. Suspendisse potenti. Aliquam a commodo quam. Maecenas sollicitudin eros at odio vehicula, a efficitur mauris commodo. Mauris eleifend blandit nibh in dignissim. Integer finibus nisi eget accumsan consectetur. Pellentesque lacinia mi nunc, non viverra mi fermentum non. Duis a imperdiet est. Ut dictum lacus eu tristique dictum. Fusce molestie enim ac vehicula sagittis. Aenean gravida arcu lacus, tincidunt cursus arcu porttitor nec. In in viverra tortor.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultrices nunc. Nullam auctor neque odio, ut interdum mauris dictum vitae. Nunc nec nisl id sem tincidunt vestibulum. Nulla euismod nisl est. Maecenas id nunc non lacus posuere suscipit a lobortis quam. Nullam consequat vulputate iaculis. Cras a nunc ornare, molestie mi eu, hendrerit nisi. Phasellus eget quam eu felis efficitur convallis sed ut quam.',
                'Proin lobortis fermentum velit, non hendrerit sem congue vitae. Proin nisi lacus, hendrerit luctus dui et, posuere blandit arcu. Nulla eu leo commodo, porta tortor id, elementum dui. Quisque eget velit sapien. Nunc quis vestibulum sapien. Vestibulum bibendum orci sit amet erat faucibus rhoncus. Praesent malesuada blandit leo a iaculis. Pellentesque accumsan nisi at tincidunt volutpat. Nulla sit amet condimentum est, id fringilla tellus. Maecenas eu purus pulvinar tellus fermentum tristique at eget eros. Aenean ac justo orci.',
                'Phasellus bibendum vestibulum dolor, eget pulvinar purus ultricies at. Curabitur interdum mauris dui, in euismod nisl lacinia eu. Mauris quis mauris id magna elementum aliquet. Donec egestas dictum metus, in luctus libero consectetur non. Morbi placerat ipsum quis dapibus semper. Suspendisse ac pretium tellus, id ultricies lectus. Ut ac malesuada ante, a iaculis elit.',
                'Nulla facilisi. Vivamus tempus auctor est, ac lacinia dui imperdiet ac. Suspendisse id mi sit amet elit varius tristique. Donec varius tristique elit vitae congue. Maecenas et tempus nisl. Ut suscipit justo ut dictum blandit. Sed eget enim ante. In pharetra quam dignissim posuere ultrices. Phasellus eget egestas dolor. Sed ac velit erat. Ut ex justo, commodo sit amet vestibulum id, eleifend sed elit. Morbi tincidunt, velit nec venenatis venenatis, lectus libero convallis metus, vel consectetur diam nisl vitae tellus. Maecenas hendrerit dui suscipit ligula congue efficitur.',
                'Phasellus id risus tortor. Aenean commodo sapien in mi condimentum, sed varius orci ornare. Donec dictum fermentum metus, pharetra pharetra est varius eu. Integer bibendum tempor est, nec vehicula tortor finibus ut. Praesent rutrum augue purus, et varius urna accumsan euismod. Nunc ut dignissim dui. Mauris at felis eu libero iaculis suscipit consequat sit amet risus. Nunc et molestie massa. Cras euismod porta tortor. Phasellus faucibus leo quis mi efficitur, et tempor turpis vehicula. Ut eu neque nec tellus pretium fringilla finibus ut augue. Aliquam bibendum mi sed quam tempor varius. Maecenas vel odio at nisi luctus ultrices at ac erat. Aliquam erat volutpat.',
                'Vivamus efficitur iaculis iaculis. Quisque facilisis, massa ac ultricies interdum, purus elit malesuada nulla, eget congue mauris sem sed diam. Phasellus laoreet felis nunc, id tincidunt enim commodo maximus. Integer sed mollis leo. Vestibulum id velit nisi. Mauris iaculis a arcu elementum semper. Aenean facilisis placerat erat, et ornare arcu tempus in. Curabitur malesuada nunc rhoncus finibus tempus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque gravida leo eget gravida interdum. Etiam porta nulla ac tempus elementum. Phasellus mattis eros sed velit consectetur feugiat. Praesent malesuada, metus id accumsan sagittis, augue ante volutpat arcu, sed fringilla nibh velit vel tortor.',
                'Pellentesque velit felis, sollicitudin non vehicula vel, viverra varius nisl. Etiam quis quam id lacus hendrerit ultricies vitae at mauris. Curabitur viverra at turpis nec ullamcorper. Nullam sagittis dolor a ipsum euismod, a vestibulum nibh luctus. Morbi rhoncus magna quis dapibus mollis. Fusce turpis augue, maximus aliquam accumsan commodo, ultricies at nunc. Mauris lobortis leo non sapien fringilla, sed lacinia purus finibus. Integer euismod nulla vel dui ultrices, molestie egestas mauris consectetur.',
                'Aliquam nec magna sagittis, tincidunt ipsum in, rhoncus elit. Sed consectetur mauris in elit rhoncus, eu sollicitudin felis sodales. Integer at sagittis nibh, eget elementum nunc. Aenean et mi posuere tellus convallis imperdiet in non ligula. Duis risus odio, faucibus quis tellus sit amet, consectetur feugiat dui. Nam porttitor venenatis consectetur. Curabitur sed sollicitudin diam. Aliquam id diam a magna suscipit commodo vel finibus lacus. Nam tristique metus vitae pellentesque pellentesque. Cras a suscipit turpis, ut sodales sapien. Aenean turpis turpis, pulvinar non sapien et, fringilla mollis lectus.',
                'Curabitur vel mi ullamcorper, egestas est vel, vestibulum eros. Duis placerat ultricies elementum. Morbi at ex nisl. Fusce dictum felis est, quis ultricies elit mattis at. Vivamus ut purus neque. Suspendisse sagittis dolor nulla, id convallis mi volutpat volutpat. Aenean porta, augue quis ultricies laoreet, metus leo congue nibh, at maximus ante felis eu sapien. Vestibulum nec maximus magna. Praesent velit lacus, blandit ut tincidunt aliquet, bibendum ullamcorper lectus.',
                'Praesent fermentum posuere enim eu varius. Ut facilisis tortor massa, et feugiat est mollis eget. Pellentesque eget suscipit purus. Fusce metus ante, consequat eget auctor sit amet, ornare ut ex. Aliquam pretium purus iaculis mollis suscipit. Aliquam in ipsum tellus. Cras bibendum mollis nunc sit amet pulvinar. Maecenas faucibus nibh magna, et accumsan augue aliquet quis. Cras suscipit magna facilisis sodales vulputate. Cras luctus metus nec libero efficitur, at convallis diam blandit.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae auctor sapien, a rhoncus ex. Sed at pulvinar lorem, non tempor risus. Mauris euismod vel dolor porta dignissim. Vestibulum a maximus risus. Ut vehicula mi non lectus rutrum ornare. Nunc eget est sagittis, sollicitudin ex sed, hendrerit metus. Aliquam varius at libero id dignissim. Donec vitae scelerisque sapien. Phasellus nulla quam, sollicitudin sit amet imperdiet vestibulum, consequat sed mauris. Integer eu convallis sem, id aliquam libero. Suspendisse ullamcorper varius facilisis. Nunc ac elit rhoncus tellus tincidunt sollicitudin. Mauris mollis ipsum id eros dictum, ac pretium augue bibendum.',
                'Donec aliquet sem eu orci aliquet, et tempus augue ornare. Nullam laoreet, nisl vel dictum tristique, sem diam dictum felis, id pretium leo orci et urna. Donec hendrerit ipsum non erat tempor, efficitur sagittis tellus mollis. Integer quis sapien sagittis lectus molestie bibendum eget ut elit. Duis fermentum sagittis libero nec vulputate. Maecenas nec elit augue. Vivamus volutpat, quam id tincidunt accumsan, est urna dapibus ante, imperdiet auctor odio dolor in risus. Quisque eu tellus aliquet, fermentum neque ut, semper ligula. Proin lobortis libero et porttitor placerat.',
                'Proin commodo turpis in leo egestas commodo. In vehicula ex urna, imperdiet maximus justo viverra et. Suspendisse potenti. Quisque interdum nisl id dui aliquet, vitae consequat dolor molestie. Cras faucibus, elit at aliquam congue, metus nunc dignissim metus, nec semper arcu nulla ut arcu. Morbi vel mi justo. Suspendisse commodo justo quis ornare laoreet. Etiam sed arcu magna.',
                'Cras diam felis, suscipit at ipsum vel, sagittis ullamcorper mi. Curabitur scelerisque turpis commodo augue porttitor, mattis volutpat enim tempor. Fusce at magna ultrices arcu iaculis lobortis at eu nibh. Fusce et varius purus, id gravida felis. Nullam et nibh malesuada, luctus sem in, vulputate augue. Integer non quam mauris. Suspendisse ultrices quis eros at venenatis. Vivamus in dui faucibus neque facilisis vehicula sed at orci. Nulla scelerisque, magna ac tristique tempus, sapien tellus interdum neque, vitae finibus nisl enim ut libero. Aenean velit tellus, dictum non tellus vel, elementum euismod sem. Nam in magna in eros commodo eleifend. Sed sagittis cursus nunc quis tempor. Fusce eget sollicitudin velit. Sed sagittis venenatis sapien, pretium porttitor justo finibus nec. Duis sodales sapien nibh, non placerat lectus tempor eu. Proin pharetra et tortor vel venenatis.',
                'In accumsan consequat nunc. Morbi non lacus maximus, consequat urna a, luctus tortor. Nam tellus est, viverra id pretium eu, ultricies ac purus. Sed libero diam, lobortis ac dolor eget, rhoncus sollicitudin lacus. Quisque sit amet magna vel justo fringilla iaculis. Nulla a felis rutrum lectus finibus viverra ac varius erat. Sed sed tempor risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices ac nunc ut fermentum. Suspendisse potenti.',
                'Duis volutpat, eros eget porttitor eleifend, nulla felis tempus quam, vitae lobortis ex ex ut orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed dictum magna magna, vel sagittis orci aliquam a. Sed non nibh ac diam mollis rhoncus. Aenean efficitur tempus tellus. In facilisis faucibus massa at auctor. Curabitur erat massa, gravida quis consectetur nec, lobortis ac enim.',
                'In cursus mauris id massa elementum gravida. Praesent vel arcu eget erat porta consectetur ut id diam. Maecenas dictum, enim non sollicitudin imperdiet, nunc mi consectetur orci, in tincidunt leo enim vel mauris. Suspendisse vitae euismod purus. Phasellus ut dignissim lorem. Curabitur ipsum mauris, malesuada quis interdum vitae, malesuada vitae odio. Vestibulum et lectus enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam suscipit tortor in augue commodo, eu facilisis massa tincidunt. Nulla placerat tincidunt augue vitae tempor. Nulla hendrerit dui sit amet dictum tincidunt. Aenean cursus felis et enim cursus, et tincidunt libero molestie. Cras finibus urna massa, id euismod enim ultrices id. Pellentesque volutpat hendrerit neque vel consectetur.',
                'Nam ac neque eu est ornare gravida. Cras eu neque eget eros lobortis mollis. Maecenas et pulvinar nibh. Sed nulla tortor, pretium non convallis id, congue a metus. Cras efficitur, nibh nec euismod malesuada, massa tellus suscipit quam, non sollicitudin ante tortor id ante. Pellentesque viverra sem ac nisi viverra aliquet. Fusce ligula ligula, luctus non fringilla eget, bibendum nec risus. Praesent semper tempus diam, sed tempus erat viverra efficitur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus vitae fermentum dolor. Suspendisse euismod ultrices sollicitudin.',
                'Cras eget ipsum et odio maximus consectetur. Vestibulum ac mi efficitur, volutpat nisi eget, ultricies sem. Curabitur metus eros, feugiat at malesuada nec, eleifend id nisi. Praesent at fermentum nibh. Nullam nec ullamcorper augue, auctor consequat dolor. Nulla vitae ante vel dolor posuere malesuada. Aliquam velit ex, hendrerit ut sapien dapibus, vehicula gravida odio.',
                'Donec augue libero, vestibulum ultrices purus quis, commodo mattis nunc. Curabitur ultrices dapibus sapien id scelerisque. Nam metus mi, luctus ut posuere eget, lobortis non ex. Aliquam euismod nunc sem, a malesuada tortor facilisis et. Nulla porta faucibus libero, eget vehicula ante semper vitae. Nulla facilisis efficitur mattis. Integer ullamcorper, quam id lacinia varius, arcu quam maximus diam, ac accumsan justo quam at massa.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae libero maximus nisi suscipit ultrices laoreet semper leo. Morbi vel dui in felis accumsan aliquam. Nam vel egestas enim. Nam quis tincidunt arcu. Integer rhoncus mi metus, in sagittis eros malesuada nec. Duis in iaculis ante. Vivamus viverra fringilla quam, a condimentum ligula sollicitudin sit amet. Curabitur sed rutrum sapien, eget iaculis felis. Suspendisse egestas scelerisque purus. Morbi sodales blandit leo, nec fringilla neque ultricies sed. Mauris congue lectus vitae suscipit mollis. Nunc id ipsum sem. Aliquam erat volutpat. Duis sit amet commodo libero.',
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam hendrerit lorem nunc, eget dictum nisi faucibus eget. Integer bibendum dolor purus, ac aliquet ligula accumsan id. Morbi nulla nisl, lacinia at bibendum at, venenatis in nisl. Nullam pellentesque leo felis, et dapibus ligula lacinia sit amet. Aliquam facilisis est leo, vel viverra sem imperdiet condimentum. Donec placerat dui id justo rhoncus, ac euismod massa iaculis. Quisque gravida metus ut nisi aliquet, posuere facilisis urna ullamcorper. In feugiat ac sapien eu accumsan. Nunc egestas posuere libero.',
                'Aenean mattis a libero at aliquam. Quisque ac viverra est. Ut accumsan cursus massa et lacinia. Cras sed dolor id sapien auctor iaculis. Duis dolor augue, tempor ac mauris eget, aliquet vulputate neque. Aliquam dictum volutpat rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla quis magna nec tellus finibus convallis. Etiam convallis ullamcorper odio, ac placerat lacus facilisis vel. Donec sed nunc quis sem maximus ornare. Donec dapibus euismod elit at aliquam. Morbi malesuada molestie libero, id lobortis ante congue et.',
                'Praesent accumsan pharetra dui a pellentesque. Nulla pulvinar tortor eleifend, iaculis risus eget, faucibus ipsum. Phasellus id purus ac dolor fermentum aliquam non a metus. Integer ac tristique mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla ex in ex rhoncus, sit amet faucibus ipsum sagittis. Integer maximus diam eu nibh tincidunt, eu consectetur urna pellentesque. Integer ut accumsan risus. Sed iaculis nec lacus tempus consectetur. Proin facilisis cursus turpis, quis cursus ipsum dapibus vitae. Morbi sollicitudin dui nec nunc ornare, in convallis ex vehicula. Nulla quis dignissim justo.',
                'Nunc molestie sapien eu egestas posuere. Suspendisse posuere erat ipsum, quis blandit dolor egestas a. Praesent sollicitudin fermentum rutrum. In ut hendrerit metus, eu volutpat elit. Duis luctus augue est, vel scelerisque velit eleifend id. Maecenas vestibulum imperdiet purus nec sollicitudin. Duis et vehicula sapien, ac luctus eros. Vestibulum magna mauris, accumsan sit amet lobortis eget, porta eget neque. Phasellus sed aliquet ipsum. Nullam tempus sed est ac euismod. Donec luctus lectus id maximus finibus. Etiam ac dui lectus.',
                'Mauris lacinia sapien ante, id elementum dolor mollis non. Vestibulum vitae sodales ante. Aliquam elit quam, faucibus sit amet elit malesuada, volutpat eleifend leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor malesuada bibendum. Aliquam scelerisque mattis neque vel tincidunt. Nam condimentum tempus dictum. Curabitur sit amet pharetra tortor. Nunc vel mauris vitae lacus vehicula suscipit a in erat. Etiam arcu elit, laoreet vel ullamcorper in, lacinia eu nisi. Ut eu lacus non enim tristique posuere lobortis vitae ipsum. Sed sed feugiat risus, maximus varius velit. Fusce dapibus tempus augue. Pellentesque lobortis rutrum justo sit amet accumsan.',
                'Donec eu sagittis libero. In sem magna, cursus at accumsan quis, luctus ac arcu. Nunc non semper odio, in lobortis mi. Sed vel auctor odio, nec pellentesque mi. Nam ut sagittis purus. Nunc eget orci aliquam, sodales sapien lobortis, tincidunt enim. Ut feugiat lacus a placerat tempor. Vivamus vitae enim sit amet urna placerat vehicula et quis eros. Aliquam ullamcorper turpis turpis. Vestibulum aliquet commodo dui, et egestas nulla volutpat at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur in justo ut tortor gravida rutrum. Duis nec ex at leo facilisis hendrerit. Fusce blandit ac justo sit amet pellentesque. In feugiat porta metus, eget viverra massa vestibulum in.',
                'Phasellus risus mi, hendrerit ac hendrerit quis, volutpat vel sapien. Aliquam nec velit non sapien commodo laoreet. Suspendisse id libero odio. Praesent tempor eu justo eget pretium. Ut vehicula libero nec metus suscipit ornare. Proin tincidunt libero sit amet porta ultricies. Sed posuere pellentesque ligula, quis pretium lorem. Nam tristique leo ut est mollis tincidunt. Maecenas vestibulum eget ipsum in pellentesque.',
                'Nam nibh quam, aliquet id malesuada eu, blandit sit amet nibh. Curabitur lacinia, nisi ut porta auctor, dui lectus vulputate ligula, sed tristique libero ex eget lectus. Nulla sollicitudin odio sed ipsum sodales sagittis. Aliquam semper ligula vitae neque pretium dictum id ac massa. Nulla rutrum mi diam, in fermentum neque sagittis vel. Pellentesque ornare augue felis. Integer placerat elit nec luctus luctus. Aliquam accumsan nibh turpis, in mattis justo luctus ac. Etiam placerat massa vitae est rhoncus, ut faucibus nibh ornare. Maecenas eu purus et velit porta consequat lacinia non metus. Nullam eget efficitur odio. Ut aliquam iaculis purus mattis congue. In hac habitasse platea dictumst. Vivamus semper, felis a faucibus volutpat, turpis metus vehicula elit, mollis euismod leo quam fringilla est. Suspendisse potenti.',
                'Aenean est magna, fringilla ac magna nec, dictum iaculis ante. Cras interdum dolor nec pretium commodo. Quisque auctor ipsum nisi, at suscipit orci rhoncus in. Pellentesque felis quam, tempor at feugiat vitae, egestas et metus. Aliquam porttitor nibh nec ex sollicitudin pharetra. Phasellus feugiat, felis id ornare eleifend, quam ligula faucibus mi, nec fermentum nulla nibh eu sapien. Integer dapibus scelerisque odio et sollicitudin. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur suscipit dui condimentum sagittis consectetur. Sed sit amet nunc sit amet odio malesuada laoreet. Nullam egestas in urna nec pretium. Nullam id hendrerit quam, et euismod turpis. Sed nulla arcu, blandit non tellus non, feugiat porttitor lacus. Praesent bibendum magna at quam faucibus, sit amet lacinia mi iaculis. Vestibulum facilisis vitae odio a elementum.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at leo in urna venenatis hendrerit. Mauris congue eget elit sed consectetur. Proin aliquam risus eu faucibus facilisis. In at mi et felis vulputate sagittis. Suspendisse ac interdum libero. Nullam porttitor, lectus eu dapibus volutpat, purus lectus aliquet erat, malesuada mattis purus leo quis ante. Maecenas magna nulla, tempor et viverra in, accumsan sit amet sem.',
                'Pellentesque lacus turpis, rutrum non neque ac, aliquam porttitor odio. Fusce ultrices ligula in velit venenatis maximus. Proin iaculis nulla vitae leo ullamcorper, sit amet rhoncus erat pharetra. Sed purus tortor, viverra ut dui sit amet, pretium iaculis erat. Vestibulum vestibulum felis quis faucibus ullamcorper. Suspendisse ac fringilla purus. Vivamus tempor, turpis sed elementum posuere, elit magna vulputate dui, a tempus neque sapien ac augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla luctus malesuada nunc, aliquet semper est laoreet eu. Fusce mattis rhoncus lorem, eget iaculis felis tempor a. Aenean commodo justo eros.',
                'Aliquam vulputate non nulla in pellentesque. Sed condimentum egestas nunc a iaculis. Vivamus luctus sed velit vel dictum. Proin bibendum bibendum ultricies. Nulla dapibus, sapien et aliquam laoreet, quam justo commodo dolor, a cursus turpis erat at elit. Curabitur at cursus odio, non interdum quam. Fusce dignissim, lorem vel cursus fringilla, arcu nunc aliquet lacus, et ultricies lectus tortor ut sapien. Donec nec porttitor enim. Duis sed vehicula tellus. In sit amet lacinia augue, a aliquet elit. Aliquam nec est a nibh pharetra lobortis vitae sed mi. Pellentesque efficitur dui in elit pellentesque, hendrerit dictum neque mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
                'Aliquam erat volutpat. Praesent luctus, nisi et scelerisque molestie, turpis odio mattis libero, non rutrum felis neque non augue. Aliquam erat volutpat. Sed id eros diam. Praesent finibus ante sem, ac finibus mi fringilla eu. Maecenas condimentum diam a nibh accumsan rutrum. Proin sed tempus diam.',
                'Vestibulum vel dignissim risus. Mauris vel varius justo, sit amet tincidunt augue. Vivamus non libero sed lacus tristique accumsan eu vel purus. Cras pellentesque tortor ut quam ullamcorper, vitae consequat lectus tempor. Sed sed commodo purus, at vestibulum est. Mauris tincidunt blandit tempus. Mauris nec porttitor tortor.',
                'Nullam felis tellus, viverra ac urna at, interdum congue magna. Nullam non pretium nisi, sed ultrices risus. Nullam fermentum tortor eget malesuada vulputate. Praesent vel lorem condimentum nulla pharetra convallis. Cras ornare dictum lacus, nec porta est. Sed tincidunt ex id lacus aliquam gravida at sodales purus. Aliquam ante nulla, varius eget lorem in, euismod venenatis mauris.',
                'Donec id mauris mollis, venenatis libero nec, commodo justo. In efficitur, ante quis rhoncus tristique, elit enim suscipit dolor, et tristique dolor ligula quis massa. Curabitur ligula leo, posuere non faucibus non, sodales vitae lacus. Etiam porttitor enim nec ex fermentum, eget vehicula justo maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam mauris lacus, semper at pellentesque eget, scelerisque ut eros. Vivamus sed lectus sem. Cras dolor sapien, tristique ultrices sodales vitae, dapibus interdum massa.',
                'Donec mattis non ex at pharetra. Nunc a porta eros. Curabitur ultrices nisi ut risus sodales, at accumsan est ultricies. Maecenas dignissim ullamcorper lorem eu fermentum. Quisque non tellus id sem posuere tempus. Maecenas facilisis nec risus non finibus. Nam a dui vitae lectus pulvinar tristique non vel eros. Sed dignissim congue nisl ac commodo. Aliquam erat volutpat. Mauris risus diam, dapibus sed augue convallis, aliquet aliquam enim. Praesent ac erat felis. Morbi sagittis non diam et dictum. In hac habitasse platea dictumst.',
                'Suspendisse tempor diam quis urna varius accumsan. Sed a ante eu quam pulvinar sagittis. Mauris nec metus vitae ex volutpat iaculis a vel quam. Proin rutrum tellus id diam pretium, eu consequat lacus cursus. Curabitur lacinia imperdiet tincidunt. Donec dapibus nisl enim, convallis congue risus eleifend ac. Aenean in dapibus lectus, at mattis purus. Nam lacinia dui vel tortor finibus, at varius nisi sodales. Phasellus interdum ultricies arcu, a ultricies nunc placerat ut. Quisque egestas diam vitae sapien consectetur interdum eu vitae sem. Donec leo est, dictum sit amet pretium at, feugiat nec nibh. In et imperdiet lectus. Nam ultrices, mi eget faucibus imperdiet, leo ex dapibus urna, sit amet pellentesque felis nunc sit amet mi. In dignissim ipsum vitae blandit volutpat.',
                'Maecenas sed tellus a nunc sollicitudin ultricies. Sed tincidunt ultricies nisl ac mattis. Phasellus nec urna nec orci rhoncus ornare et sit amet nunc. Mauris eros nunc, interdum at feugiat nec, bibendum sed felis. Duis eleifend odio ut ipsum sollicitudin, vel ultrices purus cursus. Cras nibh mi, viverra id lectus quis, efficitur ultrices nisl. In vel feugiat dui. Donec consequat leo lectus, vitae porttitor elit lobortis eget. Nullam aliquam nisi vel rhoncus lobortis.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lorem placerat, convallis ipsum vel, vestibulum mi. Curabitur justo mi, aliquam eu egestas ac, venenatis vel risus. Phasellus non lobortis lacus. Mauris eget tortor non justo sodales venenatis sed vitae dui. Nunc facilisis at mi a tincidunt. Aliquam id nisl lorem. Integer consequat leo dignissim diam luctus tristique. Nulla sollicitudin vulputate leo, at accumsan felis cursus eu. Quisque feugiat sit amet felis nec consectetur. Etiam luctus, sapien et sodales ullamcorper, libero est dapibus est, ut dictum leo mauris quis elit. Vestibulum elementum tincidunt velit in auctor. Nullam gravida tellus sollicitudin convallis tempor. Proin a nisl porttitor mauris consequat fringilla non eu nulla. Integer malesuada sit amet nisl ut bibendum.',
                'Ut quis dictum leo, quis tempor est. Quisque scelerisque pellentesque mauris, a consequat sapien porta in. Donec id elit ut enim laoreet faucibus a quis lorem. Sed id sem blandit lectus tincidunt porta ac sit amet felis. Cras in nisi id lectus tincidunt pulvinar. Praesent diam velit, facilisis vitae lobortis vel, elementum a dolor. Integer mattis placerat porta. Proin gravida quam ac felis imperdiet, id ornare libero sagittis. Suspendisse rhoncus ex turpis, vel varius leo posuere sit amet. Nulla a risus dolor. Donec interdum massa dictum, consequat ante id, fermentum sapien. Etiam nec consectetur metus, in lacinia odio. Suspendisse semper ex quis pellentesque vulputate. Phasellus sed erat non erat aliquet semper. Proin non nulla venenatis nunc tempor congue nec a ante.',
                'Aliquam accumsan tortor vel ex finibus porttitor. Donec id bibendum ipsum. Curabitur rutrum pulvinar libero, id euismod purus elementum fringilla. Vivamus mattis neque nunc, et pharetra velit blandit quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. In tincidunt erat a orci ultrices luctus. In interdum massa in augue lobortis, eu semper magna dictum. Sed suscipit ullamcorper mi, et sagittis nunc varius vitae. Sed ut vestibulum eros. Curabitur accumsan aliquet augue. Curabitur in urna vel est mattis bibendum vitae vel nunc. Nunc leo nisi, lobortis eu facilisis vel, tincidunt mollis mi. Morbi nec mauris commodo lectus rutrum interdum.',
                'Morbi orci lacus, lacinia ac arcu non, blandit aliquet magna. Sed eu maximus felis. Sed consequat nisi a quam vehicula, eget finibus odio commodo. Maecenas tristique ac arcu posuere sodales. Sed congue, ligula ac convallis convallis, dolor ligula interdum nisl, et dignissim tellus felis at velit. Pellentesque non mollis erat. Ut ultrices tincidunt lectus nec eleifend. Suspendisse tincidunt elit et massa malesuada hendrerit. Duis vel fermentum metus. Nulla facilisi. Aenean porta semper dui non volutpat. Ut eget elit ligula. Vivamus sem orci, tristique quis odio eu, bibendum posuere orci. Fusce porta magna non metus placerat, ut ornare diam bibendum. Quisque facilisis felis quam, at facilisis ante malesuada vitae.',
                'Aenean placerat viverra congue. Curabitur porta, nisi in pharetra pellentesque, dui sapien dapibus felis, a pulvinar tortor leo non dui. Etiam pretium eros in purus venenatis porttitor. Nulla facilisi. Nam auctor rutrum convallis. Vestibulum vel sagittis massa. Etiam non augue orci. Nulla rhoncus tincidunt lacus id sagittis. Suspendisse lacinia justo velit, at dapibus ligula sagittis et. Nam finibus massa nunc, et congue est blandit et. In malesuada sit amet enim eu ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sagittis ligula a tellus dapibus, vel ultricies eros pretium. Ut dictum neque venenatis, bibendum justo in, condimentum urna.',
                'Phasellus et porttitor urna. Etiam rhoncus tellus diam, vitae fringilla dui dictum ut. Mauris nibh ligula, feugiat sagittis facilisis varius, sagittis sed felis. Sed tempor facilisis sem et ultricies. Proin rhoncus et leo vel sagittis. Praesent velit tellus, volutpat convallis lobortis vel, tristique et nibh. Curabitur ut tincidunt est. Maecenas pharetra id turpis eget commodo. Nullam malesuada posuere purus, quis pellentesque arcu fringilla in. Nulla egestas feugiat nulla, vitae dignissim orci malesuada at. Etiam pretium, turpis at ultrices elementum, orci urna porttitor elit, at condimentum magna justo in orci. Pellentesque sagittis pellentesque erat, porttitor venenatis metus finibus ac. Suspendisse potenti.',
                'Nullam dapibus ante lorem, at accumsan erat mollis ut. Phasellus aliquet, diam in ultricies fringilla, ante quam scelerisque lectus, non mollis elit metus sit amet mauris. Duis sit amet blandit magna. Pellentesque commodo justo ut egestas venenatis. Suspendisse fermentum turpis vel bibendum ultrices. Mauris eu mauris sit amet orci dapibus pretium. Donec eros dui, tristique non euismod eget, porttitor quis lacus. Nam interdum sodales purus id suscipit. Aenean ut ligula et nulla egestas dignissim.',
                'Ut odio tellus, mollis quis nunc quis, commodo gravida dui. Aliquam lacinia felis mauris, ac dictum tortor euismod eget. Aliquam vel cursus felis, ac sodales arcu. Aliquam id orci nec eros dictum ultrices. Integer eu auctor metus, non consequat nunc. Pellentesque aliquam metus quis metus vestibulum viverra. Quisque non accumsan neque. Aliquam eleifend risus sed dui tempus, et bibendum lorem finibus. Phasellus sed dictum lectus. Nunc rhoncus fermentum eros nec vehicula.',
                'Aliquam at orci eu nunc aliquet pretium. Donec congue erat non sapien commodo, ut consequat lorem sagittis. Aliquam molestie arcu ut neque vestibulum sagittis. Cras vel elit ut odio suscipit efficitur. Nullam sollicitudin dui ac tellus auctor tincidunt. Quisque sit amet luctus tortor. Mauris a sapien sit amet massa feugiat tempus quis at nibh. Etiam tristique ut dolor vitae ornare. Cras vitae felis eu neque rhoncus feugiat. Morbi eget blandit mauris. Sed et nisl et leo laoreet vehicula et in massa. Sed blandit augue ligula, et consequat metus tempus eget. Quisque ac sapien eget enim interdum fermentum. Phasellus ullamcorper orci arcu, a auctor lectus egestas nec.',
                'Quisque a magna suscipit, venenatis ipsum et, sagittis nibh. Pellentesque convallis risus sit amet finibus ullamcorper. Phasellus auctor sagittis sem, accumsan consequat eros dignissim ac. Nulla auctor ante porttitor nisi accumsan varius. Praesent dignissim orci at massa pretium finibus. Suspendisse potenti. Nunc consequat commodo sagittis. Ut dui diam, laoreet vel nulla vitae, viverra feugiat neque. Suspendisse varius facilisis odio at convallis.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor auctor nulla, vitae ornare metus bibendum ac. Praesent suscipit mattis risus, vel ultricies turpis dignissim eget. Praesent iaculis venenatis nibh quis elementum. Sed sit amet dignissim velit. Nam a suscipit lectus, a commodo arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse nec convallis felis. Maecenas facilisis enim ipsum, sed bibendum ligula viverra eget. Phasellus sem lectus, cursus ac venenatis feugiat, eleifend vitae justo. Vivamus semper tortor at augue ornare euismod. Nulla sit amet vulputate purus.',
                'Duis placerat et risus ac feugiat. Maecenas gravida a mi sed faucibus. Sed porttitor orci sapien, sit amet mollis tellus tincidunt mattis. Nam in volutpat lectus. Donec pulvinar elementum nulla, quis viverra urna rhoncus sed. Nullam sagittis eros urna, nec aliquam odio semper sed. Morbi dapibus nisl et arcu iaculis sodales. Pellentesque sed porttitor ex. Morbi mattis ac nunc ac commodo. In porttitor nisi et commodo posuere. Duis pulvinar enim lectus, non eleifend velit sagittis ac. Aliquam laoreet volutpat gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum gravida est dolor, sit amet consequat ante imperdiet nec. Vestibulum pulvinar faucibus gravida.',
                'Etiam tempus, mauris a fringilla efficitur, eros turpis posuere enim, ac rutrum lacus sapien sed mauris. Aliquam quis ex ullamcorper augue scelerisque convallis. Maecenas cursus dolor eget nisi sollicitudin euismod. Suspendisse potenti. Nam ullamcorper metus eget ultrices pellentesque. Sed at pellentesque felis. Ut semper pellentesque mi, in sollicitudin nibh. Nulla mattis molestie enim, posuere dictum urna porta sit amet. Donec vulputate sem eu est aliquam, elementum fermentum leo pellentesque. Etiam condimentum velit vitae nisi luctus luctus vel et ante. Morbi hendrerit rutrum risus, quis pretium est. Aenean id venenatis diam, a posuere enim. Aliquam auctor luctus ornare. Sed eget convallis nibh, facilisis placerat ex. Sed ut suscipit odio, id ornare purus. Nam luctus justo in neque sollicitudin volutpat ac et sapien.',
                'Quisque elementum pharetra felis, non pulvinar leo pellentesque a. Morbi maximus libero sed dui tristique egestas. Phasellus maximus nibh at quam tempus, eget fermentum metus sagittis. Morbi vel purus et dolor rhoncus eleifend a in metus. Praesent dignissim ex quis augue placerat, in ullamcorper purus mollis. Fusce in euismod tortor. Mauris vitae diam aliquet, fermentum felis eget, rhoncus nisl. Fusce neque orci, cursus ut enim tempor, posuere porta sem.',
                'Sed vulputate vestibulum lacus, ut porttitor neque tempus vitae. Ut ac velit feugiat, porttitor velit in, malesuada erat. Pellentesque erat dui, commodo at nunc sit amet, vulputate posuere lorem. Vestibulum et nibh tincidunt erat hendrerit scelerisque. Donec enim ex, sagittis eu leo et, maximus tempus purus. Sed finibus viverra ipsum, at maximus lacus finibus tempor. Pellentesque aliquam lacinia laoreet. Cras ultrices, lectus id dapibus commodo, est sapien egestas urna, sit amet viverra erat dui vel tortor.',
                'Sed ultrices eros vel ultrices molestie. Integer nec dolor eu tortor viverra suscipit. Aliquam ac felis ultrices, facilisis ex eget, malesuada lacus. Integer eu magna nibh. Praesent feugiat tincidunt nulla vitae feugiat. Duis tempus, massa vitae vehicula rutrum, nisl ex semper lacus, sed cursus lorem ipsum ut felis. Quisque sed erat interdum, elementum libero vitae, faucibus ante. Proin eget diam sit amet risus sodales finibus.',
                'In sagittis purus quis purus gravida pharetra. Fusce sodales, dui sed tempus sodales, lorem diam pharetra ipsum, vitae interdum sapien enim vel dolor. Aliquam pulvinar aliquet mi, sit amet cursus felis imperdiet ac. Donec porttitor sed purus in pharetra. Vestibulum tincidunt maximus nulla, sed tincidunt ante eleifend at. Etiam eu facilisis lectus. Nullam consequat, quam sit amet lacinia mattis, eros nunc consequat nisl, non sagittis turpis erat ac ligula. Integer ac diam ac eros accumsan facilisis. In id egestas sem. Mauris tempor mauris quis quam sodales suscipit. Maecenas tincidunt id odio nec facilisis. Suspendisse ac iaculis nisl.',
                'Integer sed tincidunt ipsum. Suspendisse ultrices bibendum arcu malesuada lobortis. Ut maximus nunc at lacus cursus mollis. Proin viverra dolor ut enim facilisis finibus. Pellentesque augue tortor, feugiat vitae pellentesque vel, mattis non sapien. Sed rutrum, erat sed mollis commodo, dui odio porttitor sapien, eget lobortis ligula lacus sed justo. Donec lacinia finibus dolor vitae ornare. Fusce venenatis porttitor sem at tincidunt. Phasellus porta nisi sed dui malesuada sodales. Vivamus malesuada malesuada quam, ac cursus lacus mollis eget. Ut tellus tellus, iaculis eget malesuada quis, ultrices sit amet est. Proin non elit id nulla vehicula convallis. Aenean maximus ut ante sit amet euismod. Nam sollicitudin ac sem et sollicitudin.',
                'Vivamus non libero iaculis, ullamcorper nibh at, placerat nunc. Vivamus aliquam vitae ex sit amet lacinia. Integer vitae magna sed lacus ultrices vulputate. Morbi ac neque orci. Praesent commodo gravida sapien in hendrerit. Integer eu purus ipsum. Nullam sit amet dolor ut velit molestie vestibulum. Cras volutpat varius justo, a tincidunt urna ultricies id. Fusce eleifend pretium tempus. Integer pellentesque eu neque non euismod. Sed ut vulputate massa. Aliquam elit odio, convallis quis arcu id, porta viverra felis. Fusce eu viverra mauris. Integer pellentesque, felis eleifend euismod luctus, erat enim porttitor eros, a consequat odio nisi ut massa. Fusce blandit ante a sapien viverra, eget fermentum arcu fermentum.',
                'Morbi sed blandit dui. Etiam a lorem tincidunt, dignissim nunc vitae, aliquam quam. Praesent non aliquam mi, eget efficitur tortor. Donec egestas leo vel felis rutrum, et imperdiet sapien faucibus. Pellentesque ullamcorper turpis vel leo blandit maximus. Proin hendrerit scelerisque nisl sit amet consequat. Proin pharetra metus augue, vel facilisis metus laoreet sit amet. In urna velit, aliquet quis gravida et, viverra et felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed vel tempus lectus, vitae mattis quam. Sed diam urna, dignissim eu tortor id, placerat tempus arcu. Integer justo magna, consectetur non ex non, placerat lacinia tortor. Curabitur ac tempus tortor. Suspendisse at massa at nibh accumsan aliquet. Phasellus est lectus, pellentesque eget enim vitae, elementum euismod libero.',
            ]);
        }
        expect(getTime() - start_time).to.be.lt(1000);
    });

    it ('Should shuffle an array of mixed values in a unique way (benchmark 100 shuffles with a 10 number array)', () => {
        let hashmap = {};
        for (let i = 0; i < 100; i++) {
            const el = [
                {a: 1, b: 2, c: 3, d: 4},
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie nisi interdum dui facilisis vestibulum. Cras et velit sodales, consectetur sem vitae, imperdiet tellus. Vivamus vulputate aliquam nunc non faucibus. Nunc eget enim sollicitudin, semper magna et, congue odio. Nullam sagittis condimentum sollicitudin. Vestibulum venenatis ullamcorper ligula, eu dapibus arcu aliquet a. Fusce eleifend non nulla vitae tempus. Integer varius libero vitae tincidunt volutpat. Praesent vitae velit mollis, tincidunt magna in, maximus ligula. Phasellus feugiat leo dolor, eget mattis justo condimentum luctus. Sed varius massa eget sagittis ultricies. Pellentesque maximus enim ultricies porta pellentesque. Quisque varius magna magna, quis accumsan odio venenatis in. Sed fringilla dapibus metus. Proin non feugiat metus. Nulla non neque tristique, pulvinar orci in, fermentum lacus.',
                1,
                423437894,
                [{hello: 'there'}],
                new RegExp('abc', 'g'),
                new Date('2022-01-01'),
                true,
                {the: ['an', 'array', 0]},
                [[0, 2, 4], [1, 2, 3]],
            ];
            shuffle(el);
            hashmap[fnv1A(el)] = el;
        }
        expect(Object.keys(hashmap).length).to.be.gt(90);
    });

    it ('Should shuffle an array of mixed values in a fast way (benchmark 1000000 shuffles with a 10 mixed array) in < 1sec', () => {
        let start_time = getTime();
        for (let x = 0; x < 1000000; x++) {
            shuffle([
                {a: 1, b: 2, c: 3, d: 4},
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie nisi interdum dui facilisis vestibulum. Cras et velit sodales, consectetur sem vitae, imperdiet tellus. Vivamus vulputate aliquam nunc non faucibus. Nunc eget enim sollicitudin, semper magna et, congue odio. Nullam sagittis condimentum sollicitudin. Vestibulum venenatis ullamcorper ligula, eu dapibus arcu aliquet a. Fusce eleifend non nulla vitae tempus. Integer varius libero vitae tincidunt volutpat. Praesent vitae velit mollis, tincidunt magna in, maximus ligula. Phasellus feugiat leo dolor, eget mattis justo condimentum luctus. Sed varius massa eget sagittis ultricies. Pellentesque maximus enim ultricies porta pellentesque. Quisque varius magna magna, quis accumsan odio venenatis in. Sed fringilla dapibus metus. Proin non feugiat metus. Nulla non neque tristique, pulvinar orci in, fermentum lacus.',
                1,
                423437894,
                [{hello: 'there'}],
                new RegExp('abc', 'g'),
                new Date('2022-01-01'),
                true,
                {the: ['an', 'array', 0]},
                [[0, 2, 4], [1, 2, 3]],
            ]);
        }
        expect(getTime() - start_time).to.be.lt(1000);
    });

    it ('Should shuffle an array of mixed values in a fast way (benchmark 100000 shuffles with a 100 mixed array) in < 1sec', () => {
        let start_time = getTime();
        let arr = [
            {a: 1, b: 2, c: 3, d: 4},
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie nisi interdum dui facilisis vestibulum. Cras et velit sodales, consectetur sem vitae, imperdiet tellus. Vivamus vulputate aliquam nunc non faucibus. Nunc eget enim sollicitudin, semper magna et, congue odio. Nullam sagittis condimentum sollicitudin. Vestibulum venenatis ullamcorper ligula, eu dapibus arcu aliquet a. Fusce eleifend non nulla vitae tempus. Integer varius libero vitae tincidunt volutpat. Praesent vitae velit mollis, tincidunt magna in, maximus ligula. Phasellus feugiat leo dolor, eget mattis justo condimentum luctus. Sed varius massa eget sagittis ultricies. Pellentesque maximus enim ultricies porta pellentesque. Quisque varius magna magna, quis accumsan odio venenatis in. Sed fringilla dapibus metus. Proin non feugiat metus. Nulla non neque tristique, pulvinar orci in, fermentum lacus.',
            1,
            423437894,
            [{hello: 'there'}],
            new RegExp('abc', 'g'),
            new Date('2022-01-01'),
            true,
            {the: ['an', 'array', 0]},
            [[0, 2, 4], [1, 2, 3]],
        ];
        let arr2 = [...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr];
        for (let x = 0; x < 100000; x++) {
            shuffle(arr2);
        }
        expect(getTime() - start_time).to.be.lt(1000);
    });

});
