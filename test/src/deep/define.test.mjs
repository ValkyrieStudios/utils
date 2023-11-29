'use strict';

/* eslint-disable id-denylist */

import {describe, it, beforeEach}   from 'node:test';
import assert                       from 'node:assert/strict';
import deepDefine                   from '../../../src/deep/define.mjs';

describe('Deep - define', () => {
    let subject;
    beforeEach(() => {
        subject = {
            a: 1,
            b: 2,
            c: 3,
            d: [
                0,
                1,
                2,
                3,
                {
                    e: 'Hello',
                    f: ['a', 'b', 'c'],
                },
            ],
        };
    });

    it('Correctly defines a value on an existing key', () => {
        deepDefine(subject, 'a', {get: () => 5});

        assert.equal(subject.a, 5);
        assert.equal(Object.getOwnPropertyDescriptor(subject, 'a').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(subject, 'a').get, 'function');
    });

    it('Correctly defines a value on an inexisting key', () => {
        deepDefine(subject, 'g', {get: () => 5});

        assert.equal(subject.g, 5);
        assert.equal(Object.getOwnPropertyDescriptor(subject, 'g').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(subject, 'g').get, 'function');
    });

    it('Correctly defines a value on an existing deep key', () => {
        deepDefine(subject, 'd.4.e', {get: () => 'Deep'});

        assert.equal(subject.d[4].e, 'Deep');
        assert.equal(Object.getOwnPropertyDescriptor(subject.d[4], 'e').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(subject.d[4], 'e').get, 'function');
    });

    it('Correctly defines a deep value on an inexisting key', () => {
        deepDefine(subject, 'g.a.b.c.d.e.f', {get: () => 5});

        assert.equal(subject.g.a.b.c.d.e.f, 5);
        assert.equal(Object.getOwnPropertyDescriptor(subject.g.a.b.c.d.e, 'f').set, undefined);
        assert.equal(typeof Object.getOwnPropertyDescriptor(subject.g.a.b.c.d.e, 'f').get, 'function');
    });
});
