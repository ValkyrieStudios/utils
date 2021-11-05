'use strict';

import Is           from '../../src/is';
import isObject     from '../../src/object/is';
import isFunction   from '../../src/function/is';

describe("Is", () => {

    it ('Should be an object', () => {
        expect(isObject(Is)).toEqual(true);
    });

    it ('Should be a frozen object', () => {
        expect(Object.isFrozen(Is)).toEqual(true);
    });

//  Is.Array

    it ('[fn-array] Should have an Array function', () => {
        expect(isFunction(Is.Array)).toEqual(true);
    });

    it ('[fn-array] Should link to isArray', () => {
        expect(Is.Array([])).toEqual(true);
        expect(Is.Array({})).toEqual(false);
    });

//  Is.NotEmptyArray

    it ('[fn-notemptyarray] Should have a NotEmptyArray function', () => {
        expect(isFunction(Is.Array)).toEqual(true);
    });

    it ('[fn-notemptyarray] Should link to isNotEmptyArray', () => {
        expect(Is.NotEmptyArray([1, 2, 3])).toEqual(true);
        expect(Is.NotEmptyArray([])).toEqual(false);
        expect(Is.NotEmptyArray({})).toEqual(false);
    });

//  Is.Boolean

    it ('[fn-boolean] Should have a Boolean function', () => {
        expect(isFunction(Is.Boolean)).toEqual(true);
    });

    it ('[fn-boolean] Should link to isBoolean', () => {
        expect(Is.Boolean([])).toEqual(false);
        expect(Is.Boolean(false)).toEqual(true);
        expect(Is.Boolean(true)).toEqual(true);
    });

//  Is.Date

    it ('[fn-date] Should have a Date function', () => {
        expect(isFunction(Is.Date)).toEqual(true);
    });

    it ('[fn-date] Should link to isDate', () => {
        expect(Is.Date([1, 2, 3])).toEqual(false);
        expect(Is.Date('2021-01-01')).toEqual(false);
        expect(Is.Date(new Date())).toEqual(true);
    });

//  Is.FormData

    it ('[fn-formdata] Should have a FormData function', () => {
        expect(isFunction(Is.FormData)).toEqual(true);
    });

    it ('[fn-formdata] Should link to isFormData', () => {
        expect(Is.FormData([1, 2, 3])).toEqual(false);
        expect(Is.FormData('2021-01-01')).toEqual(false);
        expect(Is.FormData(new FormData())).toEqual(true);
    });

//  Is.Function

    it ('[fn-function] Should have a Function function', () => {
        expect(isFunction(Is.Function)).toEqual(true);
    });

    it ('[fn-function] Should link to isFunction', () => {
        expect(Is.Function([1, 2, 3])).toEqual(false);
        expect(Is.Function('2021-01-01')).toEqual(false);
        expect(Is.Function(() => {})).toEqual(true);
    });

//  Is.Number

    it ('[fn-number] Should have a Number function', () => {
        expect(isFunction(Is.Number)).toEqual(true);
    });

    it ('[fn-number] Should link to isNumber', () => {
        expect(Is.Number([1, 2, 3])).toEqual(false);
        expect(Is.Number('2021-01-01')).toEqual(false);
        expect(Is.Number(1)).toEqual(true);
    });

//  Is.RegExp

    it ('[fn-regexp] Should have a RegExp function', () => {
        expect(isFunction(Is.RegExp)).toEqual(true);
    });

    it ('[fn-regexp] Should link to isRegExp', () => {
        expect(Is.RegExp([1, 2, 3])).toEqual(false);
        expect(Is.RegExp('2021-01-01')).toEqual(false);
        expect(Is.RegExp(/hi/g)).toEqual(true);
    });

//  Is.Object

    it ('[fn-object] Should have an Object function', () => {
        expect(isFunction(Is.Object)).toEqual(true);
    });

    it ('[fn-object] Should link to isObject', () => {
        expect(Is.Object([1, 2, 3])).toEqual(false);
        expect(Is.Object('2021-01-01')).toEqual(false);
        expect(Is.Object({a:1})).toEqual(true);
    });

//  Is.NotEmptyObject

    it ('[fn-notemptyobject] Should have an NotEmptyObject function', () => {
        expect(isFunction(Is.NotEmptyObject)).toEqual(true);
    });

    it ('[fn-notemptyobject] Should link to isNotEmptyObject', () => {
        expect(Is.NotEmptyObject([1, 2, 3])).toEqual(false);
        expect(Is.NotEmptyObject('2021-01-01')).toEqual(false);
        expect(Is.NotEmptyObject({a:1})).toEqual(true);
        expect(Is.NotEmptyObject({})).toEqual(false);
    });

//  Is.String

    it ('[fn-object] Should have a String function', () => {
        expect(isFunction(Is.String)).toEqual(true);
    });

    it ('[fn-object] Should link to isString', () => {
        expect(Is.String([1, 2, 3])).toEqual(false);
        expect(Is.String('2021-01-01')).toEqual(true);
        expect(Is.String({a:1})).toEqual(false);
    });

//  Is.NotEmptyString

    it ('[fn-notemptyobject] Should have an NotEmptyString function', () => {
        expect(isFunction(Is.NotEmptyString)).toEqual(true);
    });

    it ('[fn-notemptyobject] Should link to isNotEmptyString', () => {
        expect(Is.NotEmptyString([1, 2, 3])).toEqual(false);
        expect(Is.NotEmptyString('2021-01-01')).toEqual(true);
        expect(Is.NotEmptyString('')).toEqual(false);
        expect(Is.NotEmptyString({a:1})).toEqual(false);
        expect(Is.NotEmptyString({})).toEqual(false);
    });

});
