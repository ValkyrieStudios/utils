'use strict';

import isString from '../../src/string/is';

describe("String - isString", () => {
    it ('see a string as a string', () => {
        expect(isString('foo')).toEqual(true);
        expect(isString(new String('bar'))).toEqual(true);
    });

    it ('not see a numeric value as a string', () => {
        expect(isString(1)).toEqual(false);
        expect(isString(NaN)).toEqual(false);
        expect(isString(0.000001)).toEqual(false);
        expect(isString(8e10)).toEqual(false);
        expect(isString(Math.PI)).toEqual(false);
        expect(isString(new Number(1.12345))).toEqual(false);
        expect(isString(new Number(Number.EPSILON))).toEqual(false);
    });

    it ('not see a boolean as a string', () => {
        expect(isString(true)).toEqual(false);
        expect(isString(false)).toEqual(false);
        expect(isString(Boolean(true))).toEqual(false);
        expect(isString(Boolean(false))).toEqual(false);
        expect(isString(Boolean('foo'))).toEqual(false);
        expect(isString(new Boolean(false))).toEqual(false);
    });

    it ('not see a regex as a string', () => {
        expect(isString(/abcdefg/i)).toEqual(false);
        expect(isString(new RegExp('\\w+'))).toEqual(false);
    });

    it ('not see an object as a string', () => {
        expect(isString({bar:'foo'})).toEqual(false);
        expect(isString(new Object())).toEqual(false);
        expect(isString(Object.create(null))).toEqual(false);
        expect(isString(Object.create([]))).toEqual(false);
    });

    it ('not see a null as a string', () => {
        expect(isString(null)).toEqual(false);
    });

    it ('not see a date as a string', () => {
        expect(isString(new Date())).toEqual(false);
        expect(isString(Date.now())).toEqual(false);
    });

    it ('not see an undefined as a string', () => {
        expect(isString(undefined)).toEqual(false);
    });

    it ('see an array as a string', () => {
        expect(isString([0, 1, 2])).toEqual(false);
        expect(isString(new Array(1, 2, 3))).toEqual(false);
        expect(isString(new Array(5))).toEqual(false);
    });

    it ('not see a function as a string', () => {
        function testFunction () {}

        const testArrowFunction = () => {};

        expect(isString(testFunction)).toEqual(false);
        expect(isString(testArrowFunction)).toEqual(false);
    });

    it ('not see formdata as a string', () => {
        let fdata = new FormData();
        expect(isString(fdata)).toEqual(false);
    });
});
