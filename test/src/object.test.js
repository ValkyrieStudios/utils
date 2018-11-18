import { isObject, pick, merge, forValues, zip, define, defineFrozen, defineSealed } from '../../src/object';
import { noopreturn } from '../../src/function';

describe("Object - isObject", () => {
    it ('not see a string as an object', () => {
        expect(isObject('foo')).toEqual(false);
        expect(isObject(new String('bar'))).toEqual(false);
    });

    it ('not see a numeric value as an object', () => {
        expect(isObject(1)).toEqual(false);
        expect(isObject(NaN)).toEqual(false);
        expect(isObject(0.000001)).toEqual(false);
        expect(isObject(8e10)).toEqual(false);
        expect(isObject(Math.PI)).toEqual(false);
        expect(isObject(new Number(1.12345))).toEqual(false);
        expect(isObject(new Number(Number.EPSILON))).toEqual(false);
    });

    it ('not see a boolean as an object', () => {
        expect(isObject(true)).toEqual(false);
        expect(isObject(false)).toEqual(false);
        expect(isObject(Boolean(true))).toEqual(false);
        expect(isObject(Boolean(false))).toEqual(false);
        expect(isObject(Boolean('foo'))).toEqual(false);
        expect(isObject(new Boolean(false))).toEqual(false);
    });

    it ('not see a regex as an object', () => {
        expect(isObject(/abcdefg/i)).toEqual(false);
        expect(isObject(new RegExp('\\w+'))).toEqual(false);
    });

    it ('see an object as an object', () => {
        expect(isObject({bar:'foo'})).toEqual(true);
        expect(isObject(new Object())).toEqual(true);
        expect(isObject(Object.create(null))).toEqual(true);
        expect(isObject(Object.create([]))).toEqual(true);
    });

    it ('not see a null as an object', () => {
        expect(isObject(null)).toEqual(false);
    });

    it ('not see a date as an object', () => {
        expect(isObject(new Date())).toEqual(false);
        expect(isObject(Date.now())).toEqual(false);
    });

    it ('not see an undefined as an object', () => {
        expect(isObject(undefined)).toEqual(false);
    });

    it ('not see an array as an object', () => {
        expect(isObject([0, 1, 2])).toEqual(false);
        expect(isObject(new Array(1, 2, 3))).toEqual(false);
        expect(isObject(new Array(5))).toEqual(false);
    });

    it ('not see a function as an object', () => {
        function testFunction () {}

        const testArrowFunction = () => {};

        expect(isObject(testFunction)).toEqual(false);
        expect(isObject(testArrowFunction)).toEqual(false);
    });

    it ('not see formdata as an object', () => {
        let fdata = new FormData();
        expect(isObject(fdata)).toEqual(false);
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
