import { isNumber, isNumericalNaN } from '../../src/number';

describe("Number - isNumber", () => {
    it ('not see a string as a number', () => {
        expect(isNumber('foo')).toEqual(false);
        expect(isNumber(new String('bar'))).toEqual(false);
    });

    it ('see a numeric value as a number', () => {
        expect(isNumber(1)).toEqual(true);
        expect(isNumber(NaN)).toEqual(true);
        expect(isNumber(0.000001)).toEqual(true);
        expect(isNumber(8e10)).toEqual(true);
        expect(isNumber(Math.PI)).toEqual(true);
        expect(isNumber(new Number(1.12345))).toEqual(true);
        expect(isNumber(new Number(Number.EPSILON))).toEqual(true);
    });

    it ('not see a boolean as a number', () => {
        expect(isNumber(true)).toEqual(false);
        expect(isNumber(false)).toEqual(false);
        expect(isNumber(Boolean(true))).toEqual(false);
        expect(isNumber(Boolean(false))).toEqual(false);
        expect(isNumber(Boolean('foo'))).toEqual(false);
        expect(isNumber(new Boolean(false))).toEqual(false);
    });

    it ('not see a regex as a number', () => {
        expect(isNumber(/abcdefg/i)).toEqual(false);
        expect(isNumber(new RegExp('\\w+'))).toEqual(false);
    });

    it ('not see an object as a number', () => {
        expect(isNumber({bar:'foo'})).toEqual(false);
        expect(isNumber(new Object())).toEqual(false);
        expect(isNumber(Object.create(null))).toEqual(false);
        expect(isNumber(Object.create([]))).toEqual(false);
    });

    it ('not see a null as a number', () => {
        expect(isNumber(null)).toEqual(false);
    });

    it ('not see a date as a number', () => {
        expect(isNumber(new Date())).toEqual(false);
        expect(isNumber(Date.now())).toEqual(true);
    });

    it ('not see an undefined as a number', () => {
        expect(isNumber(undefined)).toEqual(false);
    });

    it ('not see an array as a number', () => {
        expect(isNumber([0, 1, 2])).toEqual(false);
        expect(isNumber(new Array(1, 2, 3))).toEqual(false);
        expect(isNumber(new Array(5))).toEqual(false);
    });
});

describe("Number - isNumericalNaN", () => {
    it ('not see a valid number as a NaN', () => {
        expect(isNumericalNaN(42)).toEqual(false);
    });

    it ('not see a string as a NaN', () => {
        expect(isNumericalNaN('foo')).toEqual(false);
        expect(isNumericalNaN('NaN')).toEqual(false);
    });

    it ('not see an object as a NaN', () => {
        expect(isNumericalNaN({ foo: 'bar' })).toEqual(false);
    });

    it ('not see an array as a NaN', () => {
        expect(isNumericalNaN([0, 1, 2])).toEqual(false);
    });

    it ('see a NaN as a NaN', () => {
        expect(isNumericalNaN(NaN)).toEqual(true);
    });
});
