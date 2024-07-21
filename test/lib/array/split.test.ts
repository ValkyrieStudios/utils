/* eslint-disable max-statements */

import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
import CONSTANTS from '../../constants';
import split from '../../../lib/array/split';
import isInteger from '../../../lib/number/isInteger';

describe('Array - split', () => {
    it('Throws an error when passing nothing', () => {
        assert.throws(
            /* @ts-expect-error */
            () => split(),
            new Error('split requires an array and positive integer size')
        );
    });

    it('Throws an error when passed a non-array', () => {
        for (const el of CONSTANTS.NOT_ARRAY) {
            assert.throws(
                () => split(el, 2),
                new Error('split requires an array and positive integer size')
            );
        }
    });

    it('Throws an error when passed a non-integer size', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            assert.throws(
                () => split([1, 2, 3], el),
                new Error('split requires an array and positive integer size')
            );
        }
    });

    it('Splits correctly when passed an array and a size', () => {
        const out = split([1, 2, 3, 4, 5, 6, 7, 8, 9], 2);
        assert.deepEqual(out, [[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
    });

    it('Splits correctly when passed an array, a size, and a filter function', () => {
        const out = split([1, 2, false, 4, 5, 6, 7, 8, 9], 2, {filter_fn: el => isInteger(el)});
        assert.deepEqual(out, [[1, 2], [4, 5], [6, 7], [8, 9]]);
    });

    it('Returns an empty array when filter function filters out all elements', () => {
        const out = split([1, 2, 3, 4, 5], 2, {filter_fn: el => typeof el === 'string'});
        assert.deepEqual(out, []);
    });

    it('Splits correctly when array size is not a multiple of the chunk size', () => {
        const out = split([1, 2, 3, 4, 5, 6, 7], 3);
        assert.deepEqual(out, [[1, 2, 3], [4, 5, 6], [7]]);
    });

    it('Splits correctly when passed an array of objects and a size', () => {
        const out = split(
            [
                {test: 'Peter'},
                {test: 'Jack'},
                {test: 'Pony'},
                {test: 'John'},
                {test: 'Joe'},
                {test: 'Bob'},
                {test: 'Alice'},
            ],
            2
        );
        assert.deepEqual(out, [
            [{test: 'Peter'}, {test: 'Jack'}],
            [{test: 'Pony'}, {test: 'John'}],
            [{test: 'Joe'}, {test: 'Bob'}],
            [{test: 'Alice'}],
        ]);
    });

    it('Splits correctly when passed an array of objects, a size, and a filter function', () => {
        const out = split(
            [
                {test: 'Peter'},
                {test: 'Jack'},
                {test: 'Pony'},
                {test: 'John'},
                {test: false},
                {test: 'Joe'},
                {test: 'Bob'},
                {test: 'Alice'},
            ],
            2,
            {filter_fn: el => el.test && typeof el.test === 'string'}
        );
        assert.deepEqual(out, [
            [{test: 'Peter'}, {test: 'Jack'}],
            [{test: 'Pony'}, {test: 'John'}],
            [{test: 'Joe'}, {test: 'Bob'}],
            [{test: 'Alice'}],
        ]);
    });

    it('Handles a mix of truthy and falsy values with a filter function', () => {
        const out = split(
            [1, null, 2, undefined, 3, false, 4, 5],
            2,
            {filter_fn: el => Boolean(el)}
        );
        assert.deepEqual(out, [[1, 2], [3, 4], [5]]);
    });
});

export {split, split as default};
