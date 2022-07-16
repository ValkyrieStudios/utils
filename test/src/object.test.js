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
    fnNullables,
} from '../constants';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("Object - isObject", () => {
    it ('not see a string as an object', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isObject(el)).to.eql(false);
    });

    it ('not see a numeric value as an object', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isObject(el)).to.eql(false);
    });

    it ('not see a boolean as an object', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isObject(el)).to.eql(false);
    });

    it ('not see a regex as an object', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isObject(el)).to.eql(false);
    });

    it ('see an object as an object', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isObject(el)).to.eql(true);
    });

    it ('not see a nullable as an object', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isObject(el)).to.eql(false);
    });

    it ('not see a date as an object', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isObject(el)).to.eql(false);
    });

    it ('not see an array as an object', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isObject(el)).to.eql(false);
    });

    it ('not see a function as an object', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isObject(el)).to.eql(false);
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
        expect(pick(subject, ['a'])).to.eql({ a: 100 });
        expect(pick(subject, ['a', 'b'])).to.eql({ a: 100, b: 200 });
        expect(pick(subject, ['a', 'c.e'])).to.eql({ a: 100, c: { e: true }});
        expect(pick(subject, ['a', 'c.d', 'c.f'])).to.eql({ a: 100, c: { d: 5, f: [0, 1, 2] }});
        expect(pick(subject, ['a', 'b', 'd'])).to.eql({ a: 100, b: 200 });
    });

    it ('returns an empty object when nothing is passed', () => {
        expect(pick()).to.eql({});
    });

    it ('returns an empty object when no keys are passed', () => {
        expect(pick(subject)).to.eql({});
    });

    it ('throws a type error when passed something else than an object', () => {
        expect(function() {
            pick(false);
        }).to.throw(TypeError);
        expect(function() {
            pick(subject, false);
        }).to.throw(TypeError);
    });
});

describe("Object - merge", () => {
    it ('returns the target object if only passed a target', () => {
        expect(merge({a: 1, b: 2})).to.eql({a: 1, b:2 });
    });

    it ('merges keys correctly', () => {
        expect(merge({ a: 1, b: 2, c: true}, { a: 5, c: false })).to.eql({ a: 5, b: 2, c: false });
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
        }, { a: ['foo', 'bar'], b: { available: true }, c: { hello: 'core' }})).to.eql({
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
        expect(merge({ a: 1, b: 2 }, { a: 2, b: 3, c: 4 })).to.eql({ a: 2, b: 3 });
    });

    it ('throws a type error when passed something else than an object', () => {
        expect(function() {
            merge(false, { a: 2 })
        }).to.throw(TypeError);
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
        expect(forValues(subject_sum, (key, val) => val + 1)).to.eql({ a: 2, b: 3, c: 4 });
        expect(forValues(subject_obj, (key, val) => Object.assign(val, { name: `${val.first_name} ${val.last_name}` }))).to.eql({
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
        expect(forValues(subject_sum, noopreturn)).to.eql(subject_sum);
    });

    it ('throws a type error when passed something else than an object', () => {
        expect(function() {
            forValues(false, (key, val) => val + 1);
        }).to.throw(TypeError);
    });
});

describe("Object - zip", () => {
    it ('returns an empty object when called without parameters', () => {
        expect(zip()).to.eql({});
    });

    it ('only returns a zipped object for the keys that are passed', () => {
        expect(zip(['a'], [1, 2, 3])).to.eql({a: 1});
    });

    it ('defaults to null when passed with only keys', () => {
        expect(zip(['a', 'b', 'c'])).to.eql({a: null, b: null, c: null});
    });

    it ('defaults to the provided default when passed one', () => {
        expect(zip(['a', 'b', 'c'], false, false)).to.eql({a: false, b: false, c: false});
    });

    it ('zips an object when passed with the correct parameters', () => {
        expect(zip(['a', 'b', 'c'], [1, 2, 3])).to.eql({ a: 1, b: 2, c: 3});
    });

    it ('throws a type error when passed something else than the expected parameters', () => {
        expect(function() {
            zip(false);
        }).to.throw(TypeError);

        expect(function() {
            zip(['a'], { hello: 'bar' });
        }).to.throw(TypeError);
    });
});

describe("Object - define", () => {
    it ('returns an empty object when called without parameters', () => {
        expect(define()).to.eql({});
    });

    it ('returns the same object when called with an empty properties object and an existing object', () => {
        expect(define({}, {a: 1})).to.eql({a: 1});
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

        should.exist(obj.a);
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(obj, 'a').get, 'function');

        should.exist(obj.b);
        expect(Object.getOwnPropertyDescriptor(obj, 'b').get).to.eql(undefined);
        expect(Object.getOwnPropertyDescriptor(obj, 'b').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(obj, 'b').value, 'function');

        const spy_a = spy(obj, 'a');
        expect(obj.a).to.eql(1);
        expect(spy_a).to.have.been.called;

        const spy_b = spy(obj, 'b');
        expect(obj.b()).to.eql(2);
        expect(spy_b).to.have.been.called;
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

        should.exist(obj.a);
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(obj, 'a').get, 'function');

        should.exist(obj.b);
        expect(Object.getOwnPropertyDescriptor(obj, 'b').get).to.eql(undefined);
        expect(Object.getOwnPropertyDescriptor(obj, 'b').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(obj, 'b').value, 'function');

        const spy_a = spy(obj, 'a');
        expect(obj.a).to.eql(1);
        expect(spy_a).to.have.been.called;

        const spy_b = spy(obj, 'b');
        expect(obj.b()).to.eql(2);
        expect(spy_b).to.have.been.called;

        expect(obj.c).to.eql(1);
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

        should.exist(obj.a);
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(obj, 'a').get, 'function');

        should.exist(obj.b);
        expect(Object.getOwnPropertyDescriptor(obj, 'b').get).to.eql(undefined);
        expect(Object.getOwnPropertyDescriptor(obj, 'b').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(obj, 'b').value, 'function');

        const spy_a = spy(obj, 'a');
        expect(obj.a).to.eql(1);
        expect(spy_a).to.have.been.called;

        const spy_b = spy(obj, 'b');
        expect(obj.b()).to.eql(2);
        expect(spy_b).to.have.been.called;
    });

    it ('throws a type error when passed something else than the expected parameters', () => {
        expect(function() {
            define(false);
        }).to.throw(TypeError);

        expect(function() {
            define({}, false);
        }).to.throw(TypeError);
    });
});

