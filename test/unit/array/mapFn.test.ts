import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import mapFn from '../../../lib/array/mapFn';

describe('Array - mapFn', () => {
    it('Returns an empty object when passing nothing', () => {
        // @ts-ignore
        expect(mapFn()).toEqual({});
    });

    it('Return an empty object if passed a non-array or empty array as value', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            expect(mapFn(el, val => val.uid)).toEqual({});
        }
    });

    it('Return an empty object if passed a non-function as key', () => {
        for (const el of CONSTANTS.NOT_FUNCTION) {
            expect(mapFn([{foo: 'bar'}], el)).toEqual({});
        }
    });

    it('Should correctly map an array of objects', () => {
        expect(
            mapFn(
                [
                    {uid: 12, name: 'Peter'},
                    {uid: 15, name: 'Jonas'},
                    {uid: 87, name: 'Josh'},
                ],
                el => el.uid
            )
        ).toEqual({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it('Should correctly map an array of objects when passing a non-object options', () => {
        // @ts-ignore
        expect(
            mapFn(
                [
                    {uid: 12, name: 'Peter'},
                    {uid: 15, name: 'Jonas'},
                    {uid: 87, name: 'Josh'},
                ],
                el => el.uid,
                // @ts-ignore
                'foo'
            )
        ).toEqual({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it('Should correctly remove non-objects from the array when mapping an array of objects', () => {
        expect(
            mapFn(
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
        ).toEqual({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it('Should correctly remove objects without the provided key from the array when mapping an array of objects', () => {
        expect(
            mapFn(
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
        ).toEqual({
            12: {uid: 12, name: 'Peter'},
            15: {uid: 15, name: 'Jonas'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it('Should correctly take the last object for a key-match when passed an array where there are duplicates', () => {
        expect(
            mapFn(
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
        ).toEqual({
            12: {uid: 12, name: 'Farah'},
            15: {uid: 15, name: 'Bob'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it('Should default to merge false when passed empty opts', () => {
        expect(
            mapFn(
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
        ).toEqual({
            12: {uid: 12, name: 'Farah'},
            15: {uid: 15, name: 'Bob'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it('Should ensure objects are assigned on top of each other for key-match with array containing duplicates and merge true', () => {
        expect(
            mapFn(
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
        ).toEqual({
            12: {uid: 12, name: 'Farah'},
            15: {uid: 15, name: 'Bob', dob: '2022-02-07'},
            87: {uid: 87, name: 'Josh'},
        });
    });

    it('Should not do anything when passed a function that returns nothing', () => {
        expect(
            mapFn(
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
        ).toEqual({});
    });

    it('Should not do anything when passed a function that returns an empty string', () => {
        expect(
            mapFn(
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
        ).toEqual({});
    });

    it('Should apply transformer to each element before mapping', () => {
        const arr = [
            {uid: 1, name: 'Alice', age: 25},
            {uid: 2, name: 'Bob', age: 30},
            {uid: 3, name: 'Charlie', age: 35},
        ];
        expect(
            mapFn(arr, el => el.uid, {
                transform_fn: el => ({name: el.name.toUpperCase()}),
            })
        ).toEqual({
            1: {name: 'ALICE'},
            2: {name: 'BOB'},
            3: {name: 'CHARLIE'},
        });
    });

    it('Should correctly merge transformed objects when duplicates exist with merge true', () => {
        const arr = [
            {uid: 1, name: 'Alice', details: {score: 50}},
            {uid: 1, name: 'Alice', details: {passed: true}},
        ];
        expect(
            mapFn(arr, el => el.uid, {
                merge: true,
                transform_fn: el => el.details,
            })
        ).toEqual({
            1: {score: 50, passed: true},
        });
    });
});
