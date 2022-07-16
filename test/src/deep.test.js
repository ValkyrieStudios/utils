'use strict';

import equal        from '../../src/equal';
import deepFreeze   from '../../src/deep/freeze';
import deepSeal     from '../../src/deep/seal';
import deepSet      from '../../src/deep/set';
import deepGet      from '../../src/deep/get';
import deepDefine   from '../../src/deep/define';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

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
        expect(Object.isSealed(subject)).to.eql(true);
        expect(Object.isSealed(subject.test)).to.eql(true);
        expect(Object.isSealed(subject.c)).to.eql(true);
        expect(Object.isSealed(subject.c.e)).to.eql(true);
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

        expect(fn('a', 'Hello world')).to.eql(false);
        expect(fn('c.d', null)).to.eql(false);
        expect(fn('c.e.f', 'foo')).to.eql(false);
        expect(fn('test', [3, 6, 9])).to.eql(false);
        expect(fn('test', 42)).to.eql(false);
        expect(function () { return fn('foo', 'bar') }).to.throw(TypeError);
    });

    it ('not allow assigning new properties', function () {
        function fn (key) {
            deepSet(subject, key);
        }

        expect(function () { fn('true') }).to.throw(TypeError);
        expect(function () { fn('c.e.g') }).to.throw(TypeError);
    });

    it ('not allow defining properties', function () {
        expect(function () {
            subject.defineProperty('test', {
                get : function () {
                    return 'foo';
                },
            });
        }).to.throw(TypeError);
    });

    it ('throw a type error if something different than an object/array is passed', function () {
        expect(function () { deepSeal() }).to.throw(TypeError);
        expect(function () { deepSeal(42) }).to.throw(TypeError);
        expect(function () { deepSeal('foo') }).to.throw(TypeError);
        expect(function () { deepSeal(false) }).to.throw(TypeError);
    });
});

