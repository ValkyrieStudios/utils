'use strict';

/* eslint-disable id-denylist */

import {describe, it, beforeEach}   from 'node:test';
import assert                       from 'node:assert/strict';
import CONSTANTS                    from '../../constants.js';
import deepSet                      from '../../../src/deep/set.js';

describe('Deep - set', () => {
    let subject;
    beforeEach(() => {
        subject = {
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
    });

    it('Correctly sets a value on an existing key', () => {
        deepSet(subject, 'c', 4);
        deepSet(subject, 'd.0', 100);
        deepSet(subject, 'd.4.e', 'world');
        deepSet(subject, 'd.4.f.0', 'Y');

        assert.equal(subject.c, 4);
        assert.equal(subject.d[0], 100);
        assert.equal(subject.d[4].e, 'world');
        assert.equal(subject.d[4].f[0], 'Y');
    });

    it('Correctly set a value on an inexisting key', () => {
        deepSet(subject, 'f', 42);
        deepSet(subject, 'e.a.b.c.d.e.f.g.h', 'valkyrie rules');
        deepSet(subject, 'e.b', [0, 1, 2]);
        deepSet(subject, 'q.0', 'valkyrie is cool');
        deepSet(subject, 'q.1', 'valkyrie is fun');

        assert.equal(subject.f, 42);
        assert.equal(subject.e.a.b.c.d.e.f.g.h, 'valkyrie rules');
        assert.deepEqual(subject.e.b, [0, 1, 2]);
        assert.deepEqual(subject.q, {0: 'valkyrie is cool', 1: 'valkyrie is fun'});
    });

    it('Correctly defines a value on an existing key', () => {
        deepSet(subject, 'a', {get: () => 5}, true);

        assert.equal(subject.a, 5);
        assert.equal(Object.getOwnPropertyDescriptor(subject, 'a').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(subject, 'a').get, 'function');
    });

    it('Correctly defines a value on an inexisting key', () => {
        deepSet(subject, 'g', {get: () => 5}, true);

        assert.equal(subject.g, 5);
        assert.equal(Object.getOwnPropertyDescriptor(subject, 'g').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(subject, 'g').get, 'function');
    });

    it('Should allow building up a complex object and prevent override glitches', () => {
        const obj = {};
        deepSet(obj, 'a.b.c', 10);
        deepSet(obj, 'a.d', 'hello');
        deepSet(obj, 'a.d.2', 'foo');
        assert.deepEqual(obj, {
            a: {
                b: {
                    c: 10,
                },
                d: 'hello',
            },
        });
    });

    it('Should allow building up a complex object', () => {
        const obj = {};
        deepSet(obj, 'a.b.c', 10);
        deepSet(obj, 'a.d.2', 'foo');
        deepSet(obj, 'a.d.3', 'hello');
        assert.deepEqual(obj, {
            a: {
                b: {
                    c: 10,
                },
                d: {
                    2: 'foo',
                    3: 'hello',
                },
            },
        });
    });

    it('Should allow building up a complex object inside of an array', () => {
        const obj = {a: []};
        deepSet(obj, 'a.0.name', 'Peter');
        deepSet(obj, 'a.0.role', 'Admin');
        deepSet(obj, 'a.1.name', 'Jake');
        deepSet(obj, 'a.1.role', 'Owner');
        assert.deepEqual(obj, {
            a: [
                {name: 'Peter', role: 'Admin'},
                {name: 'Jake', role: 'Owner'},
            ],
        });
    });

    it('Should throw when not passed an object or array', () => {
        for (const el of [
            ...CONSTANTS.IS_NUMERIC,
            ...CONSTANTS.IS_INTEGER,
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_STRING,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_FUNCTION,
            ...CONSTANTS.IS_NULLABLE,
        ]) {
            assert.throws(
                () => deepSet(el, '2'),
                new TypeError('Deepset is only supported for objects')
            );
        }
    });

    it('Should throw when not passed a string/array key', () => {
        for (const el of [
            ...CONSTANTS.IS_NUMERIC,
            ...CONSTANTS.IS_ARRAY,
            ...CONSTANTS.IS_OBJECT,
            ...CONSTANTS.IS_INTEGER,
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_FUNCTION,
            ...CONSTANTS.IS_NULLABLE,
        ]) {
            assert.throws(
                () => deepSet({a: '2'}, el),
                new TypeError('No path was given')
            );
        }
    });

    it('Should throw when passed an empty string path', () => {
        const obj = {a: 'bi'};
        assert.throws(
            () => deepSet(obj, ''),
            new TypeError('No path was given')
        );
        assert.deepEqual(obj, {a: 'bi'});
    });
});
