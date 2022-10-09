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

//  Is.NumberBelow

    it ('[fn-numberbelow] Should have a NumberBelow function', () => {
        expect(isFunction(Is.NumberBelow)).to.eql(true);
    });

    it ('[fn-numberbelow] Should link to isNumberBelow', () => {
        expect(Is.NumberBelow(1, 0)).to.eql(false);
        expect(Is.NumberBelow(10, 10)).to.eql(false);
        expect(Is.NumberBelow(9, 10)).to.eql(true);
        expect(Is.NumberBelow(9.9, 10)).to.eql(true);
        expect(Is.NumberBelow('a', 2)).to.eql(false);
        expect(Is.NumberBelow({})).to.eql(false);
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

//  Is.NumberAbove

    it ('[fn-numberabove] Should have a NumberAbove function', () => {
        expect(isFunction(Is.NumberAbove)).to.eql(true);
    });

    it ('[fn-numberabove] Should link to isNumberAbove', () => {
        expect(Is.NumberAbove(1, 0)).to.eql(true);
        expect(Is.NumberAbove(10, 10)).to.eql(false);
        expect(Is.NumberAbove(9, 10)).to.eql(false);
        expect(Is.NumberAbove(9.9, 10)).to.eql(false);
        expect(Is.NumberAbove(10.1, 10)).to.eql(true);
        expect(Is.NumberAbove('a', 2)).to.eql(false);
        expect(Is.NumberAbove({})).to.eql(false);
    });

//  Is.Integer

    it ('[fn-integer] Should have a Integer function', () => {
        expect(isFunction(Is.Integer)).to.eql(true);
    });

    it ('[fn-integer] Should link to isInteger', () => {
        expect(Is.Integer([1, 2, 3])).to.eql(false);
        expect(Is.Integer('2021-01-01')).to.eql(false);
        expect(Is.Integer(1)).to.eql(true);
        expect(Is.Integer(.5)).to.eql(false);
    });

//  Is.IntegerBelow

    it ('[fn-integerbelow] Should have a IntegerBelow function', () => {
        expect(isFunction(Is.IntegerBelow)).to.eql(true);
    });

    it ('[fn-integerbelow] Should link to isIntegerBelow', () => {
        expect(Is.IntegerBelow(1, 0)).to.eql(false);
        expect(Is.IntegerBelow(10, 10)).to.eql(false);
        expect(Is.IntegerBelow(9, 10)).to.eql(true);
        expect(Is.IntegerBelow(9.9, 10)).to.eql(false);
        expect(Is.IntegerBelow('a', 2)).to.eql(false);
        expect(Is.IntegerBelow({})).to.eql(false);
    });

//  Is.IntegerBetween

    it ('[fn-integerbetween] Should have a IntegerBetween function', () => {
        expect(isFunction(Is.IntegerBetween)).to.eql(true);
    });

    it ('[fn-integerbetween] Should link to isIntegerBetween', () => {
        expect(Is.IntegerBetween(1, 0, 2)).to.eql(true);
        expect(Is.IntegerBetween(10, 10, 11)).to.eql(true);
        expect(Is.IntegerBetween(10.5, 10, 11)).to.eql(false);
        expect(Is.IntegerBetween(50, 10, 30)).to.eql(false);
        expect(Is.IntegerBetween('a', 2, 6)).to.eql(false);
        expect(Is.IntegerBetween({})).to.eql(false);
    });

//  Is.IntegerAbove

    it ('[fn-integerabove] Should have a IntegerAbove function', () => {
        expect(isFunction(Is.IntegerAbove)).to.eql(true);
    });

    it ('[fn-integerabove] Should link to isIntegerAbove', () => {
        expect(Is.IntegerAbove(1, 0)).to.eql(true);
        expect(Is.IntegerAbove(10, 10)).to.eql(false);
        expect(Is.IntegerAbove(9, 10)).to.eql(false);
        expect(Is.IntegerAbove(11, 10)).to.eql(true);
        expect(Is.IntegerAbove(9.9, 10)).to.eql(false);
        expect(Is.IntegerAbove(10.1, 10)).to.eql(false);
        expect(Is.IntegerAbove('a', 2)).to.eql(false);
        expect(Is.IntegerAbove({})).to.eql(false);
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
