'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import mapKey           from '../../../lib/array/mapKey';

describe('Array - mapKey', () => {
    it('Returns an empty object when passing nothing', () => {
        //  @ts-ignore
        assert.deepEqual(mapKey(), {});
    });

    it('Return an empty object if passed a non-array or empty array as value', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            assert.deepEqual(mapKey(el, 'uid'), {});
        }
    });

    it('Return an empty object if passed a non-string or empty string as key', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            assert.deepEqual(mapKey([{foo: 'bar'}], el), {});
        }
    });

    it('Should correctly map an array of objects by key', () => {
        assert.deepEqual(
            mapKey([
                {uid: 12, name: 'Peter'},
                {uid: 15, name: 'Jonas'},
                {uid: 87, name: 'Josh'},
            ], 'uid'),
            {
                12: {uid: 12, name: 'Peter'},
                15: {uid: 15, name: 'Jonas'},
                87: {uid: 87, name: 'Josh'},
            }
        );
    });

    it('Should correctly map an array of objects by key when passing a non-object config', () => {
        assert.deepEqual(
            mapKey([
                {uid: 12, name: 'Peter'},
                {uid: 15, name: 'Jonas'},
                {uid: 87, name: 'Josh'},
                //  @ts-ignore
            ], 'uid', 'foo'),
            {
                12: {uid: 12, name: 'Peter'},
                15: {uid: 15, name: 'Jonas'},
                87: {uid: 87, name: 'Josh'},
            }
        );
    });

    it('Should correctly remove non-objects from the array when mapping an array of objects by key', () => {
        assert.deepEqual(
            mapKey([
                //  @ts-ignore
                0,
                {uid: 12, name: 'Peter'},
                //  @ts-ignore
                false,
                //  @ts-ignore
                'foobar',
                {uid: 15, name: 'Jonas'},
                [{hi: 'there'}],
                null,
                undefined,
                new Date(),
                {uid: 87, name: 'Josh'},
            ], 'uid'),
            {
                12: {uid: 12, name: 'Peter'},
                15: {uid: 15, name: 'Jonas'},
                87: {uid: 87, name: 'Josh'},
            }
        );
    });

    it('Should correctly remove objects without the provided key from the array when mapping an array of objects by key', () => {
        assert.deepEqual(
            mapKey([
                //  @ts-ignore
                0,
                {uid: 12, name: 'Peter'},
                //  @ts-ignore
                false,
                //  @ts-ignore
                'foobar',
                {uid: 15, name: 'Jonas'},
                [{hi: 'there'}],
                null,
                undefined,
                {name: 'Alana'},
                new Date(),
                {uid: 87, name: 'Josh'},
            ], 'uid'),
            {
                12: {uid: 12, name: 'Peter'},
                15: {uid: 15, name: 'Jonas'},
                87: {uid: 87, name: 'Josh'},
            }
        );
    });

    it('Should correctly take the last object for a key-match when passed an array where there are duplicates', () => {
        assert.deepEqual(
            mapKey([
                //  @ts-ignore
                0,
                {uid: 12, name: 'Peter'},
                //  @ts-ignore
                false,
                //  @ts-ignore
                'foobar',
                {uid: 15, name: 'Jonas'},
                [{hi: 'there'}],
                {uid: 15, name: 'Bob'},
                null,
                undefined,
                {name: 'Alana'},
                new Date(),
                {uid: 87, name: 'Josh'},
                {uid: 12, name: 'Farah'},
            ], 'uid'),
            {
                12: {uid: 12, name: 'Farah'},
                15: {uid: 15, name: 'Bob'},
                87: {uid: 87, name: 'Josh'},
            }
        );
    });

    it('Should default to merge false when passed empty opts', () => {
        assert.deepEqual(
            mapKey([
                //  @ts-ignore
                0,
                {uid: 12, name: 'Peter'},
                //  @ts-ignore
                false,
                //  @ts-ignore
                'foobar',
                {uid: 15, name: 'Jonas'},
                [{hi: 'there'}],
                {uid: 15, name: 'Bob'},
                null,
                undefined,
                {name: 'Alana'},
                new Date(),
                {uid: 87, name: 'Josh'},
                {uid: 12, name: 'Farah'},
            ], 'uid', {}),
            {
                12: {uid: 12, name: 'Farah'},
                15: {uid: 15, name: 'Bob'},
                87: {uid: 87, name: 'Josh'},
            }
        );
    });

    it('Should ensure objects are assigned on top of each other for key-match with array containing duplicates and merge true', () => {
        assert.deepEqual(
            mapKey([
                //  @ts-ignore
                0,
                {uid: 12, name: 'Peter'},
                //  @ts-ignore
                false,
                //  @ts-ignore
                'foobar',
                {uid: 15, name: 'Jonas', dob: '2022-02-07'},
                [{hi: 'there'}],
                {uid: 15, name: 'Bob'},
                null,
                undefined,
                {name: 'Alana'},
                new Date(),
                {uid: 87, name: 'Josh'},
                {uid: 12, name: 'Farah'},
            ], 'uid', {merge: true}),
            {
                12: {uid: 12, name: 'Farah'},
                15: {uid: 15, name: 'Bob', dob: '2022-02-07'},
                87: {uid: 87, name: 'Josh'},
            }
        );
    });
});
