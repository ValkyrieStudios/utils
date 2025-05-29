import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import dedupe from '../../../lib/array/dedupe';

describe('Array - dedupe', () => {
    it('Returns empty array when passing nothing', () => {
        // @ts-ignore
        expect(dedupe()).toEqual([]);
    });

    it('Return an empty array when passed a non-array or empty array', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            expect(dedupe(el)).toEqual([]);
        }
    });

    it('Correctly remove duplicate bool flags from an array', () => {
        expect(dedupe([true, false, false, false, true])).toEqual([true, false]);
    });

    it('Correctly remove duplicate numeric values from an array', () => {
        expect(dedupe([0, 1, 1, 2, 99, 100, 99, 2, 3, 3, 4])).toEqual([0, 1, 2, 99, 100, 3, 4]);
    });

    it('Correctly remove duplicate strings from an array', () => {
        expect(dedupe(['foo', 'bar', 'foo', 'foo', 'bar', 'test', 'test'])).toEqual(['foo', 'bar', 'test']);
    });

    it('Correctly remove duplicate regexes from an array', () => {
        expect(dedupe([/\s{2,}/g, /\s{2,}/g, /\s{3,}/g, new RegExp('\\s{2,}', 'g')])).toEqual([/\s{2,}/g, /\s{3,}/g]);
    });

    it('Correctly remove duplicate dates from an array', () => {
        expect(dedupe([new Date('2022-02-01T04:20:00.000Z'), new Date('2022-02-01T04:20:00.000Z'), new Date('2022-02-01T04:21:00.000Z')]))
            .toEqual([new Date('2022-02-01T04:20:00.000Z'), new Date('2022-02-01T04:21:00.000Z')]);
    });

    it('Should not care about formdata', () => {
        expect(dedupe([new FormData(), new FormData()])).toEqual([new FormData()]);
    });

    it('Correctly remove duplicates in a mixed primitive array', () => {
        expect(dedupe(['foo', null, 1, 2, NaN, 'bar', undefined, 'bar', true, true, false, NaN, 1, 2, false, null, undefined]))
            .toEqual(['foo', null, 1, 2, NaN, 'bar', undefined, true, false]);
    });

    it('Correctly remove duplicate arrays from an array', () => {
        const test_a = [0, 1, 2, 3, 'hello', 'world', 4, 5];
        const test_b = [0, 1, ['foo', 'bar'], 2, 3, [['a'], ['b']]];

        expect(dedupe([test_a, test_b, test_b, test_a])).toEqual([test_a, test_b]);
        expect(dedupe([[0], [0], [0, 1], [1, 0]])).toEqual([[0], [0, 1], [1, 0]]);
    });

    it('Correctly remove duplicate objects from an array', () => {
        const test_a = {foo: 'bar'};
        const test_b = {
            foo: 1,
            bar: {car: 2},
            dar: {
                ear: ['hello', 'world'],
                far: {gar: 1},
                har: 'Hello world',
                iar: true,
            },
        };

        expect(dedupe([test_a, test_b, test_a, test_b])).toEqual([test_a, test_b]);
        expect(dedupe([{b: 2}, {b: 2}, {b: 2}])).toEqual([{b: 2}]);
    });

    it('Correctly dedupe an array with a filter function', () => {
        expect(dedupe([0, 1, 1, 2, 99, 100, 99, 2, 3, 3, 4, 'foo', 'bar'], {filter_fn: el => typeof el === 'number'}))
            .toEqual([0, 1, 2, 99, 100, 3, 4]);
    });

    it('Correctly dedupe an array of objects with a filter function', () => {
        const test_a = {foo: 'bar'};
        const test_b = {foo: 1, bar: {car: 2}};
        const test_c = {foo: 2, bar: {car: 2}};

        expect(dedupe([test_a, test_b, test_a, test_b, test_c], {filter_fn: el => el.foo !== 'bar'}))
            .toEqual([test_b, test_c]);
    });

    it('Correctly remove duplicate arrays with a filter function', () => {
        const test_a = [0, 1, 2, 3, 'hello', 'world', 4, 5];
        const test_b = [0, 1, ['foo', 'bar'], 2, 3, [['a'], ['b']]];

        expect(dedupe([test_a, test_b, test_b, test_a], {filter_fn: el => Array.isArray(el)}))
            .toEqual([test_a, test_b]);

        expect(dedupe([[0], [0], [0, 1], [1, 0]], {filter_fn: el => el.length > 1}))
            .toEqual([[0, 1], [1, 0]]);
    });

    it('Correctly remove duplicate objects with a complex filter function', () => {
        const test_a = {foo: 'bar', age: 20};
        const test_b = {foo: 'baz', age: 30};
        const test_c = {foo: 'bar', age: 25};

        expect(dedupe([test_a, test_b, test_c, test_a], {filter_fn: el => el.age > 20}))
            .toEqual([test_b, test_c]);
    });
});
