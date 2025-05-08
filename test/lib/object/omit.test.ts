import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
import CONSTANTS from '../../constants';
import omit from '../../../lib/object/omit';

describe('Object - omit', () => {
    it('Correctly omits the specified keys', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                d: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        assert.deepEqual(
            omit(subject, ['a']),
            {b: 200, c: {d: 5, bar: true, f: [0, 1, 2]}}
        );
        assert.deepEqual(
            omit(subject, ['a', 'b']),
            {c: {d: 5, bar: true, f: [0, 1, 2]}}
        );
        assert.deepEqual(
            omit(subject, ['a', 'c.bar']),
            {b: 200, c: {d: 5, f: [0, 1, 2]}}
        );
        assert.deepEqual(
            omit(subject, ['a', 'c.d', 'c.f']),
            {b: 200, c: {bar: true}}
        );
        assert.deepEqual(
            omit(subject, ['a', 'b', 'd']),
            {c: {d: 5, bar: true, f: [0, 1, 2]}}
        );
    });

    it('Correctly ignores non-string keys', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                d: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        assert.deepEqual(
            omit(subject, ['a', ...CONSTANTS.NOT_STRING, 'd']),
            {b: 200, c: {d: 5, bar: true, f: [0, 1, 2]}}
        );
    });

    it('Correctly filters out keys for which deep retrieval can’t find them', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                j: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        assert.deepEqual(
            omit(subject, [
                'a',
                '  ',
                'c.d',
                'b',
            ]),
            {c: {j: 5, bar: true, f: [0, 1, 2]}}
        );
    });

    it('Correctly filters out keys for which the root object doesnt exist', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                j: 5,
                bar: true,
                f: [0, 1, 2],
            },
        };

        assert.deepEqual(
            omit(subject, [
                'a',
                '  ',
                'c.d',
                'd.f',
                'b',
            ]),
            {c: {j: 5, bar: true, f: [0, 1, 2]}}
        );
    });

    it('Correctly filters out deeply nested keys', () => {
        const subject = {
            a: 100,
            b: 200,
            c: {
                j: 5,
                bar: true,
                f: {
                    age: 42,
                    world: 'hello',
                },
            },
        };

        assert.deepEqual(
            omit(subject, [
                'a',
                'c.f.age',
                'c.j',
            ]),
            {b: 200, c: {bar: true, f: {world: 'hello'}}}
        );
    });

    it('Throws a type error when passed something other than an object to omit from', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            assert.throws(
                () => omit(el, ['a', 'b']),
                new TypeError('Please pass an object to omit from and a keys array')
            );
        }
    });

    it('Throws a type error when passed something other than an array as keys', () => {
        for (const el of CONSTANTS.NOT_ARRAY) {
            assert.throws(
                () => omit({a: 'hello'}, el),
                new TypeError('Please pass an object to omit from and a keys array')
            );
        }
    });
});
