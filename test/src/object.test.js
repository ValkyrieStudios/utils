'use strict';

import isObject         from '../../src/object/is';
import isNotEmptyObject from '../../src/object/isNotEmpty';
import pick             from '../../src/object/pick';
import merge            from '../../src/object/merge';
import forValues        from '../../src/object/forValues';
import zip              from '../../src/object/zip';
import define           from '../../src/object/define';
import defineFrozen     from '../../src/object/defineFrozen';
import defineSealed     from '../../src/object/defineSealed';
import noopreturn       from '../../src/function/noopreturn';
import {
    fnNumericValues,
    fnBooleanValues,
    fnRegexValues,
    fnStringValues,
    fnObjectValues,
    fnDateValues,
    fnArrayValues,
    fnFunctionValues,
    fnFormDataValues,
    fnNullables,
} from '../constants';

describe("Object - isObject", () => {
    it ('not see a string as an object', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isObject(el)).toEqual(false);
    });

    it ('not see a numeric value as an object', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isObject(el)).toEqual(false);
    });

    it ('not see a boolean as an object', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isObject(el)).toEqual(false);
    });

    it ('not see a regex as an object', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isObject(el)).toEqual(false);
    });

    it ('see an object as an object', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isObject(el)).toEqual(true);
    });

    it ('not see a nullable as an object', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isObject(el)).toEqual(false);
    });

    it ('not see a date as an object', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isObject(el)).toEqual(false);
    });

    it ('not see an array as an object', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isObject(el)).toEqual(false);
    });

    it ('not see a function as an object', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isObject(el)).toEqual(false);
    });

    it ('not see formdata as an object', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isObject(el)).toEqual(false);
    });
});

describe("Object - pick", () => {
    let subject = {
        a : 100,
        b : 200,
        c : {
            d : 5,
            e : true,
            f : [0, 1, 2],
        },
    };

    it ('correctly retrieve the selected keys', () => {
        expect(pick(subject, ['a'])).toEqual({ a: 100 });
        expect(pick(subject, ['a', 'b'])).toEqual({ a: 100, b: 200 });
        expect(pick(subject, ['a', 'c.e'])).toEqual({ a: 100, c: { e: true }});
        expect(pick(subject, ['a', 'c.d', 'c.f'])).toEqual({ a: 100, c: { d: 5, f: [0, 1, 2] }});
        expect(pick(subject, ['a', 'b', 'd'])).toEqual({ a: 100, b: 200 });
    });

    it ('returns an empty object when nothing is passed', () => {
        expect(pick()).toEqual({});
    });

    it ('returns an empty object when no keys are passed', () => {
        expect(pick(subject)).toEqual({});
    });

    it ('throws a type error when passed something else than an object', () => {
        expect(function() {
            pick(false);
        }).toThrowError(TypeError);
        expect(function() {
            pick(subject, false);
        }).toThrowError(TypeError);
    });
});

describe("Object - merge", () => {
    it ('returns the target object if only passed a target', () => {
        expect(merge({a: 1, b: 2})).toEqual({a: 1, b:2 });
    });

    it ('merges keys correctly', () => {
        expect(merge({ a: 1, b: 2, c: true}, { a: 5, c: false })).toEqual({ a: 5, b: 2, c: false });
        expect(merge({
            a: [0, 1, 2, 3],
            b: {
                name: 'utils',
                status: 0,
                available: false,
            },
            c: {
                foo: 'bar',
                hello: 'world',
            },
        }, { a: ['foo', 'bar'], b: { available: true }, c: { hello: 'core' }})).toEqual({
            a: ['foo', 'bar'],
            b: {
                name: 'utils',
                status: 0,
                available: true,
            },
            c: {
                foo: 'bar',
                hello: 'core',
            },
        });
    });

    it ('does not merge in keys that are not defined in the target', () => {
        expect(merge({ a: 1, b: 2 }, { a: 2, b: 3, c: 4 })).toEqual({ a: 2, b: 3 });
    });

    it ('throws a type error when passed something else than an object', () => {
        expect(function() {
            merge(false, { a: 2 })
        }).toThrowError(TypeError);
    });
});

