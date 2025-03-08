import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import mapFnAsMap       from '../../../lib/array/mapFnAsMap';

describe('Array - mapFnAsMap', () => {
    it('Returns an empty map when passing nothing', () => {
        /* @ts-ignore */
        assert.deepEqual(mapFnAsMap(), new Map());
    });

    it('Return an empty map if passed a non-array or empty array as value', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            assert.deepEqual(mapFnAsMap(el, val => val.uid), new Map());
        }
    });

    it('Return an empty map if passed a non-function as key', () => {
        for (const el of CONSTANTS.NOT_FUNCTION) {
            assert.deepEqual(mapFnAsMap([{foo: 'bar'}], el), new Map());
        }
    });

    it('Should correctly map an array of objects', () => {
        assert.deepEqual(
            mapFnAsMap([
                {uid: 12, name: 'Peter'},
                {uid: 15, name: 'Jonas'},
                {uid: 87, name: 'Josh'},
            ], el => el.uid),
            new Map([
                [12, {uid: 12, name: 'Peter'}],
                [15, {uid: 15, name: 'Jonas'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should correctly map an array of objects when passing a non-object options', () => {
        assert.deepEqual(
            mapFnAsMap([
                {uid: 12, name: 'Peter'},
                {uid: 15, name: 'Jonas'},
                {uid: 87, name: 'Josh'},
                /* @ts-ignore */
            ], el => el.uid, 'foo'),
            new Map([
                [12, {uid: 12, name: 'Peter'}],
                [15, {uid: 15, name: 'Jonas'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should correctly remove non-objects from the array when mapping an array of objects', () => {
        assert.deepEqual(
            mapFnAsMap([
                /* @ts-ignore */
                0,
                {uid: 12, name: 'Peter'},
                /* @ts-ignore */
                false,
                /* @ts-ignore */
                'foobar',
                {uid: 15, name: 'Jonas'},
                [{hi: 'there'}],
                null,
                undefined,
                new Date(),
                {uid: 87, name: 'Josh'},
            ], el => el.uid),
            new Map([
                [12, {uid: 12, name: 'Peter'}],
                [15, {uid: 15, name: 'Jonas'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should correctly remove objects without the provided key from the array when mapping an array of objects', () => {
        assert.deepEqual(
            mapFnAsMap([
                /* @ts-ignore */
                0,
                {uid: 12, name: 'Peter'},
                /* @ts-ignore */
                false,
                /* @ts-ignore */
                'foobar',
                {uid: 15, name: 'Jonas'},
                [{hi: 'there'}],
                null,
                undefined,
                {name: 'Alana'},
                new Date(),
                {uid: 87, name: 'Josh'},
            ], el => el.uid),
            new Map([
                [12, {uid: 12, name: 'Peter'}],
                [15, {uid: 15, name: 'Jonas'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should correctly take the last object for a key-match when passed an array where there are duplicates', () => {
        assert.deepEqual(
            mapFnAsMap([
                /* @ts-ignore */
                0,
                {uid: 12, name: 'Peter'},
                /* @ts-ignore */
                false,
                /* @ts-ignore */
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
            ], el => el.uid),
            new Map([
                [12, {uid: 12, name: 'Farah'}],
                [15, {uid: 15, name: 'Bob'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should default to merge false when passed empty opts', () => {
        assert.deepEqual(
            mapFnAsMap([
                /* @ts-ignore */
                0,
                {uid: 12, name: 'Peter'},
                /* @ts-ignore */
                false,
                /* @ts-ignore */
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
            ], el => el.uid, {}),
            new Map([
                [12, {uid: 12, name: 'Farah'}],
                [15, {uid: 15, name: 'Bob'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should ensure objects are assigned on top of each other for key-match with array containing duplicates and merge true', () => {
        assert.deepEqual(
            mapFnAsMap([
                /* @ts-ignore */
                0,
                {uid: 12, name: 'Peter'},
                /* @ts-ignore */
                false,
                /* @ts-ignore */
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
            ], el => el.uid, {merge: true}),
            new Map([
                [12, {uid: 12, name: 'Farah'}],
                [15, {uid: 15, name: 'Bob', dob: '2022-02-07'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should not do anything when passed a function that returns nothing', () => {
        assert.deepEqual(
            mapFnAsMap([
                /* @ts-ignore */
                0,
                {uid: 12, name: 'Peter'},
                /* @ts-ignore */
                false,
                /* @ts-ignore */
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
            ], () => {}, {merge: true}),
            new Map()
        );
    });

    it('Should not do anything when passed a function that returns an empty string', () => {
        assert.deepEqual(
            mapFnAsMap([
                /* @ts-ignore */
                0,
                {uid: 12, name: 'Peter'},
                /* @ts-ignore */
                false,
                /* @ts-ignore */
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
            ], () => '', {merge: true}),
            new Map()
        );
    });
});
