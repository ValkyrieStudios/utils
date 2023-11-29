'use strict';

/* eslint-disable id-denylist */

import {describe, it, beforeEach}   from 'node:test';
import assert                       from 'node:assert/strict';
import CONSTANTS                    from '../../constants.mjs';
import deepGet                      from '../../../src/deep/get.mjs';

describe.only('Deep - get', () => {
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
            h : '',
            i : false,
            j : true,
            l : [],
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
                    {c: [
                        {d: 'hello'},
                    ]},
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
                new TypeError('Deepget is only supported for objects')
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
                () => deepGet({a: '2'}, el),
                new TypeError('No path was given')
            );
        }
    });

    it('Should throw when passed an empty string path', () => {
        const obj = {a: 'bi'};
        assert.throws(
            () => deepGet(obj, ''),
            new TypeError('No path was given')
        );
        assert.deepEqual(obj, {a: 'bi'});
    });
});