describe("Object - forValues", () => {
    let subject_sum, subject_obj;

    beforeEach(() => {
        subject_sum = { a: 1, b: 2, c: 3 };
        subject_obj = {
            1823 : {
                first_name: 'Jane',
                last_name: 'Doe',
            },
            4324 : {
                first_name: 'John',
                last_name: 'Doe',
            },
            231312: {
                first_name: 'Krusty',
                last_name: 'The Clown',
            },
        };
    });

    it ('correctly executes the cb on every value', () => {
        expect(forValues(subject_sum, (key, val) => val + 1)).toEqual({ a: 2, b: 3, c: 4 });
        expect(forValues(subject_obj, (key, val) => Object.assign(val, { name: `${val.first_name} ${val.last_name}` }))).toEqual({
            1823 : {
                name: 'Jane Doe',
                first_name: 'Jane',
                last_name: 'Doe',
            },
            4324 : {
                name: 'John Doe',
                first_name: 'John',
                last_name: 'Doe',
            },
            231312: {
                name: 'Krusty The Clown',
                first_name: 'Krusty',
                last_name: 'The Clown',
            },
        });
        expect(forValues(subject_sum, noopreturn)).toEqual(subject_sum);
    });

    it ('throws a type error when passed something else than an object', () => {
        expect(function() {
            forValues(false, (key, val) => val + 1);
        }).toThrowError(TypeError);
    });
});

describe("Object - zip", () => {
    it ('returns an empty object when called without parameters', () => {
        expect(zip()).toEqual({});
    });

    it ('only returns a zipped object for the keys that are passed', () => {
        expect(zip(['a'], [1, 2, 3])).toEqual({a: 1});
    });

    it ('defaults to null when passed with only keys', () => {
        expect(zip(['a', 'b', 'c'])).toEqual({a: null, b: null, c: null});
    });

    it ('defaults to the provided default when passed one', () => {
        expect(zip(['a', 'b', 'c'], false, false)).toEqual({a: false, b: false, c: false});
    });

    it ('zips an object when passed with the correct parameters', () => {
        expect(zip(['a', 'b', 'c'], [1, 2, 3])).toEqual({ a: 1, b: 2, c: 3});
    });

    it ('throws a type error when passed something else than the expected parameters', () => {
        expect(function() {
            zip(false);
        }).toThrowError(TypeError);

        expect(function() {
            zip(['a'], { hello: 'bar' });
        }).toThrowError(TypeError);
    });
});

describe("Object - define", () => {
    it ('returns an empty object when called without parameters', () => {
        expect(define()).toEqual({});
    });

    it ('returns the same object when called with an empty properties object and an existing object', () => {
        expect(define({}, {a: 1})).toEqual({a: 1});
    });

    it ('defines properties that are passed without passing an existing object', () => {
        const obj = define({
            a: {
                configurable: true,
                get: () => 1,
            },
            b: {
                configurable: true,
                value: () => 2,
            },
        });

        expect(obj.a).toBeDefined();
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'a').get).toBe('function');

        expect(obj.b).toBeDefined();
        expect(Object.getOwnPropertyDescriptor(obj, 'b').get).toBe(undefined);
        expect(Object.getOwnPropertyDescriptor(obj, 'b').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'b').value).toBe('function');

        const spy_a = spyOnProperty(obj, 'a', 'get').and.callThrough();
        expect(obj.a).toBe(1);
        expect(spy_a).toHaveBeenCalled();

        const spy_b = spyOnProperty(obj, 'b', 'value').and.callThrough();
        expect(obj.b()).toBe(2);
        expect(spy_b).toHaveBeenCalled();
    });

    it ('defines properties that are passed on an existing object', () => {
        const obj = define({
            a: {
                configurable: true,
                get: () => 1,
            },
            b: {
                configurable: true,
                value: () => 2,
            },
        }, { c: 1 });

        expect(obj.a).toBeDefined();
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'a').get).toBe('function');

        expect(obj.b).toBeDefined();
        expect(Object.getOwnPropertyDescriptor(obj, 'b').get).toBe(undefined);
        expect(Object.getOwnPropertyDescriptor(obj, 'b').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'b').value).toBe('function');

        const spy_a = spyOnProperty(obj, 'a', 'get').and.callThrough();
        expect(obj.a).toBe(1);
        expect(spy_a).toHaveBeenCalled();

        const spy_b = spyOnProperty(obj, 'b', 'value').and.callThrough();
        expect(obj.b()).toBe(2);
        expect(spy_b).toHaveBeenCalled();

        expect(obj.c).toBe(1);
    });

    it ('defines properties that are passed on an existing object', () => {
        const obj = define({
            a: {
                configurable: true,
                get: () => 1,
            },
            b: {
                configurable: true,
                value: () => 2,
            },
        }, { a: 5 });

        expect(obj.a).toBeDefined();
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'a').get).toBe('function');

        expect(obj.b).toBeDefined();
        expect(Object.getOwnPropertyDescriptor(obj, 'b').get).toBe(undefined);
        expect(Object.getOwnPropertyDescriptor(obj, 'b').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'b').value).toBe('function');

        const spy_a = spyOnProperty(obj, 'a', 'get').and.callThrough();
        expect(obj.a).toBe(1);
        expect(spy_a).toHaveBeenCalled();

        const spy_b = spyOnProperty(obj, 'b', 'value').and.callThrough();
        expect(obj.b()).toBe(2);
        expect(spy_b).toHaveBeenCalled();
    });

    it ('throws a type error when passed something else than the expected parameters', () => {
        expect(function() {
            define(false);
        }).toThrowError(TypeError);

        expect(function() {
            define({}, false);
        }).toThrowError(TypeError);
    });
});

