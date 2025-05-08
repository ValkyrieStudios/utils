import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import pick             from '../../../lib/object/pick';

describe('Object - pick', () => {
    it('Correctly retrieve the selected keys', () => {
        const subject = {
            a : 100,
            b : 200,
            c : {
                d : 5,
                bar : true,
                f : [0, 1, 2],
            },
        };

        assert.deepEqual(
            pick(subject, ['a']),
            {a: 100}
        );
        assert.deepEqual(
            pick(subject, ['a', 'b']),
            {a: 100, b: 200}
        );
        assert.deepEqual(
            pick(subject, ['a', 'c.bar']),
            {a: 100, c: {bar: true}}
        );
        assert.deepEqual(
            pick(subject, ['a', 'c.d', 'c.f']),
            {a: 100, c: {d: 5, f: [0, 1, 2]}}
        );
        assert.deepEqual(
            pick(subject, ['a', 'b', 'd']),
            {a: 100, b: 200}
        );
    });

    it('Correctly filter out non-string keys', () => {
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
            pick(subject, ['a', ...CONSTANTS.NOT_STRING, 'd']),
            {a: 100}
        );
    });

    it('Correctly filters out keys for which deep retrieval cant find them', () => {
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
            pick(subject, [
                'a',
                '  ',
                'c.d',
                'b',
            ]),
            {a: 100, b: 200}
        );
    });

    it('Throws a type error when passed something else than an object to pick from', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            assert.throws(
                () => pick(el, ['a', 'b']),
                new TypeError('Please pass an object to pick from and a keys array')
            );
        }
    });

    it('Throws a type error when passed something else than an array as keys', () => {
        for (const el of CONSTANTS.NOT_ARRAY) {
            assert.throws(
                () => pick({a: 'hello'}, el),
                new TypeError('Please pass an object to pick from and a keys array')
            );
        }
    });
});