describe("Object - defineFrozen", () => {
    it ('returns a frozen empty object when called without parameters', () => {
        const obj = defineFrozen();

        expect(obj).to.eql({});
        expect(Object.isFrozen(obj)).to.eql(true);
        expect(function() {
            obj.b = false;
        }).to.throw();
    });

    it ('returns a frozen version of the same object when called with an empty properties object and an existing object', () => {
        const obj = defineFrozen({}, {a: 1});

        expect(obj).to.eql({a: 1});
        expect(Object.isFrozen(obj)).to.eql(true);
        expect(function() {
            obj.a = 9999;
        }).to.throw();
    });

    it ('defines properties that are passed without passing an existing object, and freezes them', () => {
        const obj = defineFrozen({
            a: {
                get: () => 1,
            },
        });

        should.exist(obj.a);
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(obj, 'a').get, 'function');

        expect(Object.isFrozen(obj)).to.eql(true);
        expect(function () {
            Object.defineProperty(obj, {
                x: {
                    get: () => 9999,
                },
            });
        }).to.throw();
    });

    it ('throws a type error when passed something else than the expected parameters', () => {
        expect(function() {
            defineFrozen(false);
        }).to.throw(TypeError);

        expect(function() {
            defineFrozen({}, false);
        }).to.throw(TypeError);
    });
});

describe("Object - defineSealed", () => {
    it ('returns a sealed empty object when called without parameters', () => {
        const obj = defineSealed();

        expect(obj).to.eql({});
        expect(Object.isSealed(obj)).to.eql(true);
        expect(function() {
            obj.b = false;
        }).to.throw();
    });

    it ('returns a sealed version of the same object when called with an empty properties object and an existing object', () => {
        const obj = defineSealed({}, {a: 1});

        expect(obj).to.eql({a: 1});
        expect(Object.isSealed(obj)).to.eql(true);
        expect(function() {
            obj.a = 9999;
        }).not.to.throw();
        expect(function() {
            obj.b = 9999;
        }).to.throw();
    });

    it ('defines properties that are passed without passing an existing object, and seals them', () => {
        const obj = defineSealed({
            a: {
                get: () => 1,
            },
        });

        should.exist(obj.a);
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).to.eql(undefined);
        assert.typeOf(Object.getOwnPropertyDescriptor(obj, 'a').get, 'function');

        expect(Object.isSealed(obj)).to.eql(true);
        expect(function () {
            obj.a = 9999;
        }).to.throw();
        expect(function () {
            Object.defineProperty(obj, {
                x: {
                    get: () => 9999,
                },
            });
        }).to.throw();
    });

    it ('throws a type error when passed something else than the expected parameters', () => {
        expect(function() {
            defineSealed(false);
        }).to.throw(TypeError);

        expect(function() {
            defineSealed({}, false);
        }).to.throw(TypeError);
    });
});

describe("Object - isNotEmptyObject", () => {
    it ('not see a string as a not empty object', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isNotEmptyObject(el)).to.eql(false);
    });

    it ('not see a numeric value as a not empty object', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isNotEmptyObject(el)).to.eql(false);
    });

    it ('not see a boolean as a not empty object', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isNotEmptyObject(el)).to.eql(false);
    });

    it ('not see a regex as a not empty object', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isNotEmptyObject(el)).to.eql(false);
    });

    it ('see an object as an object', () => {
        expect(isNotEmptyObject({bar:'foo'})).to.eql(true);

        expect(isNotEmptyObject(Object.defineProperties(Object.create(null), {
            'hi': {
                enumerable: true,
                get: () => 'there',
            }
        }))).to.eql(true);
    });

    it ('see an empty object as an empty object', () => {
        expect(isNotEmptyObject(Object.create(null))).to.eql(false);
        expect(isNotEmptyObject(new Object())).to.eql(false);
        expect(isNotEmptyObject(Object.create([]))).to.eql(false);
        expect(isNotEmptyObject(Object.defineProperties(Object.create(null), {
            'hi': {
                enumerable: false,
                get: () => 'there',
            }
        }))).to.eql(false);
    });

    it ('not see a nullable as a not empty object', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isNotEmptyObject(el)).to.eql(false);
    });

    it ('not see a date as a not empty object', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isNotEmptyObject(el)).to.eql(false);
    });

    it ('not see an array as a not empty object', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isNotEmptyObject(el)).to.eql(false);
    });

    it ('not see a function as a not empty object', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isNotEmptyObject(el)).to.eql(false);
    });
});
