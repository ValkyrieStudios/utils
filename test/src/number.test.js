'use strict';

import isNumber         from '../../src/number/is';
import isNumberBetween  from '../../src/number/isBetween';
import isNumericalNaN   from '../../src/number/isNumericalNaN';
import toPercentage     from '../../src/number/toPercentage';
import round            from '../../src/number/round';
import randomBetween    from '../../src/number/randomBetween';
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

describe("Number - isNumber", () => {
    it ('not see a string as a number', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNumber(el)).toEqual(false);
    });

    it ('see a numeric value as a number', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isNumber(el)).toEqual(true);
    });

    it ('not see a boolean as a number', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNumber(el)).toEqual(false);
    });

    it ('not see a regex as a number', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNumber(el)).toEqual(false);
    });

    it ('not see an object as a number', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNumber(el)).toEqual(false);
    });

    it ('not see a nullable as a number', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNumber(el)).toEqual(false);
    });

    it ('not see a date as a number', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNumber(el)).toEqual(false);
    });

    it ('not see an array as a number', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNumber(el)).toEqual(false);
    });

    it ('not see a function as a number', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNumber(el)).toEqual(false);
    });

    it ('not see formdata as a number', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isNumber(el)).toEqual(false);
    });
});

describe("Number - isNumberBetween", () => {
    it ('not see a string as a number between', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).toEqual(false);
    });

    it ('treat numeric values between ranges correctly', () => {
        let vals = [
            [0, -1, 1],
            [-32, -100, -10],
            [3, 1, 9],
            [.1, 0, .2],
        ];
        for (let el of vals) expect(isNumberBetween(el[0], el[1], el[2])).toEqual(true);
    });

    it ('treat numeric values between ranges with invalid values incorrectly', () => {
        let vals = [
            [0, -1, -1],
            [-1, -100, -10],
            [3, 1, 9],
            [.1, 0, .2],

        ];
        for (let el of vals) expect(isNumberBetween(el[0], `${el[1]}`, el[2])).toEqual(false);
        for (let el of vals) expect(isNumberBetween(el[0], el[1], `${el[2]}`)).toEqual(false);
    });

    it ('treat numeric values below lower bound as false', () => {
        let vals = [
            [-1, 0, 1],
            [-101, -100, -10],
            [0, 1, 9],
            [-.1, 0, .2],

        ];
        for (let el of vals) expect(isNumberBetween(el[0], el[1], el[2])).toEqual(false);
    });

    it ('treat numeric values at lower bound as true', () => {
        let vals = [
            [0, 0, 1],
            [-100, -100, -10],
            [1, 1, 9],
            [0, 0, .2],

        ];
        for (let el of vals) expect(isNumberBetween(el[0], el[1], el[2])).toEqual(true);
    });

    it ('treat numeric values above upper bound as false', () => {
        let vals = [
            [2, 0, 1],
            [-9, -100, -10],
            [10, 1, 9],
            [.3, 0, .2],

        ];
        for (let el of vals) expect(isNumberBetween(el[0], el[1], el[2])).toEqual(false);
    });

    it ('treat numeric values at upper bound as true', () => {
        let vals = [
            [1, 0, 1],
            [-10, -100, -10],
            [9, 1, 9],
            [.2, 0, .2],

        ];
        for (let el of vals) expect(isNumberBetween(el[0], el[1], el[2])).toEqual(true);
    });

    it ('not see a boolean as a number between', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).toEqual(false);
    });

    it ('not see a regex as a number between', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).toEqual(false);
    });

    it ('not see an object as a number between', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).toEqual(false);
    });

    it ('not see a nullable as a number between', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).toEqual(false);
    });

    it ('not see a date as a number between', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).toEqual(false);
    });

    it ('not see an array as a number between', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).toEqual(false);
    });

    it ('not see a function as a number between', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).toEqual(false);
    });

    it ('not see formdata as a number between', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).toEqual(false);
    });
});

