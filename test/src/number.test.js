'use strict';

import isNumber         from '../../src/number/is';
import isNumberAbove    from '../../src/number/isAbove';
import isNumberBelow    from '../../src/number/isBelow';
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
    fnNullables,
} from '../constants';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("Number - isNumber", () => {
    it ('not see a string as a number', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNumber(el)).to.eql(false);
    });

    it ('see a numeric value as a number', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isNumber(el)).to.eql(true);
    });

    it ('not see a numerical nan as a number', () => {
        expect(isNumber(1/0)).to.eql(false);
    });

    it ('not see a boolean as a number', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNumber(el)).to.eql(false);
    });

    it ('not see a regex as a number', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNumber(el)).to.eql(false);
    });

    it ('not see an object as a number', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNumber(el)).to.eql(false);
    });

    it ('not see a nullable as a number', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNumber(el)).to.eql(false);
    });

    it ('not see a date as a number', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNumber(el)).to.eql(false);
    });

    it ('not see an array as a number', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNumber(el)).to.eql(false);
    });

    it ('not see a function as a number', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNumber(el)).to.eql(false);
    });
});

describe("Number - isNumberBelow", () => {
    it ('not see a string as a number', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNumberBelow(el, 0)).to.eql(false);
    });

    it ('treat numeric values below max correctly', () => {
        let vals = [
            [0, 1],
            [-32, -10],
            [3, 9],
            [.1, .2],
        ];
        for (let el of vals) expect(isNumberBelow(el[0], el[1])).to.eql(true);
    });

    it ('treat numeric values above max as false', () => {
        let vals = [
            [1, 0],
            [-99, -100],
            [9, 1],
            [-.05, -.1],
        ];
        for (let el of vals) expect(isNumberBelow(el[0], el[1])).to.eql(false);
    });

    it ('treat numeric values at max as false', () => {
        let vals = [0, -100, 1, 0, .56, .89];
        for (let el of vals) expect(isNumberBelow(el, el)).to.eql(false);
    });

    it ('not see a boolean as a number between', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNumberBelow(el, 0)).to.eql(false);
    });

    it ('not see a regex as a number between', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNumberBelow(el, 0)).to.eql(false);
    });

    it ('not see an object as a number between', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNumberBelow(el, 0)).to.eql(false);
    });

    it ('not see a nullable as a number between', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNumberBelow(el, 0)).to.eql(false);
    });

    it ('not see a date as a number between', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNumberBelow(el, 0)).to.eql(false);
    });

    it ('not see an array as a number between', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNumberBelow(el, 0)).to.eql(false);
    });

    it ('not see a function as a number between', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNumberBelow(el, 0)).to.eql(false);
    });

    it ('not see a boolean as a number between', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNumberBelow(0, el)).to.eql(false);
    });

    it ('not see a regex as a number between', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNumberBelow(0, el)).to.eql(false);
    });

    it ('not see an object as a number between', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNumberBelow(0, el)).to.eql(false);
    });

    it ('not see a nullable as a number between', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNumberBelow(0, el)).to.eql(false);
    });

    it ('not see a date as a number between', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNumberBelow(0, el)).to.eql(false);
    });

    it ('not see an array as a number between', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNumberBelow(0, el)).to.eql(false);
    });

    it ('not see a function as a number between', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNumberBelow(0, el)).to.eql(false);
    });
});

describe("Number - isNumberAbove", () => {
    it ('not see a string as a number', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNumberAbove(el, 0)).to.eql(false);
    });

    it ('treat numeric values above min correctly', () => {
        let vals = [
            [1, 0],
            [-10, -32],
            [9, 3],
            [.2, .1],
        ];
        for (let el of vals) expect(isNumberAbove(el[0], el[1])).to.eql(true);
    });

    it ('treat numeric values below min as false', () => {
        let vals = [
            [0, 1],
            [-100, -99],
            [1, 9],
            [-.1, -.05],
        ];
        for (let el of vals) expect(isNumberAbove(el[0], el[1])).to.eql(false);
    });

    it ('treat numeric values at min as false', () => {
        let vals = [0, -100, 1, 0, .56, .89];
        for (let el of vals) expect(isNumberAbove(el, el)).to.eql(false);
    });

    it ('not see a boolean as a number between', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNumberAbove(el, 0)).to.eql(false);
    });

    it ('not see a regex as a number between', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNumberAbove(el, 0)).to.eql(false);
    });

    it ('not see an object as a number between', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNumberAbove(el, 0)).to.eql(false);
    });

    it ('not see a nullable as a number between', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNumberAbove(el, 0)).to.eql(false);
    });

    it ('not see a date as a number between', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNumberAbove(el, 0)).to.eql(false);
    });

    it ('not see an array as a number between', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNumberAbove(el, 0)).to.eql(false);
    });

    it ('not see a function as a number between', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNumberAbove(el, 0)).to.eql(false);
    });

    it ('not see a boolean as a number between', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNumberAbove(0, el)).to.eql(false);
    });

    it ('not see a regex as a number between', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNumberAbove(0, el)).to.eql(false);
    });

    it ('not see an object as a number between', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNumberAbove(0, el)).to.eql(false);
    });

    it ('not see a nullable as a number between', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNumberAbove(0, el)).to.eql(false);
    });

    it ('not see a date as a number between', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNumberAbove(0, el)).to.eql(false);
    });

    it ('not see an array as a number between', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNumberAbove(0, el)).to.eql(false);
    });

    it ('not see a function as a number between', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNumberAbove(0, el)).to.eql(false);
    });
});

