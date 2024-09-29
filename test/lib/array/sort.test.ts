import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import sort             from '../../../lib/array/sort';
import shuffle          from '../../../lib/array/shuffle';
import isObject         from '../../../lib/object/is';
import isNotEmptyString from '../../../lib/string/isNotEmpty';

describe('Array - sort', () => {
    it('Returns an empty array when passing nothing', () => {
        /* @ts-ignore */
        assert.deepEqual(sort(), []);
    });

    it('Return an empty array if passed a non-array or empty array as value', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            /* @ts-ignore */
            assert.deepEqual(sort(el), []);
        }
    });

    it('Throws an error when passed a non-string, non-function by', () => {
        for (const el of [
            ...CONSTANTS.IS_NUMERIC,
            ...CONSTANTS.IS_INTEGER,
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_ARRAY,
            ...CONSTANTS.IS_OBJECT,
            ...CONSTANTS.IS_NULLABLE,
        ]) {
            assert.throws(
                /* @ts-ignore */
                () => sort([{test: 'hello'}], el),
                new Error('Sort by should either be a string with content or a function')
            );
        }
    });

    it('Sorts correctly when passed an array of objects with a string to sort by and default dir', () => {
        const out = [
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ];

        assert.throws(
            () => sort(out, '   '),
            new Error('Sort by as string should contain content')
        );
        assert.deepEqual(out, [
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ]);
    });

    it('Sorts correctly when passed an array of objects with a string to sort by and default dir', () => {
        const out = sort([
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ], 'test');
        assert.deepEqual(out, [
            {test: 'Alice'},
            {test: 'Bob'},
            {test: 'Jack'},
            {test: 'Joe'},
            {test: 'John'},
            {test: 'Peter'},
            {test: 'Pony'},
        ]);
    });

    it('Sorts correctly when passed an array of objects with a string to sort by and asc dir', () => {
        const out = sort([
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ], 'test', 'asc');
        assert.deepEqual(out, [
            {test: 'Alice'},
            {test: 'Bob'},
            {test: 'Jack'},
            {test: 'Joe'},
            {test: 'John'},
            {test: 'Peter'},
            {test: 'Pony'},
        ]);
    });

    it('Sorts correctly when passed an array of objects with a string to sort by and desc dir', () => {
        const out = sort([
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ], 'test', 'desc');
        assert.deepEqual(out, [
            {test: 'Pony'},
            {test: 'Peter'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Jack'},
            {test: 'Bob'},
            {test: 'Alice'},
        ]);
    });

    it('Should sort correctly when passed an array of objects with a string to sort by and asc dir (benchmark array of 10000)', () => {
        let out:{i:number}[] = [];
        for (let i = 0; i < 10000; i++) {
            out.push({i});
        }
        shuffle(out);
        out = sort(out, 'i', 'asc');

        let i = -1;
        let cursor;
        while (out.length > 0) {
            cursor = out.shift();
            assert.ok(cursor.i > i);
            i = cursor.i;
        }
    });

    it('Should sort correctly when passed an array of objects with a string to sort by and desc dir (benchmark array of 10000)', () => {
        let out:{i:number}[] = [];
        for (let i = 0; i < 10000; i++) {
            out.push({i});
        }
        shuffle(out);
        out = sort(out, 'i', 'desc');

        let i = 10001;
        let cursor;
        while (out.length > 0) {
            cursor = out.shift();
            assert.ok(cursor.i < i);
            i = cursor.i;
        }
    });

    it('Should sort correctly when passed an array of objects with a string to sort by and asc dir (benchmark array of 20000)', () => {
        let out:{i:number}[] = [];
        for (let i = 0; i < 20000; i++) {
            out.push({i});
        }
        shuffle(out);
        out = sort(out, 'i', 'asc');

        let i = -1;
        let cursor;
        while (out.length > 0) {
            cursor = out.shift();
            assert.ok(cursor.i > i);
            i = cursor.i;
        }
    });

    it('Should sort correctly when passed an array of objects with a string to sort by and desc dir (benchmark array of 20000)', () => {
        let out:{i:number}[] = [];
        for (let i = 0; i < 20000; i++) {
            out.push({i});
        }
        shuffle(out);
        out = sort(out, 'i', 'desc');

        let i = 20001;
        let cursor;
        while (out.length > 0) {
            cursor = out.shift();
            assert.ok(cursor.i < i);
            i = cursor.i;
        }
    });

    it('Should sort correctly when passed an array of objects with a string to sort by and asc dir (benchmark array of 30000)', () => {
        let out:{i:number}[] = [];
        for (let i = 0; i < 30000; i++) {
            out.push({i});
        }
        shuffle(out);
        out = sort(out, 'i', 'asc');

        let i = -1;
        let cursor;
        while (out.length > 0) {
            cursor = out.shift();
            assert.ok(cursor.i > i);
            i = cursor.i;
        }
    });

    it('Should sort correctly when passed an array of objects with a string to sort by and desc dir (benchmark array of 30000)', () => {
        let out:{i:number}[] = [];
        for (let i = 0; i < 30000; i++) {
            out.push({i});
        }
        shuffle(out);
        out = sort(out, 'i', 'desc');

        let i = 30001;
        let cursor;
        while (out.length > 0) {
            cursor = out.shift();
            assert.ok(cursor.i < i);
            i = cursor.i;
        }
    });

    it('Should correctly filter out non-objects or empty objects when sorting with a string to sort by and desc dir', () => {
        const out = sort([
            ...CONSTANTS.IS_REGEXP,
            {test: 'Peter'},
            ...CONSTANTS.IS_ARRAY,
            {test: 'Jack'},
            ...CONSTANTS.IS_NULLABLE,
            {test: 'Pony'},
            ...CONSTANTS.IS_STRING,
            {test: 'John'},
            ...CONSTANTS.IS_FUNCTION,
            {test: 'Joe'},
            ...CONSTANTS.IS_DATE,
            {test: 'Bob'},
            ...CONSTANTS.IS_BOOLEAN,
            {test: 'Alice'},
            ...CONSTANTS.IS_NUMERIC,
        ], 'test', 'desc');
        assert.deepEqual(out, [
            {test: 'Pony'},
            {test: 'Peter'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Jack'},
            {test: 'Bob'},
            {test: 'Alice'},
        ]);
    });

    it('Should correctly filter out non-objects or empty objects when sorting with a string to sort by and asc dir', () => {
        const out = sort([
            ...CONSTANTS.IS_REGEXP,
            {test: 'Peter'},
            ...CONSTANTS.IS_ARRAY,
            {test: 'Jack'},
            ...CONSTANTS.IS_NULLABLE,
            {test: 'Pony'},
            ...CONSTANTS.IS_STRING,
            {test: 'John'},
            ...CONSTANTS.IS_FUNCTION,
            {test: 'Joe'},
            ...CONSTANTS.IS_DATE,
            {test: 'Bob'},
            ...CONSTANTS.IS_BOOLEAN,
            {test: 'Alice'},
            ...CONSTANTS.IS_NUMERIC,
        ], 'test', 'asc');
        assert.deepEqual(out, [
            {test: 'Alice'},
            {test: 'Bob'},
            {test: 'Jack'},
            {test: 'Joe'},
            {test: 'John'},
            {test: 'Peter'},
            {test: 'Pony'},
        ]);
    });

    it('Should sort correctly when sorting with a function to sort by and asc dir', () => {
        const out = sort([
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ], el => el.test.toLowerCase(), 'asc');
        assert.deepEqual(out, [
            {test: 'Alice'},
            {test: 'Bob'},
            {test: 'Jack'},
            {test: 'Joe'},
            {test: 'John'},
            {test: 'Peter'},
            {test: 'Pony'},
        ]);
    });

    it('Should sort correctly when sorting with a function to sort by and desc dir', () => {
        const out = sort([
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ], el => el.test.toLowerCase(), 'desc');
        assert.deepEqual(out, [
            {test: 'Pony'},
            {test: 'Peter'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Jack'},
            {test: 'Bob'},
            {test: 'Alice'},
        ]);
    });

    it('Should correctly filter out non-objects or empty objects when sorting with a function to sort by and desc dir', () => {
        const out = sort([
            ...CONSTANTS.IS_REGEXP,
            {test: 'Peter'},
            ...CONSTANTS.IS_ARRAY,
            {test: 'Jack'},
            ...CONSTANTS.IS_NULLABLE,
            {test: 'Pony'},
            ...CONSTANTS.IS_STRING,
            {test: 'John'},
            ...CONSTANTS.IS_FUNCTION,
            {test: 'Joe'},
            ...CONSTANTS.IS_DATE,
            {test: 'Bob'},
            ...CONSTANTS.IS_BOOLEAN,
            {test: 'Alice'},
            ...CONSTANTS.IS_NUMERIC,
        ], el => el.test.toLowerCase(), 'desc');
        assert.deepEqual(out, [
            {test: 'Pony'},
            {test: 'Peter'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Jack'},
            {test: 'Bob'},
            {test: 'Alice'},
        ]);
    });

    it('Should correctly filter out non-objects or empty objects when sorting with a function to sort by and asc dir', () => {
        const out = sort([
            ...CONSTANTS.IS_REGEXP,
            {test: 'Peter'},
            ...CONSTANTS.IS_ARRAY,
            {test: 'Jack'},
            ...CONSTANTS.IS_NULLABLE,
            {test: 'Pony'},
            ...CONSTANTS.IS_STRING,
            {test: 'John'},
            ...CONSTANTS.IS_FUNCTION,
            {test: 'Joe'},
            ...CONSTANTS.IS_DATE,
            {test: 'Bob'},
            ...CONSTANTS.IS_BOOLEAN,
            {test: 'Alice'},
            ...CONSTANTS.IS_NUMERIC,
        ], el => el.test.toLowerCase(), 'asc');
        assert.deepEqual(out, [
            {test: 'Alice'},
            {test: 'Bob'},
            {test: 'Jack'},
            {test: 'Joe'},
            {test: 'John'},
            {test: 'Peter'},
            {test: 'Pony'},
        ]);
    });

    it('Should correctly position objects when sorting with a function and the function returns undefined to sort by and desc dir', () => {
        const out = sort([
            {test: 'Peter', uid: 1},
            {test: 'Jack', uid: 2},
            {test: 'Pony', uid: 3},
            {test: undefined, uid: 4},
            {test: 'Joe', uid: 5},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
        ], el => {
            if (!el.test) return undefined;
            return el.test.toLowerCase();
        }, 'desc');
        assert.deepEqual(out, [
            {test: 'Pony', uid: 3},
            {test: 'Peter', uid: 1},
            {test: 'Joe', uid: 5},
            {test: 'Jack', uid: 2},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
            {test: undefined, uid: 4},
        ]);
    });

    it('Should correctly position objects when sorting with a function and the function returns undefined to sort by and asc dir ', () => {
        const out = sort([
            {test: 'Peter', uid: 1},
            {test: 'Jack', uid: 2},
            {test: 'Pony', uid: 3},
            {test: undefined, uid: 4},
            {test: 'Joe', uid: 5},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
        ], el => {
            if (!el.test) return undefined;
            return el.test.toLowerCase();
        }, 'asc');
        assert.deepEqual(out, [
            {test: 'Alice', uid: 7},
            {test: 'Bob', uid: 6},
            {test: 'Jack', uid: 2},
            {test: 'Joe', uid: 5},
            {test: 'Peter', uid: 1},
            {test: 'Pony', uid: 3},
            {test: undefined, uid: 4},
        ]);
    });

    it('Should correctly position objects sorting with a sort key and it\'s non-existent or undefined to sort by and desc dir', () => {
        const out = sort([
            {test: 'Peter', uid: 1},
            {test: 'Jack', uid: 2},
            {test: 'Pony', uid: 3},
            {test: undefined, uid: 4},
            {test: 'Joe', uid: 5},
            {test: 'Bob', uid: 6},
            {uid: 9},
            {test: 'Alice', uid: 7},
        ], 'test', 'desc');
        assert.deepEqual(out, [
            {test: 'Pony', uid: 3},
            {test: 'Peter', uid: 1},
            {test: 'Joe', uid: 5},
            {test: 'Jack', uid: 2},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
            {test: undefined, uid: 4},
            {uid: 9},
        ]);
    });

    it('Should correctly position objects sorting with a sort key and it\'s non-existent or undefined to sort by and asc dir ', () => {
        const out = sort([
            {test: 'Peter', uid: 1},
            {test: 'Jack', uid: 2},
            {test: 'Pony', uid: 3},
            {uid: 4},
            {test: 'Joe', uid: 5},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
            {test: undefined, uid: 9},
        ], 'test', 'asc');
        assert.deepEqual(out, [
            {test: 'Alice', uid: 7},
            {test: 'Bob', uid: 6},
            {test: 'Jack', uid: 2},
            {test: 'Joe', uid: 5},
            {test: 'Peter', uid: 1},
            {test: 'Pony', uid: 3},
            {uid: 4},
            {test: undefined, uid: 9},
        ]);
    });

    it('Should correctly sort with a sort key and filter which wouldnt have anything using {nokey_hide: true} sort by and asc dir', () => {
        const out = sort([
            {test: 'Peter', uid: 1},
            {test: 'Jack', uid: 2},
            {test: 'Pony', uid: 3},
            {uid: 4},
            {test: 'Joe', uid: 5},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
            {test: undefined, uid: 9},
        ], 'test', 'asc', {nokey_hide: true});
        assert.deepEqual(out, [
            {test: 'Alice', uid: 7},
            {test: 'Bob', uid: 6},
            {test: 'Jack', uid: 2},
            {test: 'Joe', uid: 5},
            {test: 'Peter', uid: 1},
            {test: 'Pony', uid: 3},
        ]);
    });

    it('Should correctly sort with a sort key that is non-existent with asc dir and position the nokey ones through nokey_atend', () => {
        const out = sort([
            {test: 'Peter', uid: 1},
            {test: 'Jack', uid: 2},
            {test: 'Pony', uid: 3},
            {uid: 4},
            {test: 'Joe', uid: 5},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
            {test: undefined, uid: 9},
        ], 'test', 'asc', {nokey_atend: false});
        assert.deepEqual(out, [
            {uid: 4},
            {test: undefined, uid: 9},
            {test: 'Alice', uid: 7},
            {test: 'Bob', uid: 6},
            {test: 'Jack', uid: 2},
            {test: 'Joe', uid: 5},
            {test: 'Peter', uid: 1},
            {test: 'Pony', uid: 3},
        ]);
    });

    it('Should correctly sort with a sort key that is non-existent with desc dir and position the nokey ones through nokey_atend', () => {
        const out = sort([
            {test: 'Peter', uid: 1},
            {test: 'Jack', uid: 2},
            {test: 'Pony', uid: 3},
            {uid: 4},
            {test: 'Joe', uid: 5},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
            {test: undefined, uid: 9},
        ], 'test', 'desc', {nokey_atend: false});
        assert.deepEqual(out, [
            {uid: 4},
            {test: undefined, uid: 9},
            {test: 'Pony', uid: 3},
            {test: 'Peter', uid: 1},
            {test: 'Joe', uid: 5},
            {test: 'Jack', uid: 2},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
        ]);
    });

    it('Should correctly sort with a sort key that is non-existent with asc dir and filter_fn', () => {
        const out = sort([
            {test: 'Peter', uid: 1},
            {test: 'Jack', uid: 2},
            {test: 'Pony', uid: 3},
            {uid: 4},
            {test: 'Joe', uid: 5},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
            {test: undefined, uid: 9},
        ], 'test', 'desc', {nokey_atend: false, filter_fn: el => isObject(el) && isNotEmptyString(el.test)});
        assert.deepEqual(out, [
            {test: 'Pony', uid: 3},
            {test: 'Peter', uid: 1},
            {test: 'Joe', uid: 5},
            {test: 'Jack', uid: 2},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
        ]);
    });

    it('Should correctly sort with a sort key that is non-existent/undefined with asc dir and filter_fn (different key)', () => {
        const out = sort([
            {test: 'Peter', uid: 1},
            {test: 'Jack', uid: 2},
            {test: 'Pony', uid: 3},
            {uid: 4},
            {test: 'Joe', uid: 5},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
            {test: undefined, uid: 9},
        ], 'uid', 'desc', {nokey_atend: false, filter_fn: el => isObject(el) && isNotEmptyString(el.test)});
        assert.deepEqual(out, [
            {test: 'Alice', uid: 7},
            {test: 'Bob', uid: 6},
            {test: 'Joe', uid: 5},
            {test: 'Pony', uid: 3},
            {test: 'Jack', uid: 2},
            {test: 'Peter', uid: 1},
        ]);
    });

    it('Should keep references intact to elements in the array', () => {
        const arr = [
            {test: 'Peter', uid: 1},
            {test: 'Jack', uid: 2},
            {test: 'Pony', uid: 3},
            {uid: 4},
            {test: 'Joe', uid: 5},
            {test: 'Bob', uid: 6},
            {test: 'Alice', uid: 7},
            {test: undefined, uid: 9},
        ];
        const out = sort(arr, 'uid', 'desc', {nokey_atend: false, filter_fn: el => isObject(el) && isNotEmptyString(el.test)});
        assert.deepEqual(out, [
            {test: 'Alice', uid: 7},
            {test: 'Bob', uid: 6},
            {test: 'Joe', uid: 5},
            {test: 'Pony', uid: 3},
            {test: 'Jack', uid: 2},
            {test: 'Peter', uid: 1},
        ]);
        out[0].test = 'Alice rocks';
        assert.equal(arr[6].test, 'Alice rocks');
    });
});
