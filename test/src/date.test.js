'use strict';

import isDate from '../../src/date/is';

describe("Date - isDate", () => {
    it ('not see a string as a date', () => {
        expect(isDate('foo')).toEqual(false);
        expect(isDate(new String('bar'))).toEqual(false);
    });

    it ('not see a numeric value as a date', () => {
        expect(isDate(1)).toEqual(false);
        expect(isDate(NaN)).toEqual(false);
        expect(isDate(0.000001)).toEqual(false);
        expect(isDate(8e10)).toEqual(false);
        expect(isDate(Math.PI)).toEqual(false);
        expect(isDate(new Number(1.12345))).toEqual(false);
        expect(isDate(new Number(Number.EPSILON))).toEqual(false);
    });

    it ('not see a boolean as a date', () => {
        expect(isDate(true)).toEqual(false);
        expect(isDate(false)).toEqual(false);
        expect(isDate(Boolean(true))).toEqual(false);
        expect(isDate(Boolean(false))).toEqual(false);
        expect(isDate(Boolean('foo'))).toEqual(false);
        expect(isDate(new Boolean(false))).toEqual(false);
    });

    it ('not see a regex as a date', () => {
        expect(isDate(/abcdefg/i)).toEqual(false);
        expect(isDate(new RegExp('\\w+'))).toEqual(false);
    });

    it ('not see an object as a date', () => {
        expect(isDate({bar:'foo'})).toEqual(false);
        expect(isDate(new Object())).toEqual(false);
        expect(isDate(Object.create(null))).toEqual(false);
        expect(isDate(Object.create([]))).toEqual(false);
    });

    it ('not see a null as a date', () => {
        expect(isDate(null)).toEqual(false);
    });

    it ('see a date as a date', () => {
        expect(isDate(new Date())).toEqual(true);
        expect(isDate(Date.now())).toEqual(false);
    });

    it ('not see an undefined as a date', () => {
        expect(isDate(undefined)).toEqual(false);
    });

    it ('not see an array as a date', () => {
        expect(isDate([0, 1, 2])).toEqual(false);
        expect(isDate(new Array(1, 2, 3))).toEqual(false);
        expect(isDate(new Array(5))).toEqual(false);
    });

    it ('not see a function as a date', () => {
        function testFunction () {}

        const testArrowFunction = () => {};

        expect(isDate(testFunction)).toEqual(false);
        expect(isDate(testArrowFunction)).toEqual(false);
    });

    it ('not see formdata as a date', () => {
        let fdata = new FormData();
        expect(isDate(fdata)).toEqual(false);
    });
});
