'use strict';

import Is           from '../../src/is';
import isObject     from '../../src/object/is';
import isFunction   from '../../src/function/is';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("Is", () => {

    it ('Should be an object', () => {
        expect(isObject(Is)).to.eql(true);
    });

    it ('Should be a frozen object', () => {
        expect(Object.isFrozen(Is)).to.eql(true);
    });

//  Is.Array

    it ('[fn-array] Should have an Array function', () => {
        expect(isFunction(Is.Array)).to.eql(true);
    });

    it ('[fn-array] Should link to isArray', () => {
        expect(Is.Array([])).to.eql(true);
        expect(Is.Array({})).to.eql(false);
    });

//  Is.NotEmptyArray

    it ('[fn-notemptyarray] Should have a NotEmptyArray function', () => {
        expect(isFunction(Is.Array)).to.eql(true);
    });

    it ('[fn-notemptyarray] Should link to isNotEmptyArray', () => {
        expect(Is.NotEmptyArray([1, 2, 3])).to.eql(true);
        expect(Is.NotEmptyArray([])).to.eql(false);
        expect(Is.NotEmptyArray({})).to.eql(false);
    });

//  Is.Boolean

    it ('[fn-boolean] Should have a Boolean function', () => {
        expect(isFunction(Is.Boolean)).to.eql(true);
    });

    it ('[fn-boolean] Should link to isBoolean', () => {
        expect(Is.Boolean([])).to.eql(false);
        expect(Is.Boolean(false)).to.eql(true);
        expect(Is.Boolean(true)).to.eql(true);
    });

//  Is.Date

    it ('[fn-date] Should have a Date function', () => {
        expect(isFunction(Is.Date)).to.eql(true);
    });

    it ('[fn-date] Should link to isDate', () => {
        expect(Is.Date([1, 2, 3])).to.eql(false);
        expect(Is.Date('2021-01-01')).to.eql(false);
        expect(Is.Date(new Date())).to.eql(true);
    });

//  Is.Function

    it ('[fn-function] Should have a Function function', () => {
        expect(isFunction(Is.Function)).to.eql(true);
    });

    it ('[fn-function] Should link to isFunction', () => {
        expect(Is.Function([1, 2, 3])).to.eql(false);
        expect(Is.Function('2021-01-01')).to.eql(false);
        expect(Is.Function(() => {})).to.eql(true);
    });

//  Is.Number

    it ('[fn-number] Should have a Number function', () => {
        expect(isFunction(Is.Number)).to.eql(true);
    });

    it ('[fn-number] Should link to isNumber', () => {
        expect(Is.Number([1, 2, 3])).to.eql(false);
        expect(Is.Number('2021-01-01')).to.eql(false);
        expect(Is.Number(1)).to.eql(true);
    });

//  Is.NumberBetween

    it ('[fn-numberbetween] Should have a NumberBetween function', () => {
        expect(isFunction(Is.NumberBetween)).to.eql(true);
    });

    it ('[fn-numberbetween] Should link to isNumberBetween', () => {
        expect(Is.NumberBetween(1, 0, 2)).to.eql(true);
        expect(Is.NumberBetween(10, 10, 11)).to.eql(true);
        expect(Is.NumberBetween(50, 10, 30)).to.eql(false);
        expect(Is.NumberBetween('a', 2, 6)).to.eql(false);
        expect(Is.NumberBetween({})).to.eql(false);
    });

//  Is.RegExp

    it ('[fn-regexp] Should have a RegExp function', () => {
        expect(isFunction(Is.RegExp)).to.eql(true);
    });

    it ('[fn-regexp] Should link to isRegExp', () => {
        expect(Is.RegExp([1, 2, 3])).to.eql(false);
        expect(Is.RegExp('2021-01-01')).to.eql(false);
        expect(Is.RegExp(/hi/g)).to.eql(true);
    });

//  Is.Object

    it ('[fn-object] Should have an Object function', () => {
        expect(isFunction(Is.Object)).to.eql(true);
    });

    it ('[fn-object] Should link to isObject', () => {
        expect(Is.Object([1, 2, 3])).to.eql(false);
        expect(Is.Object('2021-01-01')).to.eql(false);
        expect(Is.Object({a:1})).to.eql(true);
    });

//  Is.NotEmptyObject

    it ('[fn-notemptyobject] Should have an NotEmptyObject function', () => {
        expect(isFunction(Is.NotEmptyObject)).to.eql(true);
    });

    it ('[fn-notemptyobject] Should link to isNotEmptyObject', () => {
        expect(Is.NotEmptyObject([1, 2, 3])).to.eql(false);
        expect(Is.NotEmptyObject('2021-01-01')).to.eql(false);
        expect(Is.NotEmptyObject({a:1})).to.eql(true);
        expect(Is.NotEmptyObject({})).to.eql(false);
    });

//  Is.String

    it ('[fn-string] Should have a String function', () => {
        expect(isFunction(Is.String)).to.eql(true);
    });

    it ('[fn-string] Should link to isString', () => {
        expect(Is.String([1, 2, 3])).to.eql(false);
        expect(Is.String('2021-01-01')).to.eql(true);
        expect(Is.String({a:1})).to.eql(false);
    });

//  Is.StringBetween

    it ('[fn-stringbetween] Should have a StringBetween function', () => {
        expect(isFunction(Is.StringBetween)).to.eql(true);
    });

    it ('[fn-stringbetween] Should link to isStringBetween', () => {
        expect(Is.StringBetween([1, 2, 3])).to.eql(false);
        expect(Is.StringBetween('2021-01-01', 0, 10)).to.eql(true);
        expect(Is.StringBetween('a', 2, 6)).to.eql(false);
        expect(Is.StringBetween({})).to.eql(false);
    });

//  Is.NotEmptyString

    it ('[fn-notemptystring] Should have an NotEmptyString function', () => {
        expect(isFunction(Is.NotEmptyString)).to.eql(true);
    });

    it ('[fn-notemptystring] Should link to isNotEmptyString', () => {
        expect(Is.NotEmptyString([1, 2, 3])).to.eql(false);
        expect(Is.NotEmptyString('2021-01-01')).to.eql(true);
        expect(Is.NotEmptyString('')).to.eql(false);
        expect(Is.NotEmptyString({a:1})).to.eql(false);
        expect(Is.NotEmptyString({})).to.eql(false);
    });

});