describe("Object - defineFrozen", () => {
    it ('returns a frozen empty object when called without parameters', () => {
        const obj = defineFrozen();

        expect(obj).toEqual({});
        expect(Object.isFrozen(obj)).toEqual(true);
        expect(function() {
            obj.b = false;
        }).toThrowError();
    });

    it ('returns a frozen version of the same object when called with an empty properties object and an existing object', () => {
        const obj = defineFrozen({}, {a: 1});

        expect(obj).toEqual({a: 1});
        expect(Object.isFrozen(obj)).toEqual(true);
        expect(function() {
            obj.a = 9999;
        }).toThrowError();
    });

    it ('defines properties that are passed without passing an existing object, and freezes them', () => {
        const obj = defineFrozen({
            a: {
                get: () => 1,
            },
        });

        expect(obj.a).toBeDefined();
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'a').get).toBe('function');

        expect(Object.isFrozen(obj)).toEqual(true);
        expect(function () {
            Object.defineProperty(obj, {
                x: {
                    get: () => 9999,
                },
            });
        }).toThrowError();
    });

    it ('throws a type error when passed something else than the expected parameters', () => {
        expect(function() {
            defineFrozen(false);
        }).toThrowError(TypeError);

        expect(function() {
            defineFrozen({}, false);
        }).toThrowError(TypeError);
    });
});

describe("Object - defineSealed", () => {
    it ('returns a sealed empty object when called without parameters', () => {
        const obj = defineSealed();

        expect(obj).toEqual({});
        expect(Object.isSealed(obj)).toEqual(true);
        expect(function() {
            obj.b = false;
        }).toThrowError();
    });

    it ('returns a sealed version of the same object when called with an empty properties object and an existing object', () => {
        const obj = defineSealed({}, {a: 1});

        expect(obj).toEqual({a: 1});
        expect(Object.isSealed(obj)).toEqual(true);
        expect(function() {
            obj.a = 9999;
        }).not.toThrowError();
        expect(function() {
            obj.b = 9999;
        }).toThrowError();
    });

    it ('defines properties that are passed without passing an existing object, and seals them', () => {
        const obj = defineSealed({
            a: {
                get: () => 1,
            },
        });

        expect(obj.a).toBeDefined();
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'a').get).toBe('function');

        expect(Object.isSealed(obj)).toEqual(true);
        expect(function () {
            obj.a = 9999;
        }).toThrowError();
        expect(function () {
            Object.defineProperty(obj, {
                x: {
                    get: () => 9999,
                },
            });
        }).toThrowError();
    });

    it ('throws a type error when passed something else than the expected parameters', () => {
        expect(function() {
            defineSealed(false);
        }).toThrowError(TypeError);

        expect(function() {
            defineSealed({}, false);
        }).toThrowError(TypeError);
    });
});

describe("Object - isNotEmptyObject", () => {
    it ('not see a string as a not empty object', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNotEmptyObject(el)).toEqual(false);
    });

    it ('not see a numeric value as a not empty object', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isNotEmptyObject(el)).toEqual(false);
    });

    it ('not see a boolean as a not empty object', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNotEmptyObject(el)).toEqual(false);
    });

    it ('not see a regex as a not empty object', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNotEmptyObject(el)).toEqual(false);
    });

    it ('see an object as an object', () => {
        expect(isNotEmptyObject({bar:'foo'})).toEqual(true);

        expect(isNotEmptyObject(Object.defineProperties(Object.create(null), {
            'hi': {
                enumerable: true,
                get: () => 'there',
            }
        }))).toEqual(true);
    });

    it ('see an empty object as an empty object', () => {
        expect(isNotEmptyObject(Object.create(null))).toEqual(false);
        expect(isNotEmptyObject(new Object())).toEqual(false);
        expect(isNotEmptyObject(Object.create([]))).toEqual(false);
        expect(isNotEmptyObject(Object.defineProperties(Object.create(null), {
            'hi': {
                enumerable: false,
                get: () => 'there',
            }
        }))).toEqual(false);
    });

    it ('not see a nullable as a not empty object', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNotEmptyObject(el)).toEqual(false);
    });

    it ('not see a date as a not empty object', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNotEmptyObject(el)).toEqual(false);
    });

    it ('not see an array as a not empty object', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNotEmptyObject(el)).toEqual(false);
    });

    it ('not see a function as a not empty object', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNotEmptyObject(el)).toEqual(false);
    });

    it ('not see formdata as a not empty object', () => {
        let vals = fnFormDataValues();
        for (let el of vals) expect(isNotEmptyObject(el)).toEqual(false);
    });
});
