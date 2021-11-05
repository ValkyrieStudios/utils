'use strict';

import isString         from '../../src/string/is';
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
    fnFormDataValues,
    fnNullables,
} from '../constants';

describe("String - isString", () => {
    it ('see a string as a string', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isString(el)).toEqual(true);
    });

    it ('not see a numeric value as a string', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isString(el)).toEqual(false);
    });

    it ('not see a boolean as a string', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isString(el)).toEqual(false);
    });

    it ('not see a regex as a string', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isString(el)).toEqual(false);
    });

    it ('not see an object as a string', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isString(el)).toEqual(false);
    });

    it ('not see a nullable as a string', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isString(el)).toEqual(false);
    });

    it ('not see a date as a string', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isString(el)).toEqual(false);
    });

    it ('not see an array as a string', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isString(el)).toEqual(false);
    });

    it ('not see a function as a string', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isString(el)).toEqual(false);
    });

    it ('not see formdata as a string', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isString(el)).toEqual(false);
    });
});

describe("String - isNotEmptyString", () => {
    it ('see a non-empty string as a not empty string', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNotEmptyString(el)).toEqual(true);
    });

    it ('see an empty string as an empty string', () => {
        expect(isNotEmptyString('')).toEqual(false);
    });

    it ('sees a string with only spaces as an empty string by default', () => {
        expect(isNotEmptyString(' ')).toEqual(false);
        expect(isNotEmptyString('   ')).toEqual(false);
        expect(isNotEmptyString('               ')).toEqual(false);
    });

    it ('allows seeing a string with only spaces as a non-empty string by passing trimmed=false', () => {
        expect(isNotEmptyString(' ', false)).toEqual(true);
        expect(isNotEmptyString('   ', false)).toEqual(true);
        expect(isNotEmptyString('               ', false)).toEqual(true);
    });

    it ('not see a numeric value as a not empty string', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isNotEmptyString(el)).toEqual(false);
    });

    it ('not see a boolean as a not empty string', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNotEmptyString(el)).toEqual(false);
    });

    it ('not see a regex as a not empty string', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNotEmptyString(el)).toEqual(false);
    });

    it ('not see an object as a not empty string', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNotEmptyString(el)).toEqual(false);
    });

    it ('not see a nullable as a not empty string', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNotEmptyString(el)).toEqual(false);
    });

    it ('not see a date as a not empty string', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNotEmptyString(el)).toEqual(false);
    });

    it ('not see an array as a not empty string', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNotEmptyString(el)).toEqual(false);
    });

    it ('not see a function as a not empty string', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNotEmptyString(el)).toEqual(false);
    });

    it ('not see formdata as a not empty string', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isNotEmptyString(el)).toEqual(false);
    });

});
