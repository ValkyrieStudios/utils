/* eslint-disable id-denylist */

import {describe, it, beforeEach, expect} from 'vitest';
import CONSTANTS from '../../constants';
import deepSet from '../../../lib/deep/set';

describe('Deep - set', () => {
    let subject: any;
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

        expect(subject.c).toBe(4);
        expect(subject.d[0]).toBe(100);
        expect(subject.d[4].e).toBe('world');
        expect(subject.d[4].f[0]).toBe('Y');
    });

    it('Correctly sets a value on a nonexistent key', () => {
        deepSet(subject, 'f', 42);
        deepSet(subject, 'e.a.b.c.d.e.f.g.h', 'valkyrie rules');
        deepSet(subject, 'e.b', [0, 1, 2]);
        deepSet(subject, 'q.0', 'valkyrie is cool');
        deepSet(subject, 'q.1', 'valkyrie is fun');

        expect(subject.f).toBe(42);
        expect(subject.e.a.b.c.d.e.f.g.h).toBe('valkyrie rules');
        expect(subject.e.b).toEqual([0, 1, 2]);
        expect(subject.q).toEqual({0: 'valkyrie is cool', 1: 'valkyrie is fun'});
    });

    it('Correctly defines a value on an existing key', () => {
        deepSet(subject, 'a', {get: () => 5}, true);

        expect(subject.a).toBe(5);
        expect(Object.getOwnPropertyDescriptor(subject, 'a')?.set).toBeUndefined();
        expect(typeof Object.getOwnPropertyDescriptor(subject, 'a')?.get).toBe('function');
    });

    it('Correctly defines a value on a nonexistent key', () => {
        deepSet(subject, 'g', {get: () => 5}, true);

        expect(subject.g).toBe(5);
        expect(Object.getOwnPropertyDescriptor(subject, 'g')?.set).toBeUndefined();
        expect(typeof Object.getOwnPropertyDescriptor(subject, 'g')?.get).toBe('function');
    });

    it('Builds up a complex object and prevents override glitches', () => {
        const obj: any = {};
        deepSet(obj, 'a.b.c', 10);
        deepSet(obj, 'a.d', 'hello');
        deepSet(obj, 'a.d.2', 'foo');
        expect(obj).toEqual({
            a: {
                b: {c: 10},
                d: 'hello',
            },
        });
    });

    it('Builds up a complex object with nested keys', () => {
        const obj: any = {};
        deepSet(obj, 'a.b.c', 10);
        deepSet(obj, 'a.d.2', 'foo');
        deepSet(obj, 'a.d.3', 'hello');
        expect(obj).toEqual({
            a: {
                b: {c: 10},
                d: {
                    2: 'foo',
                    3: 'hello',
                },
            },
        });
    });

    it('Builds up a complex object inside an array', () => {
        const obj: any = {a: []};
        deepSet(obj, 'a.0.name', 'Peter');
        deepSet(obj, 'a.0.role', 'Admin');
        deepSet(obj, 'a.1.name', 'Jake');
        deepSet(obj, 'a.1.role', 'Owner');
        expect(obj).toEqual({
            a: [
                {name: 'Peter', role: 'Admin'},
                {name: 'Jake', role: 'Owner'},
            ],
        });
    });

    it('Sets a value on a deeply nested multi-array structure', () => {
        const matrix: any = [
            [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']],
            [[0, 1], [2, 3], [4, 5], [6, 7]],
        ];
        const object_matrix: any = {a: [[{c: [{d: 'hello'}]}]]};
        deepSet(matrix, '0.0.3', 'foo');
        deepSet(matrix, '0.1.1', 'bar');
        deepSet(matrix, '0.2.2', 'cool');
        deepSet(matrix, '1.1.5', 999);
        deepSet(object_matrix, 'a[0][0].c[0].e', 'world');

        expect(matrix).toEqual([
            [['a', 'b', 'c', 'foo'], ['d', 'bar', 'f'], ['g', 'h', 'cool']],
            [[0, 1], [2, 3, undefined, undefined, undefined, 999], [4, 5], [6, 7]],
        ]);
        expect(object_matrix).toEqual({
            a: [[{c: [{d: 'hello', e: 'world'}]}]],
        });
    });

    it('Throws when not passed an object or array', () => {
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
            expect(() => deepSet(el, '2', 5)).toThrow(new TypeError('Deepset is only supported for objects'));
        }
    });

    it('Throws when not passed a string/array key', () => {
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
            expect(() => deepSet({a: '2'}, el, 5)).toThrow(new TypeError('No path was given'));
        }
    });

    it('Throws when passed an empty string path', () => {
        const obj = {a: 'bi'};
        expect(() => deepSet(obj, '', 1)).toThrow(new TypeError('No path was given'));
        expect(obj).toEqual({a: 'bi'});
    });

    it('Throws when passed an invalid array string path', () => {
        const obj = {a: 'bi', c: [0, 1, 2, [1, 2, 3]]};
        expect(() => deepSet(obj, 'c[a][0]', 1)).toThrow(new TypeError('Invalid path provided'));
        expect(obj).toEqual({a: 'bi', c: [0, 1, 2, [1, 2, 3]]});
    });

    it('Throws when passed an invalid array string path at the end', () => {
        const obj = {a: 'bi', c: [0, 1, 2]};
        expect(() => deepSet(obj, 'c[a]', 1)).toThrow(new TypeError('Invalid path provided'));
        expect(obj).toEqual({a: 'bi', c: [0, 1, 2]});
    });

    describe('malicious: __proto__', () => {
        it('Throws when passed as single value', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, '__proto__', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });

        it('Throws when passed at start', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, '__proto__.hacked', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });

        it('Throws when passed as part of', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, 'hacked.__proto__.yup', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });

        it('Throws when passed at end', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, 'hacked.__proto__', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });
    });

    describe('malicious: prototype', () => {
        it('Throws when passed as single value', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, 'prototype', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });

        it('Throws when passed at start', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, 'prototype.hacked', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });

        it('Throws when passed as part of', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, 'hacked.prototype.yup', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });

        it('Throws when passed at end', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, 'hacked.prototype', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });
    });

    describe('malicious: constructor', () => {
        it('Throws when passed as single value', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, 'constructor', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });

        it('Throws when passed at start', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, 'constructor.hacked', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });

        it('Throws when passed as part of', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, 'hacked.constructor.yup', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });

        it('Throws when passed at end', () => {
            const obj = {a: 'bi'};
            expect(() => deepSet(obj, 'hacked.constructor', 1)).toThrow(new TypeError('Malicious path provided'));
            expect(obj).toEqual({a: 'bi'});
        });
    });
});
