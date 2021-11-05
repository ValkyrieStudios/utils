'use strict';

import isRegExp from '../../src/regexp/is';
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

describe("RegExp - isRegExp", () => {
    it ('not see a string as a regex', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isRegExp(el)).toEqual(false);
    });

    it ('not see a numeric value as a regex', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isRegExp(el)).toEqual(false);
    });

    it ('not see a boolean as a regex', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isRegExp(el)).toEqual(false);
    });

    it ('see a regex as a regex', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isRegExp(el)).toEqual(true);
    });

    it ('not see an object as a regex', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isRegExp(el)).toEqual(false);
    });

    it ('not see a nullable as a regex', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isRegExp(el)).toEqual(false);
    });

    it ('not see a date as a regex', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isRegExp(el)).toEqual(false);
    });

    it ('not see an array as a regex', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isRegExp(el)).toEqual(false);
    });

    it ('not see a function as a regex', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isRegExp(el)).toEqual(false);
    });

    it ('not see formdata as a regex', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isRegExp(el)).toEqual(false);
    });
});
