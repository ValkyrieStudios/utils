'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import define           from '../../../lib/object/define';

describe('Object - define', () => {
    it('Throws when passing a non-object props', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            assert.throws(
                () => define(el, {}),
                new TypeError('Please pass an object as the value for props and obj')
            );
        }
    });

    it('Throws when passing a non-object obj', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            if (el === undefined) continue;
            assert.throws(
                () => define({}, el),
                new TypeError('Please pass an object as the value for props and obj')
            );
        }
    });

    it('Returns the same object when called with an empty properties object', () => {
        assert.deepEqual(define({}, {a: 1}), {a: 1});
    });

    it('defines properties that are passed without passing an existing object', () => {
        const obj = define({
            a: {
                configurable: true,
                get: () => 1,
            },
            b: {
                configurable: true,
                value: () => 2,
            },
        });

        assert.equal(Object.getOwnPropertyDescriptor(obj, 'a').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(obj, 'a').get, 'function');

        assert.equal(Object.getOwnPropertyDescriptor(obj, 'b').get, undefined);
        assert.equal(Object.getOwnPropertyDescriptor(obj, 'b').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(obj, 'b').value, 'function');

        assert.equal(obj.a, 1);
        assert.equal(obj.b(), 2);
    });

    it('defines properties that are passed on an existing object', () => {
        const obj = define({
            a: {
                configurable: true,
                get: () => 1,
            },
            b: {
                configurable: true,
                value: () => 2,
            },
        }, {c: 1});

        assert.equal(Object.getOwnPropertyDescriptor(obj, 'a').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(obj, 'a').get, 'function');

        assert.equal(Object.getOwnPropertyDescriptor(obj, 'b').get, undefined);
        assert.equal(Object.getOwnPropertyDescriptor(obj, 'b').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(obj, 'b').value, 'function');

        assert.equal(obj.a, 1);
        assert.equal(obj.b(), 2);
        assert.equal(obj.c, 1);
    });

    it('defines properties that are passed on an existing object', () => {
        const obj = define({
            a: {
                configurable: true,
                get: () => 1,
            },
            b: {
                configurable: true,
                value: () => 2,
            },
        }, {a: 5});

        assert.equal(Object.getOwnPropertyDescriptor(obj, 'a').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(obj, 'a').get, 'function');

        assert.equal(Object.getOwnPropertyDescriptor(obj, 'b').get, undefined);
        assert.equal(Object.getOwnPropertyDescriptor(obj, 'b').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(obj, 'b').value, 'function');

        assert.equal(obj.a, 1);
        assert.equal(obj.b(), 2);
    });
});
