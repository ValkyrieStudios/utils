'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import dedupe           from '../../../src/array/dedupe.mjs';

describe('Array - dedupe', () => {
    it('Returns empty array when passing nothing', () => {
        assert.deepEqual(dedupe(), []);
    });

    it('Return an empty array when passed a non-array or empty array', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            assert.deepEqual(dedupe(el), []);
        }
    });

    it('Correctly remove duplicate bool flags from an array', () => {
        assert.deepEqual(
            dedupe([true, false, false, false, true]),
            [true, false]
        );
    });

    it('Correctly remove duplicate numeric values from an array', () => {
        assert.deepEqual(
            dedupe([0, 1, 1, 2, 99, 100, 99, 2, 3, 3, 4]),
            [0, 1, 2, 99, 100, 3, 4]
        );
    });

    it('Correctly remove duplicate strings from an array', () => {
        assert.deepEqual(
            dedupe(['foo', 'bar', 'foo', 'foo', 'bar', 'test', 'test']),
            ['foo', 'bar', 'test']
        );
    });

    it('Correctly remove duplicates in a mixed primitive array', () => {
        assert.deepEqual(
            dedupe(['foo', null, 1, 2, NaN, 'bar', undefined, 'bar', true, true, false, NaN, 1, 2, false, null, undefined]),
            ['foo', null, 1, 2, NaN, 'bar', undefined, true, false]
        );
    });

    it('Correctly remove duplicate arrays from an array', () => {
        const test_a = [0, 1, 2, 3, 'hello', 'world', 4, 5];
        const test_b = [0, 1, ['foo', 'bar'], 2, 3, [['a'], ['b']]];

        assert.deepEqual(
            dedupe([test_a, test_b, test_b, test_a]),
            [test_a, test_b]
        );
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

        assert.deepEqual(
            dedupe([test_a, test_b, test_a, test_b]),
            [test_a, test_b]
        );
    });
});
