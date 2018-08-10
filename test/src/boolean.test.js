import { isBoolean } from '../../src/boolean';

describe("Boolean - isBoolean", () => {
    it ('not see a string as a boolean', () => {
        expect(isBoolean('foo')).toEqual(false);
        expect(isBoolean(new String('bar'))).toEqual(false);
    });

    it ('not see a numeric value as a boolean', () => {
        expect(isBoolean(1)).toEqual(false);
        expect(isBoolean(NaN)).toEqual(false);
        expect(isBoolean(0.000001)).toEqual(false);
        expect(isBoolean(8e10)).toEqual(false);
        expect(isBoolean(Math.PI)).toEqual(false);
        expect(isBoolean(new Number(1.12345))).toEqual(false);
        expect(isBoolean(new Number(Number.EPSILON))).toEqual(false);
    });

    it ('see a boolean as a boolean', () => {
        expect(isBoolean(true)).toEqual(true);
        expect(isBoolean(false)).toEqual(true);
        expect(isBoolean(Boolean(true))).toEqual(true);
        expect(isBoolean(Boolean(false))).toEqual(true);
        expect(isBoolean(Boolean('foo'))).toEqual(true);
        expect(isBoolean(new Boolean(false))).toEqual(true);
    });

    it ('not see a regex as a boolean', () => {
        expect(isBoolean(/abcdefg/i)).toEqual(false);
        expect(isBoolean(new RegExp('\\w+'))).toEqual(false);
    });

    it ('not see an object as a boolean', () => {
        expect(isBoolean({bar:'foo'})).toEqual(false);
        expect(isBoolean(new Object())).toEqual(false);
        expect(isBoolean(Object.create(null))).toEqual(false);
        expect(isBoolean(Object.create([]))).toEqual(false);
    });

    it ('not see a null as a boolean', () => {
        expect(isBoolean(null)).toEqual(false);
    });

    it ('not see a date as a boolean', () => {
        expect(isBoolean(new Date())).toEqual(false);
        expect(isBoolean(Date.now())).toEqual(false);
    });

    it ('not see an undefined as a boolean', () => {
        expect(isBoolean(undefined)).toEqual(false);
    });

    it ('not see an array as a boolean', () => {
        expect(isBoolean([0, 1, 2])).toEqual(false);
        expect(isBoolean(new Array(1, 2, 3))).toEqual(false);
        expect(isBoolean(new Array(5))).toEqual(false);
    });
});
