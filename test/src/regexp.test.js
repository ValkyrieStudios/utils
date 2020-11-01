'use strict';

import isRegExp from '../../src/regexp/is';

describe("RegExp - isRegExp", () => {
    it ('not see a string as a regex', () => {
        expect(isRegExp('foo')).toEqual(false);
        expect(isRegExp(new String('bar'))).toEqual(false);
    });

    it ('not see a numeric value as a regex', () => {
        expect(isRegExp(1)).toEqual(false);
        expect(isRegExp(NaN)).toEqual(false);
        expect(isRegExp(0.000001)).toEqual(false);
        expect(isRegExp(8e10)).toEqual(false);
        expect(isRegExp(Math.PI)).toEqual(false);
        expect(isRegExp(new Number(1.12345))).toEqual(false);
        expect(isRegExp(new Number(Number.EPSILON))).toEqual(false);
    });

    it ('not see a boolean as a regex', () => {
        expect(isRegExp(true)).toEqual(false);
        expect(isRegExp(false)).toEqual(false);
        expect(isRegExp(Boolean(true))).toEqual(false);
        expect(isRegExp(Boolean(false))).toEqual(false);
        expect(isRegExp(Boolean('foo'))).toEqual(false);
        expect(isRegExp(new Boolean(false))).toEqual(false);
    });

    it ('see a regex as a regex', () => {
        expect(isRegExp(/abcdefg/i)).toEqual(true);
        expect(isRegExp(new RegExp('\\w+'))).toEqual(true);
    });

    it ('not see an object as a regex', () => {
        expect(isRegExp({bar:'foo'})).toEqual(false);
        expect(isRegExp(new Object())).toEqual(false);
        expect(isRegExp(Object.create(null))).toEqual(false);
        expect(isRegExp(Object.create([]))).toEqual(false);
    });

    it ('not see a null as a regex', () => {
        expect(isRegExp(null)).toEqual(false);
    });

    it ('not see a date as a regex', () => {
        expect(isRegExp(new Date())).toEqual(false);
        expect(isRegExp(Date.now())).toEqual(false);
    });

    it ('not see an undefined as a regex', () => {
        expect(isRegExp(undefined)).toEqual(false);
    });

    it ('not see an array as a regex', () => {
        expect(isRegExp([0, 1, 2])).toEqual(false);
        expect(isRegExp(new Array(1, 2, 3))).toEqual(false);
        expect(isRegExp(new Array(5))).toEqual(false);
    });

    it ('not see a function as a regex', () => {
        function testFunction () {}

        const testArrowFunction = () => {};

        expect(isRegExp(testFunction)).toEqual(false);
        expect(isRegExp(testArrowFunction)).toEqual(false);
    });

    it ('not see formdata as a regex', () => {
        let fdata = new FormData();
        expect(isRegExp(fdata)).toEqual(false);
    });
});
