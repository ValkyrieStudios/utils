'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import merge            from '../../../lib/object/merge.mjs';

describe('Object - merge', () => {
    it('Returns the target object if only passed a target', () => {
        assert.deepEqual(merge({a: 1, b: 2}), {a: 1, b: 2});
    });

    it('Merges keys correctly', () => {
        assert.deepEqual(
            merge({a: 1, b: 2, c: true}, {a: 5, c: false}),
            {a: 5, b: 2, c: false}
        );
        assert.deepEqual(
            merge({
                a: [0, 1, 2, 3],
                b: {
                    name: 'utils',
                    status: 0,
                    available: false,
                },
                c: {
                    foo: 'bar',
                    hello: 'world',
                },
            }, {
                a: ['foo', 'bar'],
                b: {available: true},
                c: {hello: 'core'},
            }),
            {
                a: ['foo', 'bar'],
                b: {
                    name: 'utils',
                    status: 0,
                    available: true,
                },
                c: {
                    foo: 'bar',
                    hello: 'core',
                },
            }
        );
    });

    it('Does not merge in keys that are not defined in the target by default', () => {
        assert.deepEqual(
            merge({a: 1, b: 2}, {a: 2, b: 3, c: 4}),
            {a: 2, b: 3}
        );
    });

    it('throws a type error when passed something else than an object target', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            assert.throws(
                () => merge(el, {a: 2}),
                new TypeError('Please pass a target and object to merge')
            );
        }
    });

    it('throws a type error when passed something else than an object target', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            assert.throws(
                () => merge(el, {a: 2}),
                new TypeError('Please pass a target and object to merge')
            );
        }
    });

    it('throws a type error when passed something else than an object source', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            if (el === undefined) continue;
            assert.throws(
                () => merge(el, {a: 2}),
                new TypeError('Please pass a target and object to merge')
            );
        }
    });
});
