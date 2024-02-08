'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import mapPrimitive     from '../../../lib/array/mapPrimitive';

describe('Array - mapPrimitive', () => {
    it('Returns an empty object when passing nothing', () => {
        //  @ts-ignore
        assert.deepEqual(mapPrimitive(), {});
    });

    it('Return an empty object if passed a non-array or empty array as value', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            //  @ts-ignore
            assert.deepEqual(mapPrimitive(el, 'uid'), {});
        }
    });

    it('Should correctly map a numeric primitive array', () => {
        assert.deepEqual(
            mapPrimitive([1, 4, 5, 8, 4023]),
            {
                1: 1,
                4: 4,
                5: 5,
                8: 8,
                4023: 4023,
            }
        );
    });

    it('Should correctly map a numeric primitive array, when passing a non-object options', () => {
        for (const el of CONSTANTS.NOT_OBJECT_WITH_EMPTY) {
            assert.deepEqual(
                mapPrimitive([1, 4, 5, 8, 4023], el),
                {
                    1: 1,
                    4: 4,
                    5: 5,
                    8: 8,
                    4023: 4023,
                }
            );
        }
    });

    it('Should correctly map a numeric primitive array and not autoround by default', () => {
        assert.deepEqual(
            mapPrimitive([1, 4, 5, 5.4, 8, 4023]),
            {
                1: 1,
                4: 4,
                5: 5,
                5.4: 5.4,
                8: 8,
                4023: 4023,
            }
        );
    });

    it('Should correctly map a numeric primitive array and autoround if asked', () => {
        assert.deepEqual(
            mapPrimitive([1, 4, 4.1, 5, 5.4, 8, 8.6, 4023], {keyround: true}),
            {
                1: 1,
                4: 4.1,
                5: 5.4,
                8: 8,
                9: 8.6,
                4023: 4023,
            }
        );
    });

    it('Should correctly map a numeric primitive array and valround if asked', () => {
        assert.deepEqual(
            mapPrimitive([1, 4, 4.1, 5, 5.4, 8, 8.6, 4023], {valround: true}),
            {
                1: 1,
                4: 4,
                4.1: 4,
                5: 5,
                5.4: 5,
                8: 8,
                8.6: 9,
                4023: 4023,
            }
        );
    });

    it('Should correctly map a numeric primitive array and valround and keyround if asked', () => {
        assert.deepEqual(
            mapPrimitive([1, 4, 4.1, 5, 5.4, 8, 8.6, 4023], {valround: true, keyround: true}),
            {
                1: 1,
                4: 4,
                5: 5,
                8: 8,
                9: 9,
                4023: 4023,
            }
        );
    });

    it('Should correctly map a string primitive array', () => {
        assert.deepEqual(
            mapPrimitive(['hello', 'foo', 'bar']),
            {
                hello: 'hello',
                foo: 'foo',
                bar: 'bar',
            }
        );
    });

    it('Should automatically trim strings for key storage when mapping a string primitive array', () => {
        assert.deepEqual(
            mapPrimitive(['  hello   ', ' foo', 'bar']),
            {
                hello: '  hello   ',
                foo: ' foo',
                bar: 'bar',
            }
        );
    });

    it('Should automatically trim strings for key storage and dedupe when mapping a string primitive array', () => {
        assert.deepEqual(
            mapPrimitive(['  hello   ', 'hello  ', ' foo', 'bar']),
            {
                foo: ' foo',
                bar: 'bar',
                hello: 'hello  ',
            }
        );
    });

    it('Should allow turning on value trimming and dedupe when mapping a string primitive array', () => {
        assert.deepEqual(
            mapPrimitive(['  hello   ', 'hello  ', ' foo', 'bar'], {valtrim: true}),
            {
                hello: 'hello',
                foo: 'foo',
                bar: 'bar',
            }
        );
    });
});
