'use strict';

import isFormData from '../../src/formdata/is';
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

describe("FormData - isFormData", () => {
    it ('not see a string as formdata', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isFormData(el)).toEqual(false);
    });

    it ('not see a numeric value as formdata', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isFormData(el)).toEqual(false);
    });

    it ('not see a boolean as formdata', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isFormData(el)).toEqual(false);
    });

    it ('not see a regex as formdata', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isFormData(el)).toEqual(false);
    });

    it ('not see an object as formdata', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isFormData(el)).toEqual(false);
    });

    it ('not see a nullable as formdata', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isFormData(el)).toEqual(false);
    });

    it ('not see a date as formdata', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isFormData(el)).toEqual(false);
    });

    it ('not see an array as formdata', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isFormData(el)).toEqual(false);
    });

    it ('not see a function as formdata', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isFormData(el)).toEqual(false);
    });

    it ('see formdata as formdata', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isFormData(el)).toEqual(true);
    });
});
