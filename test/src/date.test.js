'use strict';

import isDate from '../../src/date/is';
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

describe("Date - isDate", () => {
    it ('not see a string as a date', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isDate(el)).toEqual(false);
    });

    it ('not see a numeric value as a date', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isDate(el)).toEqual(false);
    });

    it ('not see a boolean as a date', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isDate(el)).toEqual(false);
    });

    it ('not see a regex as a date', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isDate(el)).toEqual(false);
    });

    it ('not see an object as a date', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isDate(el)).toEqual(false);
    });

    it ('not see a nullable as a date', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isDate(el)).toEqual(false);
    });

    it ('see a date as a date', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isDate(el)).toEqual(true);
    });

    it ('not see an array as a date', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isDate(el)).toEqual(false);
    });

    it ('not see a function as a date', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isDate(el)).toEqual(false);
    });

    it ('not see formdata as a date', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isDate(el)).toEqual(false);
    });
});