describe("Deep - deepFreeze", () => {
    let subject;

    beforeEach(function () {
        subject = deepFreeze(JSON.parse(JSON.stringify(original)));
    });

    it ('isFrozen flag on every nested object', function () {
        expect(Object.isFrozen(subject)).to.eql(true);
        expect(Object.isFrozen(subject.test)).to.eql(true);
        expect(Object.isFrozen(subject.c)).to.eql(true);
        expect(Object.isFrozen(subject.c.e)).to.eql(true);
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

        expect(function () { fn('a', 'Hello world') }).to.throw(TypeError);
        expect(function () { fn('c.d', null) }).to.throw(TypeError);
        expect(function () { fn('c.e.f', 'foo') }).to.throw(TypeError);
        expect(function () { fn('test', [3, 6, 9]) }).to.throw(TypeError);
        expect(function () { fn('test', 42) }).to.throw(TypeError);
    });

    it ('not allow assigning new properties', function () {
        function fn (subject, key) {
            deepSet(subject, key);
        }
        expect(function () { fn('true') }).to.throw(TypeError);
        expect(function () { fn('c.e.g') }).to.throw(TypeError);
    });

    it ('not allow defining properties', function () {
        expect(function () {
            subject.defineProperty('test', {
                get : function () {
                    return 'foo';
                },
            });
        }).to.throw(TypeError);
    });

    it ('throw a type error if something different than an object/array is passed', function () {
        expect(function () { deepFreeze() }).to.throw(TypeError);
        expect(function () { deepFreeze(42) }).to.throw(TypeError);
        expect(function () { deepFreeze('foo') }).to.throw(TypeError);
        expect(function () { deepFreeze(false) }).to.throw(TypeError);
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

        expect(subject.c).to.eql(4);
        expect(subject.d[0]).to.eql(100);
        expect(subject.d[4].e).to.eql('world');
        expect(subject.d[4].f[0]).to.eql('Y');
    });

    it ('correctly set a value on an inexisting key', function () {
        deepSet(subject, 'f', 42);
        deepSet(subject, 'e.a.b.c.d.e.f.g.h', 'valkyrie rules');
        deepSet(subject, 'e.b', [0, 1, 2]);
        deepSet(subject, ['q', '', 0], 'valkyrie is cool');
        deepSet(subject, ['q', 1], 'valkyrie is fun');

        expect(subject.f).to.eql(42);
        expect(subject.e.a.b.c.d.e.f.g.h).to.eql('valkyrie rules');
        expect(subject.e.b).to.eql([0, 1, 2]);
        expect(subject.q).to.deep.eql({0: 'valkyrie is cool', 1: 'valkyrie is fun'});
    });

    it ('correctly defines a value on an existing key', function () {
        deepSet(subject, 'a', { get: () => 5 }, true);

        expect(subject.a).to.eql(5);
        expect(Object.getOwnPropertyDescriptor(subject, 'a').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(subject, 'a').get, 'function');
    });

    it ('correctly defines a value on an inexisting key', function () {
        deepSet(subject, 'g', { get: () => 5 }, true);

        expect(subject.g).to.eql(5);
        expect(Object.getOwnPropertyDescriptor(subject, 'g').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(subject, 'g').get, 'function');
    });

    it ('correctly throws an error on failure', function () {
        expect(function () {
            deepSet('hello', '2');
        }).to.throw(TypeError);
    });

    it ('correctly throws when not passed an object or array', function () {
        for (let el of [
            1, 2, 3, .5, 0.4, -1, true, new Date(), /1/g, false, 'hello', 'abc'
        ]) {
            expect(function () {
                deepSet(el, '2');
            }).to.throw(TypeError);
        }
    });

    it ('correctly throws when not passed a string/array key', function () {
        let obj = {a: 'bi'};
        for (let el of [
            {a:1}, true, new Date(), /1/g, false, 123, 0.123
        ]) {
            expect(function () {
                deepSet(obj, el);
            }).to.throw(TypeError);
        }
        expect(obj).to.deep.equal({a: 'bi'});
    });

    it ('correctly throws when passed an empty string path', function () {
        let obj = {a: 'bi'};
        expect(function () {
            deepSet(obj, '');
        }).to.throw(TypeError);
        expect(obj).to.deep.equal({a: 'bi'});
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
        }).to.throw(TypeError);
        expect(deepGet(subject, 'a')).to.eql(1);
        expect(deepGet(subject, 'd[0]')).to.eql(0);
        expect(deepGet(subject, 'd.0')).to.eql(0);
        expect(deepGet(subject, 'd.5')).to.eql(undefined);
        expect(deepGet(subject, 'd[4].e')).to.eql('Hello');
        expect(deepGet(subject, 'd.4.f[2]')).to.eql('c');
        expect(deepGet(subject, 'd.4.g')).to.eql('');
        expect(deepGet(subject, 'h')).to.eql('');
        expect(deepGet(subject, 'i')).to.eql(false);
        expect(deepGet(subject, 'j')).to.eql(true);
        expect(deepGet(subject, 'd.4.k')).to.eql(false);
        expect(deepGet(subject, 'l')).to.eql([]);
    });

    it ('correctly throws an error on failure', function () {
        expect(function () {
            deepGet('hello', '2');
        }).to.throw(TypeError);
    });

    it ('correctly throws when not passed an object or array', function () {
        for (let el of [
            1, 2, 3, .5, 0.4, -1, true, new Date(), /1/g, false, 'hello', 'abc'
        ]) {
            expect(function () {
                deepGet(el, '2');
            }).to.throw(TypeError);
        }
    });

    it ('correctly throws when not passed a string key', function () {
        for (let el of [
            {a:1}, [0,1,2], true, new Date(), /1/g, false, 123, 0.123
        ]) {
            expect(function () {
                deepGet({a: 'bi'}, el);
            }).to.throw(TypeError);
        }
    });

    it ('correctly throws when passed an empty string path', function () {
        expect(function () {
            deepGet({a: 'bi'}, '');
        }).to.throw(TypeError);
    });

    it ('correctly returns object when passed a single path string key and get_parent is set to true', function () {
        let out = deepGet({a: 'bi'}, 'a', true);
        expect(out).to.deep.equal({a: 'bi'});
    });

    it ('correctly returns object parent when passed a multi path string key and get_parent is set to true', function () {
        let obj = {a: {b: {c: 'hi'}}};

        let out = deepGet(obj, 'a.b.c', true);
        expect(out).to.deep.equal({c: 'hi'});

        let out2 = deepGet(obj, 'a.b', true);
        expect(out2).to.deep.equal({b: {c: 'hi'}});
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

        expect(subject.a).to.eql(5);
        expect(Object.getOwnPropertyDescriptor(subject, 'a').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(subject, 'a').get, 'function');
    });

    it ('correctly defines a value on an inexisting key', function () {
        deepDefine(subject, 'g', { get: () => 5 });

        expect(subject.g).to.eql(5);
        expect(Object.getOwnPropertyDescriptor(subject, 'g').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(subject, 'g').get, 'function');
    });
});
