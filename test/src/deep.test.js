import { equal } from '../../src/equal';
import { deepFreeze, deepSeal, deepSet, deepGet, deepDefine } from '../../src/deep';

const original = {
    a : 1,
    test : [1, 2, 3],
    c : {
        d : 'foo',
        e : {
            f : 'bar',
        },
    },
    bla : [
        {
            a : 1,
        },
    ],
};

describe("Deep - deepSeal", () => {
    let subject;

    beforeEach(function () {
        subject = deepSeal(JSON.parse(JSON.stringify(original)));
    });

    it ('isSealed flag on every nested object', function () {
        expect(Object.isSealed(subject)).toEqual(true);
        expect(Object.isSealed(subject.test)).toEqual(true);
        expect(Object.isSealed(subject.c)).toEqual(true);
        expect(Object.isSealed(subject.c.e)).toEqual(true);
    });

    it ('allow adjusting properties', function () {
        function fn (key, new_value) {
            //  If its an array and the value is not an array, push
            if (Array.isArray(deepGet(subject, key)) && !Array.isArray(new_value)) {
                deepGet(subject, key).push(new_value);
            } else {
                //  Set key to the new value
                deepSet(subject, key, new_value);
            }

            return equal(subject, original);
        }

        expect(fn('a', 'Hello world')).toEqual(false);
        expect(fn('c.d', null)).toEqual(false);
        expect(fn('c.e.f', 'foo')).toEqual(false);
        expect(fn('test', [3, 6, 9])).toEqual(false);
        expect(fn('test', 42)).toEqual(false);
        expect(function () { return fn('foo', 'bar') }).toThrowError(TypeError);
    });

    it ('not allow assigning new properties', function () {
        function fn (key) {
            deepSet(subject, key);
        }

        expect(function () { fn('true') }).toThrowError(TypeError);
        expect(function () { fn('c.e.g') }).toThrowError(TypeError);
    });

    it ('not allow defining properties', function () {
        expect(function () {
            subject.defineProperty('test', {
                get : function () {
                    return 'foo';
                },
            });
        }).toThrowError(TypeError);
    });

    it ('throw a type error if something different than an object/array is passed', function () {
        expect(function () { deepSeal() }).toThrowError(TypeError);
        expect(function () { deepSeal(42) }).toThrowError(TypeError);
        expect(function () { deepSeal('foo') }).toThrowError(TypeError);
        expect(function () { deepSeal(false) }).toThrowError(TypeError);
    });
});

describe("Deep - deepFreeze", () => {
    let subject;

    beforeEach(function () {
        subject = deepFreeze(JSON.parse(JSON.stringify(original)));
    });

    it ('isFrozen flag on every nested object', function () {
        expect(Object.isFrozen(subject)).toEqual(true);
        expect(Object.isFrozen(subject.test)).toEqual(true);
        expect(Object.isFrozen(subject.c)).toEqual(true);
        expect(Object.isFrozen(subject.c.e)).toEqual(true);
    });

    it ('not allow adjusting properties', function () {
        function fn (key, new_value) {
            //  If its an array and the value is not an array, push
            if (Array.isArray(deepGet(subject, key)) && !Array.isArray(new_value)) {
                deepGet(subject, key).push(new_value);
            } else {
                //  Set key to the new value
                deepSet(subject, key, new_value);
            }

            return equal(subject, original);
        }

        expect(function () { fn('a', 'Hello world') }).toThrowError(TypeError);
        expect(function () { fn('c.d', null) }).toThrowError(TypeError);
        expect(function () { fn('c.e.f', 'foo') }).toThrowError(TypeError);
        expect(function () { fn('test', [3, 6, 9]) }).toThrowError(TypeError);
        expect(function () { fn('test', 42) }).toThrowError(TypeError);
    });

    it ('not allow assigning new properties', function () {
        function fn (subject, key) {
            deepSet(subject, key);
        }
        expect(function () { fn('true') }).toThrowError(TypeError);
        expect(function () { fn('c.e.g') }).toThrowError(TypeError);
    });

    it ('not allow defining properties', function () {
        expect(function () {
            subject.defineProperty('test', {
                get : function () {
                    return 'foo';
                },
            });
        }).toThrowError(TypeError);
    });

    it ('throw a type error if something different than an object/array is passed', function () {
        expect(function () { deepFreeze() }).toThrowError(TypeError);
        expect(function () { deepFreeze(42) }).toThrowError(TypeError);
        expect(function () { deepFreeze('foo') }).toThrowError(TypeError);
        expect(function () { deepFreeze(false) }).toThrowError(TypeError);
    });
});

