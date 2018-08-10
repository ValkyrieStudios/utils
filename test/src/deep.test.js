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

const __flag = (obj, flag) => {
    expect(Object[flag](obj)).toEqual(true);
    expect(Object[flag](obj.test)).toEqual(true);
    expect(Object[flag](obj.c)).toEqual(true);
    expect(Object[flag](obj.c.e)).toEqual(true);
};

const __throw = (fn, value) => {
    expect(function () {
        fn(value || 42);
    }).toThrowError(TypeError);
};

const __adjustment = (obj, should_allow) => {
    function fn (key, new_value) {
        try {
            //  If its an array and the value is not an array, push
            if (Array.isArray(deepGet(obj, key)) && !Array.isArray(new_value)) {
                deepGet(obj, key).push(new_value);
            } else {
                //  Set key to the new value
                deepSet(obj, key, new_value);
            }
        } catch (err) {
            //  true, because an error was thrown ( meaning we cant extend this prop )
            return true;
        }

        return equal(obj, original);
    }

    expect(fn('a', 'Hello world')).toEqual(should_allow);
    expect(fn('c.d', null)).toEqual(should_allow);
    expect(fn('c.e.f', 'foo')).toEqual(should_allow);
    expect(fn('test', [3, 6, 9])).toEqual(should_allow);
    expect(fn('test', 42)).toEqual(should_allow);
}

const __assignment = (obj) => {
    function fn (key) {
        try {
            _.set(test_subject, key);
        } catch (err) {
            return true;
        }

        return !!(_.isEqual(test_subject, original));
    }

    expect(fn('foo')).toEqual(true);
    expect(fn('c.e.g')).toEqual(true);
}

const __define = (obj) => {
    expect(function () {
        try {
            obj.defineProperty('test', {
                get : function () {
                    return 'foo';
                },
            });
        } catch (err) {
            return true;
        }

        return !!(_.isEqual(test_subject, original));
    }()).toEqual(true);
}


describe("Deep - deepSeal", () => {
    let subject;

    beforeEach(function () {
        subject = deepSeal(JSON.parse(JSON.stringify(original)));
    });

    it ('isSealed flag on every nested object', function () {
        __flag(subject, 'isSealed');
    });

    it ('allow adjusting properties', function () {
        __adjustment(subject, false);
    });

    it ('not allow assigning new properties', function () {
        __assignment(subject);
    });

    it ('not allow defining properties', function () {
        __define(subject);
    });

    it ('throw a type error if something different than an object/array is passed', function () {
        __throw('deepSeal');
    });
});

describe("Deep - deepFreeze", () => {
    let subject;

    beforeEach(function () {
        subject = deepFreeze(JSON.parse(JSON.stringify(original)));
    });

    it ('isFrozen flag on every nested object', function () {
        __flag(subject, 'isFrozen');
    });

    it ('not allow adjusting properties', function () {
        __adjustment(subject, true);
    });

    it ('not allow assigning new properties', function () {
        __assignment(subject);
    });

    it ('not allow defining properties', function () {
        __define(subject);
    });

    it ('throw a type error if something different than an object/array is passed', function () {
        __throw('deepFreeze');
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
            },
        ],
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
