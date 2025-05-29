import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import mapFnAsMap from '../../../lib/array/mapFnAsMap';

describe('Array - mapFnAsMap', () => {
    it('Returns an empty map when passing nothing', () => {
        // @ts-ignore
        expect(mapFnAsMap()).toEqual(new Map());
    });

    it('Return an empty map if passed a non-array or empty array as value', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            expect(mapFnAsMap(el, val => val.uid)).toEqual(new Map());
        }
    });

    it('Return an empty map if passed a non-function as key', () => {
        for (const el of CONSTANTS.NOT_FUNCTION) {
            expect(mapFnAsMap([{foo: 'bar'}], el)).toEqual(new Map());
        }
    });

    it('Should correctly map an array of objects', () => {
        expect(
            mapFnAsMap(
                [
                    {uid: 12, name: 'Peter'},
                    {uid: 15, name: 'Jonas'},
                    {uid: 87, name: 'Josh'},
                ],
                el => el.uid
            )
        ).toEqual(
            new Map([
                [12, {uid: 12, name: 'Peter'}],
                [15, {uid: 15, name: 'Jonas'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should correctly map an array of objects when passing a non-object options', () => {
        // @ts-ignore
        expect(
            mapFnAsMap(
                [
                    {uid: 12, name: 'Peter'},
                    {uid: 15, name: 'Jonas'},
                    {uid: 87, name: 'Josh'},
                ],
                el => el.uid,
                // @ts-ignore
                'foo'
            )
        ).toEqual(
            new Map([
                [12, {uid: 12, name: 'Peter'}],
                [15, {uid: 15, name: 'Jonas'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should correctly remove non-objects from the array when mapping an array of objects', () => {
        expect(
            mapFnAsMap(
                [
                    // @ts-ignore
                    0,
                    {uid: 12, name: 'Peter'},
                    // @ts-ignore
                    false,
                    // @ts-ignore
                    'foobar',
                    {uid: 15, name: 'Jonas'},
                    [{hi: 'there'}],
                    // @ts-ignore
                    null,
                    // @ts-ignore
                    undefined,
                    new Date(),
                    {uid: 87, name: 'Josh'},
                ],
                el => el.uid
            )
        ).toEqual(
            new Map([
                [12, {uid: 12, name: 'Peter'}],
                [15, {uid: 15, name: 'Jonas'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should correctly remove objects without the provided key from the array when mapping an array of objects', () => {
        expect(
            mapFnAsMap(
                [
                    // @ts-ignore
                    0,
                    {uid: 12, name: 'Peter'},
                    // @ts-ignore
                    false,
                    // @ts-ignore
                    'foobar',
                    {uid: 15, name: 'Jonas'},
                    [{hi: 'there'}],
                    // @ts-ignore
                    null,
                    // @ts-ignore
                    undefined,
                    {name: 'Alana'},
                    new Date(),
                    {uid: 87, name: 'Josh'},
                ],
                el => el.uid
            )
        ).toEqual(
            new Map([
                [12, {uid: 12, name: 'Peter'}],
                [15, {uid: 15, name: 'Jonas'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should correctly take the last object for a key-match when passed an array where there are duplicates', () => {
        expect(
            mapFnAsMap(
                [
                    // @ts-ignore
                    0,
                    {uid: 12, name: 'Peter'},
                    // @ts-ignore
                    false,
                    // @ts-ignore
                    'foobar',
                    {uid: 15, name: 'Jonas'},
                    [{hi: 'there'}],
                    {uid: 15, name: 'Bob'},
                    // @ts-ignore
                    null,
                    // @ts-ignore
                    undefined,
                    {name: 'Alana'},
                    new Date(),
                    {uid: 87, name: 'Josh'},
                    {uid: 12, name: 'Farah'},
                ],
                el => el.uid
            )
        ).toEqual(
            new Map([
                [12, {uid: 12, name: 'Farah'}],
                [15, {uid: 15, name: 'Bob'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should default to merge false when passed empty opts', () => {
        expect(
            mapFnAsMap(
                [
                    // @ts-ignore
                    0,
                    {uid: 12, name: 'Peter'},
                    // @ts-ignore
                    false,
                    // @ts-ignore
                    'foobar',
                    {uid: 15, name: 'Jonas'},
                    [{hi: 'there'}],
                    {uid: 15, name: 'Bob'},
                    // @ts-ignore
                    null,
                    // @ts-ignore
                    undefined,
                    {name: 'Alana'},
                    new Date(),
                    {uid: 87, name: 'Josh'},
                    {uid: 12, name: 'Farah'},
                ],
                el => el.uid,
                {}
            )
        ).toEqual(
            new Map([
                [12, {uid: 12, name: 'Farah'}],
                [15, {uid: 15, name: 'Bob'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should ensure objects are assigned on top of each other for key-match with array containing duplicates and merge true', () => {
        expect(
            mapFnAsMap(
                [
                    // @ts-ignore
                    0,
                    {uid: 12, name: 'Peter'},
                    // @ts-ignore
                    false,
                    // @ts-ignore
                    'foobar',
                    {uid: 15, name: 'Jonas', dob: '2022-02-07'},
                    [{hi: 'there'}],
                    {uid: 15, name: 'Bob'},
                    // @ts-ignore
                    null,
                    // @ts-ignore
                    undefined,
                    {name: 'Alana'},
                    new Date(),
                    {uid: 87, name: 'Josh'},
                    {uid: 12, name: 'Farah'},
                ],
                el => el.uid,
                {merge: true}
            )
        ).toEqual(
            new Map([
                [12, {uid: 12, name: 'Farah'}],
                [15, {uid: 15, name: 'Bob', dob: '2022-02-07'}],
                [87, {uid: 87, name: 'Josh'}],
            ])
        );
    });

    it('Should not do anything when passed a function that returns nothing', () => {
        expect(
            mapFnAsMap(
                [
                    // @ts-ignore
                    0,
                    {uid: 12, name: 'Peter'},
                    // @ts-ignore
                    false,
                    // @ts-ignore
                    'foobar',
                    {uid: 15, name: 'Jonas', dob: '2022-02-07'},
                    [{hi: 'there'}],
                    {uid: 15, name: 'Bob'},
                    // @ts-ignore
                    null,
                    // @ts-ignore
                    undefined,
                    {name: 'Alana'},
                    new Date(),
                    {uid: 87, name: 'Josh'},
                    {uid: 12, name: 'Farah'},
                ],
                () => {},
                {merge: true}
            )
        ).toEqual(new Map());
    });

    it('Should not do anything when passed a function that returns an empty string', () => {
        expect(
            mapFnAsMap(
                [
                    // @ts-ignore
                    0,
                    {uid: 12, name: 'Peter'},
                    // @ts-ignore
                    false,
                    // @ts-ignore
                    'foobar',
                    {uid: 15, name: 'Jonas', dob: '2022-02-07'},
                    [{hi: 'there'}],
                    {uid: 15, name: 'Bob'},
                    // @ts-ignore
                    null,
                    // @ts-ignore
                    undefined,
                    {name: 'Alana'},
                    new Date(),
                    {uid: 87, name: 'Josh'},
                    {uid: 12, name: 'Farah'},
                ],
                () => '',
                {merge: true}
            )
        ).toEqual(new Map());
    });

    it('Should apply transformer to each element before mapping', () => {
        const arr = [
            {uid: 1, name: 'Alice', age: 25},
            {uid: 2, name: 'Bob', age: 30},
            {uid: 3, name: 'Charlie', age: 35},
        ];
        expect(
            mapFnAsMap(arr, el => el.uid, {
                transform_fn: el => ({name: el.name.toUpperCase()}),
            })
        ).toEqual(
            new Map([
                [1, {name: 'ALICE'}],
                [2, {name: 'BOB'}],
                [3, {name: 'CHARLIE'}],
            ])
        );
    });

    it('Should correctly merge transformed objects when duplicates exist with merge true', () => {
        const arr = [
            {uid: 1, name: 'Alice', details: {score: 50}},
            {uid: 1, name: 'Alice', details: {passed: true}},
        ];
        expect(
            mapFnAsMap(arr, el => el.uid, {
                merge: true,
                transform_fn: el => el.details,
            })
        ).toEqual(
            new Map([
                [1, {score: 50, passed: true}],
            ])
        );
    });
});
