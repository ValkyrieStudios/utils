/* eslint-disable id-denylist */

import {describe, it, beforeEach, expect} from 'vitest';
import CONSTANTS from '../../constants';
import deepGet from '../../../lib/deep/get';

describe('Deep - get', () => {
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
                    g: '',
                    k: false,
                },
            ],
            h: '',
            i: false,
            j: true,
            l: [],
            nestedArray: [
                {key: 'value1', other: 10},
                {key: 'value2', other: 20},
                {key: 'value3', other: 30},
            ],
            deepNestedArray: [
                {a: {b: {c: 'found1'}}},
                {a: {b: {c: 'found2'}}},
                {a: {b: {c: 'found3'}}},
            ],
            mixedArray: [
                {name: 'Alice', age: 30},
                {age: 25},
                {name: 'Bob'},
            ],
        };
    });

    it('Correctly retrieves a value on an existing key', () => {
        expect(deepGet(subject, 'a')).toBe(1);
        expect(deepGet(subject, 'd[0]')).toBe(0);
        expect(deepGet(subject, 'd.0')).toBe(0);
        expect(deepGet(subject, 'd.5')).toBeUndefined();
        expect(deepGet(subject, 'd[4].e')).toBe('Hello');
        expect(deepGet(subject, 'd.4.f[2]')).toBe('c');
        expect(deepGet(subject, 'd.4.g')).toBe('');
        expect(deepGet(subject, 'h')).toBe('');
        expect(deepGet(subject, 'i')).toBe(false);
        expect(deepGet(subject, 'j')).toBe(true);
        expect(deepGet(subject, 'd.4.k')).toBe(false);
        expect(deepGet(subject, 'l')).toEqual([]);
    });

    it('Correctly retrieves an array of values from nested objects', () => {
        expect(deepGet(subject, 'nestedArray.key')).toEqual(['value1', 'value2', 'value3']);
        expect(deepGet(subject, 'deepNestedArray.a.b.c')).toEqual(['found1', 'found2', 'found3']);
    });

    it('Correctly retrieves non-primitives from deeply nested arrays', () => {
        expect(deepGet(subject, 'deepNestedArray.a.b')).toEqual([
            {c: 'found1'},
            {c: 'found2'},
            {c: 'found3'},
        ]);
    });

    it('Handles cases where some elements in an array are missing a key', () => {
        expect(deepGet(subject, 'mixedArray.name')).toEqual(['Alice', 'Bob']);
        expect(deepGet(subject, 'mixedArray.age')).toEqual([30, 25]);
    });

    it('Returns undefined when trying to extract from an empty array', () => {
        expect(deepGet({emptyArray: []}, 'emptyArray.anyKey')).toBeUndefined();
    });

    it('Correctly returns the passed object if passed a single part key with get_parent true', () => {
        expect(deepGet(subject, 'd', true)).toEqual(subject);
    });

    it('Correctly retrieves the parent of a value on an existing key', () => {
        expect(deepGet(subject, 'd[0]', true)).toEqual(subject.d);
        expect(deepGet(subject, 'd.4.f[2]', true)).toEqual(subject.d[4].f);
    });

    it('Correctly retrieves a value on a deeply nested multi-array structure setup', () => {
        const matrix = [
            [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']],
            [[0, 1], [2, 3], [4, 5], [6, 7]],
        ];
        const object_matrix = {
            a: [[{c: [{d: 'hello'}]}]],
        };
        expect(deepGet(matrix, '0.0.0')).toBe('a');
        expect(deepGet(matrix, '0.[0].2')).toBe('c');
        expect(deepGet(matrix, '[0].[1].[1]')).toBe('e');
        expect(deepGet(matrix, '1.2.1')).toBe(5);
        expect(deepGet(object_matrix, 'a[0][0].c[0].d')).toBe('hello');
    });

    it('Correctly returns undefined when diving into a key that doesnt exist', () => {
        expect(deepGet(subject, 'a.x')).toBeUndefined();
        expect(deepGet(subject, 'x')).toBeUndefined();
        expect(deepGet(subject, 'l.1')).toBeUndefined();
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
            expect(() => deepGet(el, '2')).toThrow(new TypeError('deepGet: Requires object or array'));
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
            // @ts-ignore
            expect(() => deepGet({a: '2'}, el)).toThrow(new TypeError('deepGet: Invalid path provided'));
        }
    });

    it('Should throw when passed an empty string path', () => {
        const obj = {a: 'bi'};
        expect(() => deepGet(obj, '')).toThrow(new TypeError('deepGet: Invalid path provided'));
        expect(obj).toEqual({a: 'bi'});
    });

    it('Should extract arrays of data based on keys', () => {
        const val = {
            hello: true,
            list: [
                {id: '123', name: 'User 1'},
                {id: '456', name: 'User 2'},
                {id: '789', name: 'User 3'},
            ],
        };

        expect(deepGet(val, 'list.name')).toEqual(['User 1', 'User 2', 'User 3']);
        expect(deepGet(val, 'list.id')).toEqual(['123', '456', '789']);
        expect(deepGet(val, 'list[0].id')).toBe('123');
        expect(deepGet(val, 'list[2].id')).toBe('789');
        expect(deepGet(val, 'list[0].foo')).toBeUndefined();
        expect(deepGet(val, 'list[2].name')).toBe('User 3');
        expect(deepGet(val, 'list[3].name')).toBeUndefined();
        expect(deepGet(val, 'list[2].name.name')).toBeUndefined();
    });

    it('Handles deeply nested missing array keys without throwing', () => {
        const deepStructure = {
            deepNestedArray: [
                {list: [{id: 123}, {id: 234}, {id: 345}]},
                {list: [{id: 456}, {id: 567}]},
                {list: [{id: 678}, {id: 789}]},
            ],
        };

        expect(deepGet(deepStructure, 'deepNestedArray.list.job')).toBeUndefined();
        expect(deepGet(deepStructure, 'deepNestedArray.list.id')).toEqual([123, 234, 345, 456, 567, 678, 789]);

        const mixedStructure = {
            deepNestedArray: [
                {list: [{users: [{id: 123}, {id: 234}]}, {users: [{id: 345}, {id: 456}]}]},
                {list: [{users: [{id: 567}, {id: 678}]}]},
                {list: [{users: [{id: 789}, {id: 890}]}]},
            ],
        };

        expect(deepGet(mixedStructure, 'deepNestedArray.list.users.id')).toEqual([123, 234, 345, 456, 567, 678, 789, 890]);
        expect(deepGet({
            deepNestedArray: [
                {list: [{users: [{id: 123}, {id: 234}]}, {users: [{id: 345}, {id: 456}]}]},
                {list: [{users: [{job: 'Engineer'}, {id: 678}]}]},
                {list: [{users: [{id: 789}, {id: 890}]}]},
            ],
        }, 'deepNestedArray.list.users.job')).toEqual(['Engineer']);

        expect(deepGet({
            deepNestedArray: [
                {list: [{users: [{id: 123}, {id: 234}]}, {users: [{id: 345}, {id: 456}]}]},
                {list: [{users: [{job: 'Engineer'}, {id: 678}]}]},
                {list: [{users: [{id: 789}, {id: 890}]}]},
            ],
        }, 'deepNestedArray.list.users')).toEqual([
            {id: 123}, {id: 234}, {id: 345}, {id: 456}, {job: 'Engineer'}, {id: 678}, {id: 789}, {id: 890},
        ]);

        expect(deepGet({
            deepNestedArray: [
                {list: [{users: [{id: 123}, {id: 234}]}, {users: [{id: 345}, {id: 456}]}]},
                {list: [{users: [{job: 'Engineer'}, {id: 678}]}]},
                {list: [{users: [{id: 789}, {id: 890}]}]},
            ],
        }, 'deepNestedArray.list.users.isActive')).toBeUndefined();
    });

    it('Handles deeply nested missing keys without throwing', () => {
        expect(deepGet(subject, 'deepNestedArray.a.b.z')).toBeUndefined();
    });
});
