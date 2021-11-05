'use strict';

import isBoolean from '../../src/boolean/is';
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

describe("Boolean - isBoolean", () => {
    it ('not see a string as a boolean', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isBoolean(el)).toEqual(false);
    });

    it ('not see a numeric value as a boolean', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isBoolean(el)).toEqual(false);
    });

    it ('see a boolean as a boolean', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isBoolean(el)).toEqual(true);
    });

    it ('not see a regex as a boolean', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isBoolean(el)).toEqual(false);
    });

    it ('not see an object as a boolean', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isBoolean(el)).toEqual(false);
    });

    it ('not see a nullable as a boolean', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isBoolean(el)).toEqual(false);
    });

    it ('not see a date as a boolean', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isBoolean(el)).toEqual(false);
    });

    it ('not see an array as a boolean', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isBoolean(el)).toEqual(false);
    });

    it ('not see a function as a boolean', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isBoolean(el)).toEqual(false);
    });

    it ('not see formdata as a boolean', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isBoolean(el)).toEqual(false);
    });
});