describe("Number - isNumberBetween", () => {
    it ('not see a string as a number between', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).to.eql(false);
    });

    it ('treat numeric values between ranges correctly', () => {
        let vals = [
            [0, -1, 1],
            [-32, -100, -10],
            [3, 1, 9],
            [.1, 0, .2],
        ];
        for (let el of vals) expect(isNumberBetween(el[0], el[1], el[2])).to.eql(true);
    });

    it ('treat numeric values between ranges with invalid values incorrectly', () => {
        let vals = [
            [0, -1, -1],
            [-1, -100, -10],
            [3, 1, 9],
            [.1, 0, .2],
        ];
        for (let el of vals) expect(isNumberBetween(el[0], `${el[1]}`, el[2])).to.eql(false);
        for (let el of vals) expect(isNumberBetween(el[0], el[1], `${el[2]}`)).to.eql(false);
    });

    it ('treat numeric values below lower bound as false', () => {
        let vals = [
            [-1, 0, 1],
            [-101, -100, -10],
            [0, 1, 9],
            [-.1, 0, .2],
        ];
        for (let el of vals) expect(isNumberBetween(el[0], el[1], el[2])).to.eql(false);
    });

    it ('treat numeric values at lower bound as true', () => {
        let vals = [
            [0, 0, 1],
            [-100, -100, -10],
            [1, 1, 9],
            [0, 0, .2],
        ];
        for (let el of vals) expect(isNumberBetween(el[0], el[1], el[2])).to.eql(true);
    });

    it ('treat numeric values above upper bound as false', () => {
        let vals = [
            [2, 0, 1],
            [-9, -100, -10],
            [10, 1, 9],
            [.3, 0, .2],
        ];
        for (let el of vals) expect(isNumberBetween(el[0], el[1], el[2])).to.eql(false);
    });

    it ('treat numeric values at upper bound as true', () => {
        let vals = [
            [1, 0, 1],
            [-10, -100, -10],
            [9, 1, 9],
            [.2, 0, .2],
        ];
        for (let el of vals) expect(isNumberBetween(el[0], el[1], el[2])).to.eql(true);
    });

    it ('returns false when passed a min that is higher than max', () => {
        expect(isNumberBetween(9, 15, 10)).to.eql(false);
    });

    it ('returns false when passed a min that is equal to max', () => {
        expect(isNumberBetween(9, 9, 9)).to.eql(false);
    });

    it ('not see a boolean as a number between', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see a regex as a number between', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see an object as a number between', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see a nullable as a number between', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see a date as a number between', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see an array as a number between', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see a function as a number between', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNumberBetween(el, 0, 1000)).to.eql(false);
    });

    it ('not see a boolean as a number between', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNumberBetween(0, el, 1000)).to.eql(false);
    });

    it ('not see a regex as a number between', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNumberBetween(0, el, 1000)).to.eql(false);
    });

    it ('not see an object as a number between', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNumberBetween(0, el, 1000)).to.eql(false);
    });

    it ('not see a nullable as a number between', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNumberBetween(0, el, 1000)).to.eql(false);
    });

    it ('not see a date as a number between', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNumberBetween(0, el, 1000)).to.eql(false);
    });

    it ('not see an array as a number between', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNumberBetween(0, el, 1000)).to.eql(false);
    });

    it ('not see a function as a number between', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNumberBetween(0, el, 1000)).to.eql(false);
    });

    it ('not see a boolean as a number between', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNumberBetween(0, 0, el)).to.eql(false);
    });

    it ('not see a regex as a number between', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNumberBetween(0, 0, el)).to.eql(false);
    });

    it ('not see an object as a number between', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isNumberBetween(0, 0, el)).to.eql(false);
    });

    it ('not see a nullable as a number between', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNumberBetween(0, 0, el)).to.eql(false);
    });

    it ('not see a date as a number between', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNumberBetween(0, 0, el)).to.eql(false);
    });

    it ('not see an array as a number between', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNumberBetween(0, 0, el)).to.eql(false);
    });

    it ('not see a function as a number between', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNumberBetween(0, 0, el)).to.eql(false);
    });
});

