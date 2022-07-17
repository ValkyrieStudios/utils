'use strict';

import isArray          from '../../src/array/is';
import isNotEmptyArray  from '../../src/array/isNotEmpty';
import dedupe           from '../../src/array/dedupe';
import mapKey           from '../../src/array/mapKey';
import mapFn            from '../../src/array/mapFn';
import mapPrimitive     from '../../src/array/mapPrimitive';
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

    it ('should correctly map an array of objects by key', () => {
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

    it ('should correctly remove non-objects from the array when mapping an array of objects by key', () => {
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

    it ('should correctly remove objects without the provided key from the array when mapping an array of objects by key', () => {
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