describe("Deep - deepSet", () => {
    const original = {
        a: 1,
        b: 2,
        c: 3,
        d: [
            0,
            1,
            2,
            3,
            {
                e: 'Hello',
                f: ['a', 'b', 'c'],
            },
        ],
    };
    let subject;

    beforeEach(function() {
        subject = JSON.parse(JSON.stringify(original));
    });

    it ('correctly sets a value on an existing key', function () {
        deepSet(subject, 'c', 4);
        deepSet(subject, 'd.0', 100);
        deepSet(subject, 'd.4.e', 'world');
        deepSet(subject, 'd.4.f.0', 'Y');

        expect(subject.c).toEqual(4);
        expect(subject.d[0]).toEqual(100);
        expect(subject.d[4].e).toEqual('world');
        expect(subject.d[4].f[0]).toEqual('Y');
    });

    it ('correctly set a value on an inexisting key', function () {
        deepSet(subject, 'f', 42);
        deepSet(subject, 'e.a.b.c.d.e.f.g.h', 'valkyrie rules');
        deepSet(subject, 'e.b', [0, 1, 2]);

        expect(subject.f).toEqual(42);
        expect(subject.e.a.b.c.d.e.f.g.h).toEqual('valkyrie rules');
        expect(subject.e.b).toEqual([0, 1, 2]);
    });

    it ('correctly defines a value on an existing key', function () {
        deepSet(subject, 'a', { get: () => 5 }, true);

        expect(subject.a).toEqual(5);
        expect(Object.getOwnPropertyDescriptor(subject, 'a').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(subject, 'a').get).toBe('function');
    });

    it ('correctly defines a value on an inexisting key', function () {
        deepSet(subject, 'g', { get: () => 5 }, true);

        expect(subject.g).toEqual(5);
        expect(Object.getOwnPropertyDescriptor(subject, 'g').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(subject, 'g').get).toBe('function');
    });
});

describe("Deep - deepGet", () => {
    const original = {
        a: 1,
        b: 2,
        c: 3,
        d: [
            0,
            1,
            2,
            3,
            {
                e: 'Hello',
                f: ['a', 'b', 'c'],
                g: '',
                k: false,
            },
        ],
        h : '',
        i : false,
        j : true,
        l : [],
    };
    let subject;

    beforeEach(function() {
        subject = JSON.parse(JSON.stringify(original));
    });

    it ('correctly retrieves a value on an existing key', function () {
        expect(function () {
            deepGet('hello', '2');
        }).toThrowError(TypeError);
        expect(deepGet(subject, 'a')).toEqual(1);
        expect(deepGet(subject, 'd[0]')).toEqual(0);
        expect(deepGet(subject, 'd.0')).toEqual(0);
        expect(deepGet(subject, 'd.5')).toEqual(undefined);
        expect(deepGet(subject, 'd[4].e')).toEqual('Hello');
        expect(deepGet(subject, 'd.4.f[2]')).toEqual('c');
        expect(deepGet(subject, 'd.4.g')).toEqual('');
        expect(deepGet(subject, 'h')).toEqual('');
        expect(deepGet(subject, 'i')).toEqual(false);
        expect(deepGet(subject, 'j')).toEqual(true);
        expect(deepGet(subject, 'd.4.k')).toEqual(false);
        expect(deepGet(subject, 'l')).toEqual([]);
    });

    it ('correctly throws an error on failure', function () {
        expect(function () {
            deepGet('hello', '2');
        }).toThrowError(TypeError);
    });
});

describe("Deep - deepDefine", () => {
    const original = {
        a: 1,
        b: 2,
        c: 3,
        d: [
            0,
            1,
            2,
            3,
            {
                e: 'Hello',
                f: ['a', 'b', 'c'],
            },
        ],
    };
    let subject;

    beforeEach(function() {
        subject = JSON.parse(JSON.stringify(original));
    });

    it ('correctly defines a value on an existing key', function () {
        deepDefine(subject, 'a', { get: () => 5 });

        expect(subject.a).toEqual(5);
        expect(Object.getOwnPropertyDescriptor(subject, 'a').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(subject, 'a').get).toBe('function');
    });

    it ('correctly defines a value on an inexisting key', function () {
        deepDefine(subject, 'g', { get: () => 5 });

        expect(subject.g).toEqual(5);
        expect(Object.getOwnPropertyDescriptor(subject, 'g').set).toBe(undefined);
        expect(typeof Object.getOwnPropertyDescriptor(subject, 'g').get).toBe('function');
    });
});
