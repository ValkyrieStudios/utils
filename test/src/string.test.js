'use strict';

import isString         from '../../src/string/is';
import isStringBetween  from '../../src/string/isBetween';
import isNotEmptyString from '../../src/string/isNotEmpty';
import shorten          from '../../src/string/shorten';
import humanizeBytes    from '../../src/string/humanizeBytes';
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

describe("String", () => {
    describe("isString", () => {
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

    describe("isStringBetween", () => {
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

    describe("isNotEmptyString", () => {
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

    describe("shorten", () => {

        it ('returns original text when text is not beyond boundaries of length', () => {
            expect(shorten('Mama Mia', 50)).to.eql('Mama Mia');
        });

        it ('autotrims text and returns autotrimmed text when text is not beyond boundaries of length', () => {
            expect(shorten('   Mama Mia    ', 10)).to.eql('Mama Mia');
        });

        it ('autotrims text and returns autotrimmed shortened text when text is beyond boundaries of length', () => {
            expect(shorten('  Mama Mia  ', 4)).to.eql('Mama...');
        });

        it ('uses ... as the default postfix', () => {
            expect(shorten('To the moon and beyond', 11)).to.eql('To the moon...');
        });

        it ('allows setting a custom postfix', () => {
            expect(shorten('To the moon and beyond', 11, '..')).to.eql('To the moon..');
        });

        it ('allows setting an empty string as postfix', () => {
            expect(shorten('To the moon and beyond', 11, '')).to.eql('To the moon');
        });

        it ('does not autotrim the postfix', () => {
            expect(shorten('To the moon and beyond', 11, ' ')).to.eql('To the moon ');
        });

        //  Value sanity checks

        it ('returns false when passed a numeric value', () => {
            let vals = fnNumericValues();
            for (let el of vals) expect(shorten(el)).to.eql(false);
        });

        it ('returns false when passed a boolean value', () => {
            let vals = fnBooleanValues();
            for (let el of vals) expect(shorten(el)).to.eql(false);
        });

        it ('returns false when passed a regex value', () => {
            let vals = fnRegexValues();
            for (let el of vals) expect(shorten(el)).to.eql(false);
        });

        it ('returns false when passed an object value', () => {
            let vals = fnObjectValues();
            for (let el of vals) expect(shorten(el)).to.eql(false);
        });

        it ('returns false when passed a nullable value', () => {
            let vals = fnNullables();
            for (let el of vals) expect(shorten(el)).to.eql(false);
        });

        it ('returns false when passed a date value', () => {
            let vals = fnDateValues();
            for (let el of vals) expect(shorten(el)).to.eql(false);
        });

        it ('returns false when passed an array value', () => {
            let vals = fnArrayValues();
            for (let el of vals) expect(shorten(el)).to.eql(false);
        });

        it ('returns false when passed a function value', () => {
            let vals = fnFunctionValues();
            for (let el of vals) expect(shorten(el)).to.eql(false);
        });

        //  Length sanity checks

        it ('returns false when passed a string as length value', () => {
            let vals = fnStringValues();
            for (let el of vals) expect(shorten('Hello world', el)).to.eql(false);
        });

        it ('returns false when passed a boolean as length value', () => {
            let vals = fnBooleanValues();
            for (let el of vals) expect(shorten('Hello world', el)).to.eql(false);
        });

        it ('returns false when passed a regex as length value', () => {
            let vals = fnRegexValues();
            for (let el of vals) expect(shorten('Hello world', el)).to.eql(false);
        });

        it ('returns false when passed an object as length value', () => {
            let vals = fnObjectValues();
            for (let el of vals) expect(shorten('Hello world', el)).to.eql(false);
        });

        it ('returns false when passed a nullable as length value', () => {
            let vals = fnNullables();
            for (let el of vals) expect(shorten('Hello world', el)).to.eql(false);
        });

        it ('returns false when passed a date as length value', () => {
            let vals = fnDateValues();
            for (let el of vals) expect(shorten('Hello world', el)).to.eql(false);
        });

        it ('returns false when passed an array as length value', () => {
            let vals = fnArrayValues();
            for (let el of vals) expect(shorten('Hello world', el)).to.eql(false);
        });

        it ('returns false when passed a function as length value', () => {
            let vals = fnFunctionValues();
            for (let el of vals) expect(shorten('Hello world', el)).to.eql(false);
        });

        //  Postfix sanity checks

        it ('returns false when passed a number as postfix value', () => {
            let vals = fnNumericValues();
            for (let el of vals) expect(shorten('Hello world', 10, el)).to.eql(false);
        });

        it ('returns false when passed a boolean as postfix value', () => {
            let vals = fnBooleanValues();
            for (let el of vals) expect(shorten('Hello world', 10, el)).to.eql(false);
        });

        it ('returns false when passed a regex as postfix value', () => {
            let vals = fnRegexValues();
            for (let el of vals) expect(shorten('Hello world', 10, el)).to.eql(false);
        });

        it ('returns false when passed an object as postfix value', () => {
            let vals = fnObjectValues();
            for (let el of vals) expect(shorten('Hello world', 10, el)).to.eql(false);
        });

        it ('returns false when passed a nullable as postfix value with the exception of undefined', () => {
            expect(shorten('Hello world', 10, null)).to.eql(false);
            expect(shorten('Hello world', 10, undefined)).to.eql('Hello worl...');
            expect(shorten('Hello world', 10, NaN)).to.eql(false);
        });

        it ('returns false when passed a date as postfix value', () => {
            let vals = fnDateValues();
            for (let el of vals) expect(shorten('Hello world', 10, el)).to.eql(false);
        });

        it ('returns false when passed an array as postfix value', () => {
            let vals = fnArrayValues();
            for (let el of vals) expect(shorten('Hello world', 10, el)).to.eql(false);
        });

        it ('returns false when passed a function as postfix value', () => {
            let vals = fnFunctionValues();
            for (let el of vals) expect(shorten('Hello world', 10, el)).to.eql(false);
        });

    });

    describe("humanizeBytes", () => {

        const val_tests = [
            [1024, '1 KB'],
            [1500, '1.46 KB'],
            [3584, '3.5 KB'],
            [9799, '9.57 KB'],
            [58432, '57.06 KB'],
            [97432, '95.15 KB'],
            [432443, '422.31 KB'],
            [857534, '837.44 KB'],
            [1000000, '976.56 KB'],
            [1048575, '1,024 KB'],
            [5242880, '5 MB'],
            [1504230, '1.43 MB'],
            [3584432, '3.42 MB'],
            [9799432, '9.35 MB'],
            [584324, '570.63 KB'],
            [9743432, '9.29 MB'],
            [43244332, '41.24 MB'],
            [85753443, '81.78 MB'],
            [100000032, '95.37 MB'],
            [1073741823, '1,024 MB'],
            [374237489237, '348.54 GB'],
            [4893290423489, '4.45 TB'],
            [4327963279469432, '3.84 PB'],
            [84903298490, '79.07 GB'],
            [4903278490, '4.57 GB'],
            [438274237890, '408.17 GB'],
            [4328904892322, '3.94 TB'],
            [974238788, '929.11 MB'],
            [47328748923747923479, '41.05 EB'],
        ];

        it ('[humanizeBytes] Should return 0 bytes when called with non-alpha-numerical value or 0', () => {
            for (const el of [{a:1}, [0,1,2], true, new Date(), /1/g, false, 'hello', 'abc', 0, '0', '-0']) {
                expect(humanizeBytes(el)).to.eql('0 bytes');
            }
        });

        it ('[humanizeBytes] Should return a positive number between 1 and 1024 (not including 1024) as bytes', () => {
            for (let i = 1; i < 1024; i++) {
                if (i < 1000) {
                    expect(humanizeBytes(i)).to.eql(`${i} bytes`);
                } else if (i < 1010) {
                    expect(humanizeBytes(i)).to.eql(`1,00${i - 1000} bytes`);
                } else {
                    expect(humanizeBytes(i)).to.eql(`1,0${i - 1000} bytes`);
                }
            }
        });

        it ('[humanizeBytes] Should return a negative number between 1 and 1024 (not including 1024) as bytes', () => {
            for (let i = -1; i > -1024; i--) {
                if (i > -1000) {
                    expect(humanizeBytes(i)).to.eql(`${i} bytes`);
                } else if (i > -1010) {
                    expect(humanizeBytes(i)).to.eql(`-1,00${Math.abs(i + 1000)} bytes`);
                } else {
                    expect(humanizeBytes(i)).to.eql(`-1,0${Math.abs(i + 1000)} bytes`);
                }
            }
        });

        it ('[humanizeBytes] Should return a positive number between 1 and 1024 formatted as string (not including 1024) as bytes', () => {
            for (let i = 1; i < 1024; i++) {
                if (i < 1000) {
                    expect(humanizeBytes(`${i}`)).to.eql(`${i} bytes`);
                } else if (i < 1010) {
                    expect(humanizeBytes(`${i}`)).to.eql(`1,00${i - 1000} bytes`);
                } else {
                    expect(humanizeBytes(`${i}`)).to.eql(`1,0${i - 1000} bytes`);
                }
            }
        });

        it ('[humanizeBytes] Should return a negative number between 1 and 1024 formatted as string (not including 1024) as bytes', () => {
            for (let i = -1; i > -1024; i--) {
                if (i > -1000) {
                    expect(humanizeBytes(`${i}`)).to.eql(`${i} bytes`);
                } else if (i > -1010) {
                    expect(humanizeBytes(`${i}`)).to.eql(`-1,00${Math.abs(i + 1000)} bytes`);
                } else {
                    expect(humanizeBytes(`${i}`)).to.eql(`-1,0${Math.abs(i + 1000)} bytes`);
                }
            }
        });

        it ('[humanizeBytes] Should correctly convert a positive number', () => {
            for (const el of val_tests) expect(humanizeBytes(el[0])).to.eql(el[1]);
        });

        it ('[humanizeBytes] Should correctly convert a negative number', () => {
            for (const el of val_tests) expect(humanizeBytes(-el[0])).to.eql(`-${el[1]}`);
        });

        it ('[humanizeBytes] Should correctly convert a positive number formatted as string', () => {
            for (const el of val_tests) expect(humanizeBytes(`${el[0]}`)).to.eql(el[1]);
        });

        it ('[humanizeBytes] Should correctly convert a negative number formatted as string', () => {
            for (const el of val_tests) expect(humanizeBytes(`-${el[0]}`)).to.eql(`-${el[1]}`);
        });

        it ('[humanizeBytes] Should allow overriding precision', () => {
            const val_tests = [
                [1024, 10, '1 KB'],
                [1500, 1, '1.5 KB'],
                [1500, 2, '1.46 KB'],
                [1500, 3, '1.465 KB'],
                [3584, 1, '3.5 KB'],
                [3584, 2, '3.5 KB'],
                [3584, 3, '3.5 KB'],
                [9799, 1, '9.6 KB'],
                [9799, 4, '9.5693 KB'],
                [58432, 1, '57.1 KB'],
                [58432, 2, '57.06 KB'],
                [58432, 3, '57.063 KB'],
                [4893290423489, 5, '4.45042 TB'],
                [4893290423489, 4, '4.4504 TB'],
                [4893290423489, 3, '4.45 TB'],
                [4893290423489, 2, '4.45 TB'],
                [4893290423489, 1, '4.5 TB'],
                [4893290423489, 0, '4 TB'],
            ];
            for (const el of val_tests) {
                expect(humanizeBytes(`${el[0]}`, {precision: el[1]})).to.eql(el[2]);
                expect(humanizeBytes(el[0], {precision: el[1]})).to.eql(el[2]);
            }

        });

        it ('[humanizeBytes] Should allow overriding separator', () => {
            const val_tests = [
                [1024, 10, '1 KB'],
                [1500, 1, '1,5 KB'],
                [1500, 2, '1,46 KB'],
                [1500, 3, '1,465 KB'],
                [3584, 1, '3,5 KB'],
                [3584, 2, '3,5 KB'],
                [3584, 3, '3,5 KB'],
                [9799, 1, '9,6 KB'],
                [9799, 4, '9,5693 KB'],
                [58432, 1, '57,1 KB'],
                [58432, 2, '57,06 KB'],
                [58432, 3, '57,063 KB'],
                [4893290423489, 5, '4,45042 TB'],
                [4893290423489, 4, '4,4504 TB'],
                [4893290423489, 3, '4,45 TB'],
                [4893290423489, 2, '4,45 TB'],
                [4893290423489, 1, '4,5 TB'],
                [4893290423489, 0, '4 TB'],
            ];
            for (const el of val_tests) {
                expect(humanizeBytes(`${el[0]}`, {precision: el[1], separator: ','})).to.eql(el[2]);
                expect(humanizeBytes(el[0], {precision: el[1], separator: ','})).to.eql(el[2]);
            }
        });

        it ('[humanizeBytes] Should allow overriding separator and not trim it', () => {
            const val_tests = [
                [1024, 10, '1 KB'],
                [1500, 1, '1 | 5 KB'],
                [1500, 2, '1 | 46 KB'],
                [1500, 3, '1 | 465 KB'],
                [3584, 1, '3 | 5 KB'],
                [3584, 2, '3 | 5 KB'],
                [3584, 3, '3 | 5 KB'],
                [9799, 1, '9 | 6 KB'],
                [9799, 4, '9 | 5693 KB'],
                [58432, 1, '57 | 1 KB'],
                [58432, 2, '57 | 06 KB'],
                [58432, 3, '57 | 063 KB'],
                [4893290423489, 5, '4 | 45042 TB'],
                [4893290423489, 4, '4 | 4504 TB'],
                [4893290423489, 3, '4 | 45 TB'],
                [4893290423489, 2, '4 | 45 TB'],
                [4893290423489, 1, '4 | 5 TB'],
                [4893290423489, 0, '4 TB'],
            ];
            for (const el of val_tests) {
                expect(humanizeBytes(`${el[0]}`, {precision: el[1], separator: ' | '})).to.eql(el[2]);
                expect(humanizeBytes(el[0], {precision: el[1], separator: ' | '})).to.eql(el[2]);
            }
        });

        it ('[humanizeBytes] Should not allow turning off separator', () => {
            const val_tests = [
                [1024, 10, '1 KB'],
                [1500, 1, '1.5 KB'],
                [1500, 2, '1.46 KB'],
                [1500, 3, '1.465 KB'],
                [3584, 1, '3.5 KB'],
                [3584, 2, '3.5 KB'],
                [3584, 3, '3.5 KB'],
                [9799, 1, '9.6 KB'],
                [9799, 4, '9.5693 KB'],
                [58432, 1, '57.1 KB'],
                [58432, 2, '57.06 KB'],
                [58432, 3, '57.063 KB'],
                [4893290423489, 5, '4.45042 TB'],
                [4893290423489, 4, '4.4504 TB'],
                [4893290423489, 3, '4.45 TB'],
                [4893290423489, 2, '4.45 TB'],
                [4893290423489, 1, '4.5 TB'],
                [4893290423489, 0, '4 TB'],
            ];
            for (const el of val_tests) {
                expect(humanizeBytes(`${el[0]}`, {precision: el[1], separator: ''})).to.eql(el[2]);
                expect(humanizeBytes(el[0], {precision: el[1], separator: ''})).to.eql(el[2]);
            }
        });

        it ('[humanizeBytes] Should allow overriding delimiter', () => {
            const val_tests = [
                [1024, 10, '1 KB'],
                [43244332, 4, '42.230,793 KB'],
                [85753443, 3, '83.743,597 KB'],
                [100000032, 5, '97.656,28125 KB'],
                [1073741823, 2, '1.048.576 KB'],
                [374237489237, 1, '365.466.298,1 KB'],
                [4893290423489, 0, '4.778.603.929 KB'],
                [4327963279469432, 5, '4.226.526.640.106,867 KB'],
            ];
            for (const el of val_tests) {
                expect(humanizeBytes(`${el[0]}`, {precision: el[1], units: [' bytes', ' KB'], delim: '.', separator: ','})).to.eql(el[2]);
                expect(humanizeBytes(el[0], {precision: el[1], units: [' bytes', ' KB'], delim: '.', separator: ','})).to.eql(el[2]);
            }
        });

        it ('[humanizeBytes] Should allow turning off delimiter by passing as empty string', () => {
            const val_tests = [
                [1024, 10, '1 KB'],
                [43244332, 4, '42230,793 KB'],
                [85753443, 3, '83743,597 KB'],
                [100000032, 5, '97656,28125 KB'],
                [1073741823, 2, '1048576 KB'],
                [374237489237, 1, '365466298,1 KB'],
                [4893290423489, 0, '4778603929 KB'],
                [4327963279469432, 5, '4226526640106,867 KB'],
            ];
            for (const el of val_tests) {
                expect(humanizeBytes(`${el[0]}`, {precision: el[1], units: [' bytes', ' KB'], delim: '', separator: ','})).to.eql(el[2]);
                expect(humanizeBytes(el[0], {precision: el[1], units: [' bytes', ' KB'], delim: '', separator: ','})).to.eql(el[2]);
            }
        });

        it ('[humanizeBytes] Should allow overriding units', () => {
            const val_tests = [
                [20, 10, '20Jedi'],
                [1024, 10, '1Darth'],
                [43244332, 4, '41.241Vader'],
                [85753443, 3, '81.781Vader'],
                [4893290423489, 0, '4,557Force'],
                [4327963279469432, 5, '4,030,729.90428Force'],
            ];
            for (const el of val_tests) {
                expect(humanizeBytes(`${el[0]}`, {precision: el[1], units: ['Jedi', 'Darth', 'Vader', 'Force']})).to.eql(el[2]);
                expect(humanizeBytes(el[0], {precision: el[1], units: ['Jedi', 'Darth', 'Vader', 'Force']})).to.eql(el[2]);
            }
        });

    });
});
