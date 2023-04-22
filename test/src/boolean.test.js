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
    fnNullables,
} from '../constants';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("Boolean", () => {
    describe("isBoolean", () => {
        it ('not see a string as a boolean', () => {
            let vals = fnStringValues();
            for (let el of vals) expect(isBoolean(el)).to.eql(false);
        });

        it ('not see a numeric value as a boolean', () => {
            let vals = fnNumericValues();
            for (let el of vals) expect(isBoolean(el)).to.eql(false);
        });

        it ('see a boolean as a boolean', () => {
            let vals = fnBooleanValues();
            for (let el of vals) expect(isBoolean(el)).to.eql(true);
        });

        it ('not see a regex as a boolean', () => {
            let vals = fnRegexValues();
            for (let el of vals) expect(isBoolean(el)).to.eql(false);
        });

        it ('not see an object as a boolean', () => {
            let vals = fnObjectValues();
            for (let el of vals) expect(isBoolean(el)).to.eql(false);
        });

        it ('not see a nullable as a boolean', () => {
            let vals = fnNullables();
            for (let el of vals) expect(isBoolean(el)).to.eql(false);
        });

        it ('not see a date as a boolean', () => {
            let vals = fnDateValues();
            for (let el of vals) expect(isBoolean(el)).to.eql(false);
        });

        it ('not see an array as a boolean', () => {
            let vals = fnArrayValues();
            for (let el of vals) expect(isBoolean(el)).to.eql(false);
        });

        it ('not see a function as a boolean', () => {
            let vals = fnFunctionValues();
            for (let el of vals) expect(isBoolean(el)).to.eql(false);
        });
    });
});
