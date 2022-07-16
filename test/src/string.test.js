'use strict';

import isString         from '../../src/string/is';
import isStringBetween  from '../../src/string/isBetween';
import isNotEmptyString from '../../src/string/isNotEmpty';
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

describe("String - isString", () => {
    it ('see a string as a string', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isString(el)).to.eql(true);
    });

    it ('not see a numeric value as a string', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isString(el)).to.eql(false);
    });

    it ('not see a boolean as a string', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isString(el)).to.eql(false);
    });

    it ('not see a regex as a string', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isString(el)).to.eql(false);
    });

    it ('not see an object as a string', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isString(el)).to.eql(false);
    });

    it ('not see a nullable as a string', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isString(el)).to.eql(false);
    });

    it ('not see a date as a string', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isString(el)).to.eql(false);
    });

    it ('not see an array as a string', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isString(el)).to.eql(false);
    });

    it ('not see a function as a string', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isString(el)).to.eql(false);
    });
});

describe("String - isStringBetween", () => {
    it ('not see a number as a string between', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isStringBetween(el, 0, 1000)).to.eql(false);
    });

    it ('treat string values between ranges correctly', () => {
        let vals = [
            ['Hi', 1, 5],
            ['', 0, 1],
            ['Hello world!', 1, 13],
        ];
        for (let el of vals) expect(isStringBetween(el[0], el[1], el[2])).to.eql(true);
    });

    it ('treat string values between ranges with invalid values incorrectly', () => {
        let vals = [
            ['Hi', 1, 5],
            ['', 0, 1],
            ['Hello world!', 1, 13],
        ];
        for (let el of vals) expect(isStringBetween(el[0], `${el[1]}`, el[2])).to.eql(false);
        for (let el of vals) expect(isStringBetween(el[0], el[1], `${el[2]}`)).to.eql(false);
    });

    it ('treat string values below lower bound as false', () => {
        let vals = [
            ['Peter', 8, 100],
            ['', 1, 50],
        ];
        for (let el of vals) expect(isStringBetween(el[0], el[1], el[2])).to.eql(false);
    });

    it ('treat string values at lower bound as true', () => {
        let vals = [
            ['Peter', 5, 100],
            ['', 0, 50],
        ];
        for (let el of vals) expect(isStringBetween(el[0], el[1], el[2])).to.eql(true);
    });

    it ('treat string values above upper bound as false', () => {
        let vals = [
            ['Peters Magic Castle', 5, 18],
            ['foo', 0, 2],
        ];
        for (let el of vals) expect(isStringBetween(el[0], el[1], el[2])).to.eql(false);
    });

    it ('treat string values at upper bound as true', () => {
        let vals = [
            ['Peters Magic Castle', 5, 19],
            ['foo', 0, 3],
        ];
        for (let el of vals) expect(isStringBetween(el[0], el[1], el[2])).to.eql(true);
    });

    it ('returns false when passed a min that is higher than max', () => {
        expect(isStringBetween('Hello there', 15, 10)).to.eql(false);
    });

    it ('returns false when passed a min that is equal to max', () => {
        expect(isStringBetween('Hello there', 9, 9)).to.eql(false);
    });

    it ('autotrims string values', () => {
        let vals = [
            ['   foo   ', 0, 3]
        ];
        for (let el of vals) expect(isStringBetween(el[0], el[1], el[2])).to.eql(true);
    });

    it ('does not autotrim string values when overriding default', () => {
        let vals = [
            ['   foo   ', 0, 3]
        ];
        for (let el of vals) expect(isStringBetween(el[0], el[1], el[2], false)).to.eql(false);
    });

    it ('not see a boolean as a string between', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isStringBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see a regex as a string between', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isStringBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see an object as a string between', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isStringBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see a nullable as a string between', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isStringBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see a date as a string between', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isStringBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see an array as a string between', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isStringBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see a function as a string between', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isStringBetween(el, 0, 1000)).to.eql(false);
    });
});

describe("String - isNotEmptyString", () => {
    it ('see a non-empty string as a not empty string', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNotEmptyString(el)).to.eql(true);
    });

    it ('see an empty string as an empty string', () => {
        expect(isNotEmptyString('')).to.eql(false);
    });

    it ('sees a string with only spaces as an empty string by default', () => {
        expect(isNotEmptyString(' ')).to.eql(false);
        expect(isNotEmptyString('   ')).to.eql(false);
        expect(isNotEmptyString('               ')).to.eql(false);
    });

    it ('allows seeing a string with only spaces as a non-empty string by passing trimmed=false', () => {
        expect(isNotEmptyString(' ', false)).to.eql(true);
        expect(isNotEmptyString('   ', false)).to.eql(true);
        expect(isNotEmptyString('               ', false)).to.eql(true);
    });

    it ('not see a numeric value as a not empty string', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isNotEmptyString(el)).to.eql(false);
    });

    it ('not see a boolean as a not empty string', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNotEmptyString(el)).to.eql(false);
    });

    it ('not see a regex as a not empty string', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNotEmptyString(el)).to.eql(false);
    });

    it ('not see an object as a not empty string', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNotEmptyString(el)).to.eql(false);
    });

    it ('not see a nullable as a not empty string', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNotEmptyString(el)).to.eql(false);
    });

    it ('not see a date as a not empty string', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNotEmptyString(el)).to.eql(false);
    });

    it ('not see an array as a not empty string', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNotEmptyString(el)).to.eql(false);
    });

    it ('not see a function as a not empty string', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNotEmptyString(el)).to.eql(false);
    });
});
