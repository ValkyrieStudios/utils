/* eslint-disable id-denylist */

import {describe, it, beforeEach}   from 'node:test';
import * as assert                  from 'node:assert/strict';
import CONSTANTS                    from '../../constants';
import deepGet                      from '../../../lib/deep/get';

describe('Deep - get', () => {
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
                {age: 25}, // Missing 'name'
                {name: 'Bob'}, // Missing 'age'
            ],
        };
    });

    it('Correctly retrieves a value on an existing key', () => {
        assert.equal(deepGet(subject, 'a'), 1);
        assert.equal(deepGet(subject, 'd[0]'), 0);
        assert.equal(deepGet(subject, 'd.0'), 0);
        assert.equal(deepGet(subject, 'd.5'), undefined);
        assert.equal(deepGet(subject, 'd[4].e'), 'Hello');
        assert.equal(deepGet(subject, 'd.4.f[2]'), 'c');
        assert.equal(deepGet(subject, 'd.4.g'), '');
        assert.equal(deepGet(subject, 'h'), '');
        assert.equal(deepGet(subject, 'i'), false);
        assert.equal(deepGet(subject, 'j'), true);
        assert.equal(deepGet(subject, 'd.4.k'), false);
        assert.deepEqual(deepGet(subject, 'l'), []);
    });

    it('Correctly retrieves an array of values from nested objects', () => {
        assert.deepEqual(deepGet(subject, 'nestedArray.key'), ['value1', 'value2', 'value3']);
        assert.deepEqual(deepGet(subject, 'deepNestedArray.a.b.c'), ['found1', 'found2', 'found3']);
    });

    it('Correctly retrieves non-primitives from deeply nested arrays', () => {
        assert.deepEqual(deepGet(subject, 'deepNestedArray.a.b'), [
            {c: 'found1'},
            {c: 'found2'},
            {c: 'found3'},
        ]);
    });

    it('Handles cases where some elements in an array are missing a key', () => {
        assert.deepEqual(deepGet(subject, 'mixedArray.name'), ['Alice', 'Bob']);
        assert.deepEqual(deepGet(subject, 'mixedArray.age'), [30, 25]);
    });

    it('Returns undefined when trying to extract from an empty array', () => {
        assert.deepEqual(deepGet({emptyArray: []}, 'emptyArray.anyKey'), undefined);
    });

    it('Correctly returns the passed object if passed a single part key with get_parent true', () => {
        assert.equal(deepGet(subject, 'd', true), subject);
    });

    it('Correctly retrieves the parent of a value on an existing key', () => {
        assert.equal(deepGet(subject, 'd[0]', true), subject.d);
        assert.equal(deepGet(subject, 'd.4.f[2]', true), subject.d[4].f);
    });

    it('Correctly retrieves a value on a deeply nested multi-array structure setup', () => {
        const matrix = [
            [
                ['a', 'b', 'c'],
                ['d', 'e', 'f'],
                ['g', 'h', 'i'],
            ], [
                [0, 1],
                [2, 3],
                [4, 5],
                [6, 7],
            ],
        ];
        const object_matrix = {
            a: [
                [
                    {c: [{d: 'hello'}]},
                ],
            ],
        };
        assert.equal(deepGet(matrix, '0.0.0'), 'a');
        assert.equal(deepGet(matrix, '0.[0].2'), 'c');
        assert.equal(deepGet(matrix, '[0].[1].[1]'), 'e');
        assert.equal(deepGet(matrix, '1.2.1'), 5);
        assert.equal(deepGet(object_matrix, 'a[0][0].c[0].d'), 'hello');
    });

    it('Correctly returns undefined when diving into a key that doesnt exist', () => {
        assert.equal(deepGet(subject, 'a.x'), undefined);
        assert.equal(deepGet(subject, 'x'), undefined);
        assert.equal(deepGet(subject, 'l.1'), undefined);
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
                () => deepGet(el, '2'),
                new TypeError('deepGet: Requires object or array')
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
                /* @ts-ignore */
                () => deepGet({a: '2'}, el),
                new TypeError('deepGet: Invalid path provided')
            );
        }
    });

    it('Should throw when passed an empty string path', () => {
        const obj = {a: 'bi'};
        assert.throws(
            () => deepGet(obj, ''),
            new TypeError('deepGet: Invalid path provided')
        );
        assert.deepEqual(obj, {a: 'bi'});
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

        assert.deepEqual(deepGet(val, 'list.name'), ['User 1', 'User 2', 'User 3']);
        assert.deepEqual(deepGet(val, 'list.id'), ['123', '456', '789']);
        assert.equal(deepGet(val, 'list[0].id'), '123');
        assert.equal(deepGet(val, 'list[2].id'), '789');
        assert.equal(deepGet(val, 'list[0].foo'), undefined);
        assert.equal(deepGet(val, 'list[2].name'), 'User 3');
        assert.equal(deepGet(val, 'list[3].name'), undefined);
        assert.equal(deepGet(val, 'list[2].name.name'), undefined);
    });

    it('Handles deeply nested missing keys without throwing', () => {
        assert.equal(deepGet(subject, 'deepNestedArray.a.b.z'), undefined);
    });
});
