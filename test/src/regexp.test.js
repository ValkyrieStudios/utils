'use strict';

import isRegExp         from '../../src/regexp/is';
import sanitizeRegExp   from '../../src/regexp/sanitize';
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

const expect = require('chai').expect;
const assert = require('chai').assert;

describe("RegExp", () => {
    describe("isRegExp", () => {
        it ('not see a string as a regex', () => {
            let vals = fnStringValues();
            for (let el of vals) expect(isRegExp(el)).to.eql(false);
        });

        it ('not see a numeric value as a regex', () => {
            let vals = fnNumericValues();
            for (let el of vals) expect(isRegExp(el)).to.eql(false);
        });

        it ('not see a boolean as a regex', () => {
            let vals = fnBooleanValues();
            for (let el of vals) expect(isRegExp(el)).to.eql(false);
        });

        it ('see a regex as a regex', () => {
            let vals = fnRegexValues();
            for (let el of vals) expect(isRegExp(el)).to.eql(true);
        });

        it ('not see an object as a regex', () => {
            let vals = fnObjectValues();
            for (let el of vals) expect(isRegExp(el)).to.eql(false);
        });

        it ('not see a nullable as a regex', () => {
            let vals = fnNullables();
            for (let el of vals) expect(isRegExp(el)).to.eql(false);
        });

        it ('not see a date as a regex', () => {
            let vals = fnDateValues();
            for (let el of vals) expect(isRegExp(el)).to.eql(false);
        });

        it ('not see an array as a regex', () => {
            let vals = fnArrayValues();
            for (let el of vals) expect(isRegExp(el)).to.eql(false);
        });

        it ('not see a function as a regex', () => {
            let vals = fnFunctionValues();
            for (let el of vals) expect(isRegExp(el)).to.eql(false);
        });
    });

    describe("sanitizeRegExp", () => {
        it ('return false when passed a non-string or empty string value', () => {
            for (let el of [
                '',
                ' ',
                '   ',
                ...fnNumericValues(),
                ...fnBooleanValues(),
                ...fnRegexValues(),
                ...fnObjectValues(),
                ...fnNullables(),
                ...fnDateValues(),
                ...fnArrayValues(),
                ...fnFunctionValues(),
            ]) expect(sanitizeRegExp(el)).to.eql(false);
        });

        it('Should return escaped string when passed a string with special characters', () => {
            for (const el of [
                ['Av. P)', 'Av\\. P\\)'],
                ['Suc contry(garza sada', 'Suc contry\\(garza sada'],
                ['contact@valkyriestudios.be', 'contact@valkyriestudios\\.be'],
                ['*alond', '\\*alond'],
                ['[a', '\\[a'],
                ['[a]', '\\[a\\]'],
            ]) expect(sanitizeRegExp(el[0])).to.eql(el[1]);
        });

        it('Should autotrim passed strings', () => {
            expect(sanitizeRegExp('   hello world   ')).to.eql('hello world');
        });

        it('Should autotrim passed strings and escape special characters', () => {
            for (const el of [
                ['  Av. P)', 'Av\\. P\\)'],
                ['Suc contry(garza sada  ', 'Suc contry\\(garza sada'],
                [' contact@valkyriestudios.be ', 'contact@valkyriestudios\\.be'],
                ['*alond   ', '\\*alond'],
                ['  [a   ', '\\[a'],
                ['[a]   ', '\\[a\\]'],
            ]) expect(sanitizeRegExp(el[0])).to.eql(el[1]);
        });
    });
});