describe("Number - toPercentage", () => {
    it ('should correctly calculate the percentage', () => {
        expect(toPercentage(0.5)).toEqual(50);
    });

    it ('should correctly calculate the percentage with precision', () => {
        expect(toPercentage(0.50106579, 0)).toEqual(50);
        expect(toPercentage(0.50106579, 1)).toEqual(50.1);
        expect(toPercentage(0.50116579, 2)).toEqual(50.12);
        expect(toPercentage(0.50116579, 3)).toEqual(50.117);
        expect(toPercentage(0.50116579, 4)).toEqual(50.1166);
        expect(toPercentage(0.50116579, 5)).toEqual(50.11658);
    });

    it ('should correctly apply range logic when provided', () => {
        expect(toPercentage(5, 0, -10, 10)).toEqual(75);
        expect(toPercentage(-356, 0, -1000, 1000)).toEqual(32);
        expect(toPercentage(-356.52, 3, -1000, 1000)).toEqual(32.174);
        expect(toPercentage(0.005, 0, 0, 0.1)).toEqual(5);
    });

    it ('should throw an error if the value is not numeric', () => {
        expect(function () {
            toPercentage('hello', 2, 0, 1);
            toPercentage(false, 2, 0, 1);
        }).toThrowError(TypeError);
    });

    it ('should throw an error if the min is not numeric', () => {
        expect(function () {
            toPercentage(0.5, 2, false, 1);
            toPercentage(0.5, 2, 'Hello', 1);
        }).toThrowError(TypeError);
    });

    it ('should throw an error if the max is not numeric', () => {
        expect(function () {
            toPercentage(0.5, 2, 0, 'Hello');
            toPercentage(0.5, 2, 0, false);
        }).toThrowError(TypeError);
    });
});

describe("Number - isNumericalNaN", () => {
    it ('not see a valid number as a NaN', () => {
        expect(isNumericalNaN(42)).toEqual(false);
    });

    it ('not see a string as a NaN', () => {
        expect(isNumericalNaN('foo')).toEqual(false);
        expect(isNumericalNaN('NaN')).toEqual(false);
    });

    it ('not see an object as a NaN', () => {
        expect(isNumericalNaN({ foo: 'bar' })).toEqual(false);
    });

    it ('not see an array as a NaN', () => {
        expect(isNumericalNaN([0, 1, 2])).toEqual(false);
    });

    it ('see a NaN as a NaN', () => {
        expect(isNumericalNaN(NaN)).toEqual(true);
    });
});

describe("Number - round", () => {
    it ('should correctly round a value', () => {
        expect(round(5.123456789)).toEqual(5);
    });

    it ('should correctly round a value with precision', () => {
        expect(round(5.123456789, 0)).toEqual(5);
        expect(round(5.123456789, 1)).toEqual(5.1);
        expect(round(5.123456789, 2)).toEqual(5.12);
        expect(round(5.123456789, 3)).toEqual(5.123);
        expect(round(5.123456789, 4)).toEqual(5.1235);
        expect(round(5.123456789, 5)).toEqual(5.12346);
    });

    it ('should throw an error if the value is not numeric', () => {
        expect(function () {
            round('hello', 2);
        }).toThrowError(TypeError);
    });
});

describe("Number - randomBetween", () => {
    it ('should return a random number', () => {
        expect(randomBetween()).toEqual(jasmine.any(Number));
    });

    it ('should return a random number between min and max', () => {
        let between = true;
        for (let i = 0; i < 1000; i++) {
            const random = randomBetween(0, 100);
            if (random < 0 && random > 1000) between = false;
        }

        expect(between).toEqual(true);
    });

    it ('should return a unique random number over subsequent calls', () => {
        let cache = {};
        for (let i = 0; i < 100000; i++) {
            const random = randomBetween(0, 100);
            cache[`${random}`] = random;
        }
        expect(Object.keys(cache).length).toEqual(100000);
    });

    it ('should throw an error if the min/max is not numeric', () => {
        expect(function () {
            randomBetween('min', 2);
        }).toThrowError(TypeError);
        expect(function () {
            randomBetween(2, 'max');
        }).toThrowError(TypeError);
        expect(function () {
            randomBetween(2, 5);
        }).not.toThrowError(TypeError);
    });
});
