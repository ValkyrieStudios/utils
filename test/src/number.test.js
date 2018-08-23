import { isNumber, isNumericalNaN, round, randomBetween } from '../../src/number';

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

    it ('not see a function as a number', () => {
        function testFunction () {}

        const testArrowFunction = () => {};

        expect(isNumber(testFunction)).toEqual(false);
        expect(isNumber(testArrowFunction)).toEqual(false);
    });

    it ('not see formdata as a number', () => {
        let fdata = new FormData();
        expect(isNumber(fdata)).toEqual(false);
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

describe("Number - round", () => {
    it ('should correctly round a value', () => {
        expect(round(5.123456789)).toEqual(5);
    });

    it ('should correctly round a value with precision', () => {
        expect(round(5.123456789, 0)).toEqual(5);
        expect(round(5.123456789, 1)).toEqual(5.1);
        expect(round(5.123456789, 2)).toEqual(5.12);
        expect(round(5.123456789, 3)).toEqual(5.123);
        expect(round(5.123456789, 4)).toEqual(5.1235);
        expect(round(5.123456789, 5)).toEqual(5.12346);
    });

    it ('should throw an error if the value is not numeric', () => {
        expect(function () {
            round('hello', 2);
        }).toThrowError(TypeError);
    });
});

describe("Number - randomBetween", () => {
    it ('should return a random number', () => {
        expect(randomBetween()).toEqual(jasmine.any(Number));
    });

    it ('should return a random number between min and max', () => {
        let between = true;
        for (let i = 0; i < 1000; i++) {
            const random = randomBetween(0, 100);
            if (random < 0 && random > 1000) between = false;
        }

        expect(between).toEqual(true);
    });

    it ('should return a unique random number over subsequent calls', () => {
        let cache = {};
        for (let i = 0; i < 100000; i++) {
            const random = randomBetween(0, 100);
            cache[`${random}`] = random;
        }
        expect(Object.keys(cache).length).toEqual(100000);
    });

    it ('should throw an error if the min/max is not numeric', () => {
        expect(function () {
            randomBetween('min', 2);
        }).toThrowError(TypeError);
        expect(function () {
            randomBetween(2, 'max');
        }).toThrowError(TypeError);
        expect(function () {
            randomBetween(2, 5);
        }).not.toThrowError(TypeError);
    });
});