describe("Number - toPercentage", () => {
    it ('should correctly calculate the percentage', () => {
        expect(toPercentage(0.5)).to.eql(50);
    });

    it ('should correctly calculate the percentage with precision', () => {
        expect(toPercentage(0.50106579, 0)).to.eql(50);
        expect(toPercentage(0.50106579, 1)).to.eql(50.1);
        expect(toPercentage(0.50116579, 2)).to.eql(50.12);
        expect(toPercentage(0.50116579, 3)).to.eql(50.117);
        expect(toPercentage(0.50116579, 4)).to.eql(50.1166);
        expect(toPercentage(0.50116579, 5)).to.eql(50.11658);
    });

    it ('should correctly apply range logic when provided', () => {
        expect(toPercentage(5, 0, -10, 10)).to.eql(75);
        expect(toPercentage(-356, 0, -1000, 1000)).to.eql(32);
        expect(toPercentage(-356.52, 3, -1000, 1000)).to.eql(32.174);
        expect(toPercentage(0.005, 0, 0, 0.1)).to.eql(5);
    });

    it ('should throw an error if the value is not numeric', () => {
        expect(function () {
            toPercentage('hello', 2, 0, 1);
            toPercentage(false, 2, 0, 1);
        }).to.throw(TypeError);
    });

    it ('should throw an error if the min is not numeric', () => {
        expect(function () {
            toPercentage(0.5, 2, false, 1);
            toPercentage(0.5, 2, 'Hello', 1);
        }).to.throw(TypeError);
    });

    it ('should throw an error if the max is not numeric', () => {
        expect(function () {
            toPercentage(0.5, 2, 0, 'Hello');
            toPercentage(0.5, 2, 0, false);
        }).to.throw(TypeError);
    });
});

describe("Number - isNumericalNaN", () => {
    it ('not see a valid number as a NaN', () => {
        expect(isNumericalNaN(42)).to.eql(false);
    });

    it ('not see a string as a NaN', () => {
        expect(isNumericalNaN('foo')).to.eql(false);
        expect(isNumericalNaN('NaN')).to.eql(false);
    });

    it ('not see an object as a NaN', () => {
        expect(isNumericalNaN({ foo: 'bar' })).to.eql(false);
    });

    it ('not see an array as a NaN', () => {
        expect(isNumericalNaN([0, 1, 2])).to.eql(false);
    });

    it ('see a NaN as a NaN', () => {
        expect(isNumericalNaN(NaN)).to.eql(true);
    });

    it ('sees infinity as a NaN', () => {
        expect(isNumericalNaN(Infinity)).to.eql(true);
    });
});

describe("Number - round", () => {
    it ('should correctly round a value', () => {
        expect(round(5.123456789)).to.eql(5);
    });

    it ('should correctly round a value with precision', () => {
        expect(round(5.123456789, 0)).to.eql(5);
        expect(round(5.123456789, 1)).to.eql(5.1);
        expect(round(5.123456789, 2)).to.eql(5.12);
        expect(round(5.123456789, 3)).to.eql(5.123);
        expect(round(5.123456789, 4)).to.eql(5.1235);
        expect(round(5.123456789, 5)).to.eql(5.12346);
        expect(round(42.139691918126184, 3)).to.eql(42.14);
        expect(round(42.134691918126184, 3)).to.eql(42.135);
    });

    it ('should throw an error if the value is not numeric', () => {
        expect(function () {
            round('hello', 2);
        }).to.throw(TypeError);
    });
});

describe("Number - randomBetween", () => {
    it ('should return a random number', () => {
        assert.typeOf(randomBetween(), 'Number');
    });

    it ('should return a random number between min and max', () => {
        let between = true;
        for (let i = 0; i < 1000; i++) {
            const random = randomBetween(0, 100);
            if (random < 0 && random > 1000) between = false;
        }

        expect(between).to.eql(true);
    });

    it ('should return a unique random number over subsequent calls', () => {
        let cache = {};
        for (let i = 0; i < 100000; i++) {
            const random = randomBetween(0, 100);
            cache[`${random}`] = random;
        }
        expect(Object.keys(cache).length).to.eql(100000);
    });

    it ('should throw an error if the min/max is not numeric', () => {
        expect(function () {
            randomBetween('min', 2);
        }).to.throw(TypeError);
        expect(function () {
            randomBetween(2, 'max');
        }).to.throw(TypeError);
        expect(function () {
            randomBetween(2, 5);
        }).not.to.throw(TypeError);
    });
});
