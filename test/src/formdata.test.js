import { isFormData } from '../../src/formdata';

describe("FormData - isFormData", () => {
    it ('not see a string as formdata', () => {
        expect(isFormData('foo')).toEqual(false);
        expect(isFormData(new String('bar'))).toEqual(false);
    });

    it ('not see a numeric value as formdata', () => {
        expect(isFormData(1)).toEqual(false);
        expect(isFormData(NaN)).toEqual(false);
        expect(isFormData(0.000001)).toEqual(false);
        expect(isFormData(8e10)).toEqual(false);
        expect(isFormData(Math.PI)).toEqual(false);
        expect(isFormData(new Number(1.12345))).toEqual(false);
        expect(isFormData(new Number(Number.EPSILON))).toEqual(false);
    });

    it ('not see a boolean as formdata', () => {
        expect(isFormData(true)).toEqual(false);
        expect(isFormData(false)).toEqual(false);
        expect(isFormData(Boolean(true))).toEqual(false);
        expect(isFormData(Boolean(false))).toEqual(false);
        expect(isFormData(Boolean('foo'))).toEqual(false);
        expect(isFormData(new Boolean(false))).toEqual(false);
    });

    it ('not see a regex as formdata', () => {
        expect(isFormData(/abcdefg/i)).toEqual(false);
        expect(isFormData(new RegExp('\\w+'))).toEqual(false);
    });

    it ('not see an object as formdata', () => {
        expect(isFormData({bar:'foo'})).toEqual(false);
        expect(isFormData(new Object())).toEqual(false);
        expect(isFormData(Object.create(null))).toEqual(false);
        expect(isFormData(Object.create([]))).toEqual(false);
    });

    it ('not see a null as formdata', () => {
        expect(isFormData(null)).toEqual(false);
    });

    it ('not see a date as formdata', () => {
        expect(isFormData(new Date())).toEqual(false);
        expect(isFormData(Date.now())).toEqual(false);
    });

    it ('not see an undefined as formdata', () => {
        expect(isFormData(undefined)).toEqual(false);
    });

    it ('not see an array as formdata', () => {
        expect(isFormData([0, 1, 2])).toEqual(false);
        expect(isFormData(new Array(1, 2, 3))).toEqual(false);
        expect(isFormData(new Array(5))).toEqual(false);
    });

    it ('not see a function as formdata', () => {
        function testFunction () {}

        const testArrowFunction = () => {};

        expect(isFormData(testFunction)).toEqual(false);
        expect(isFormData(testArrowFunction)).toEqual(false);
    });

    it ('see formdata as formdata', () => {
        let fdata = new FormData();
        expect(isFormData(fdata)).toEqual(true);
    });
});
