import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import split from '../../../lib/array/split';
import isInteger from '../../../lib/number/isInteger';

describe('Array - split', () => {
    it('Throws an error when passing nothing', () => {
        // @ts-expect-error
        expect(() => split()).toThrowError(/split requires a positive integer size/);
    });

    it('Throws an error when passed a non-array', () => {
        for (const el of CONSTANTS.NOT_ARRAY) {
            expect(() => split(el, 2)).toThrowError(/split requires an array or set/);
        }
    });

    it('Throws an error when passed a non-integer size', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            expect(() => split([1, 2, 3], el)).toThrowError(/split requires a positive integer size/);
        }
    });

    describe('array', () => {
        it('Splits correctly when passed an array and a size', () => {
            const out = split([1, 2, 3, 4, 5, 6, 7, 8, 9], 2);
            expect(out).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
        });

        it('Splits correctly when passed an array, a size, and a filter function', () => {
            const out = split([1, 2, false, 4, 5, 6, 7, 8, 9], 2, {filter_fn: el => isInteger(el)});
            expect(out).toEqual([[1, 2], [4, 5], [6, 7], [8, 9]]);
        });

        it('Returns an empty array when filter function filters out all elements', () => {
            const out = split([1, 2, 3, 4, 5], 2, {filter_fn: el => typeof el === 'string'});
            expect(out).toEqual([]);
        });

        it('Splits correctly when array size is not a multiple of the chunk size', () => {
            const out = split([1, 2, 3, 4, 5, 6, 7], 3);
            expect(out).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
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
            expect(out).toEqual([
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
                {filter_fn: el => typeof el.test === 'string'}
            );
            expect(out).toEqual([
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
            expect(out).toEqual([[1, 2], [3, 4], [5]]);
        });
    });

    describe('set', () => {
        it('Splits correctly when passed a set and a size', () => {
            const out = split(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]), 2);
            expect(out).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
        });

        it('Splits correctly when passed a set, a size, and a filter function', () => {
            const out = split(new Set([1, 2, false, 4, 5, 6, 7, 8, 9]), 2, {filter_fn: el => isInteger(el)});
            expect(out).toEqual([[1, 2], [4, 5], [6, 7], [8, 9]]);
        });

        it('Returns an empty array when filter function filters out all elements', () => {
            const out = split(new Set([1, 2, 3, 4, 5]), 2, {filter_fn: el => typeof el === 'string'});
            expect(out).toEqual([]);
        });

        it('Splits correctly when set size is not a multiple of the chunk size', () => {
            const out = split(new Set([1, 2, 3, 4, 5, 6, 7]), 3);
            expect(out).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
        });

        it('Splits correctly when passed a set of objects and a size', () => {
            const out = split(
                new Set([
                    {test: 'Peter'},
                    {test: 'Jack'},
                    {test: 'Pony'},
                    {test: 'John'},
                    {test: 'Joe'},
                    {test: 'Bob'},
                    {test: 'Alice'},
                ]),
                2
            );
            expect(out).toEqual([
                [{test: 'Peter'}, {test: 'Jack'}],
                [{test: 'Pony'}, {test: 'John'}],
                [{test: 'Joe'}, {test: 'Bob'}],
                [{test: 'Alice'}],
            ]);
        });

        it('Splits correctly when passed a set of objects, a size, and a filter function', () => {
            const out = split(
                new Set([
                    {test: 'Peter'},
                    {test: 'Jack'},
                    {test: 'Pony'},
                    {test: 'John'},
                    {test: false},
                    {test: 'Joe'},
                    {test: 'Bob'},
                    {test: 'Alice'},
                ]),
                2,
                {filter_fn: el => typeof el.test === 'string'}
            );
            expect(out).toEqual([
                [{test: 'Peter'}, {test: 'Jack'}],
                [{test: 'Pony'}, {test: 'John'}],
                [{test: 'Joe'}, {test: 'Bob'}],
                [{test: 'Alice'}],
            ]);
        });

        it('Handles a mix of truthy and falsy values with a filter function', () => {
            const out = split(
                new Set([1, null, 2, undefined, 3, false, 4, 5]),
                2,
                {filter_fn: el => Boolean(el)}
            );
            expect(out).toEqual([[1, 2], [3, 4], [5]]);
        });
    });
});
