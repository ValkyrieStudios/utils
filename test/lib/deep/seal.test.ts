/* eslint-disable id-denylist */

import {describe, it, beforeEach}   from 'node:test';
import * as assert                  from 'node:assert/strict';
import CONSTANTS                    from '../../constants';
import deepSeal                     from '../../../lib/deep/seal';

describe('Deep - seal', () => {
    let subject;
    beforeEach(() => {
        subject = deepSeal({
            a: 1,
            test: [1, 2, 3],
            c: {
                d: 'foo',
                e: {
                    f: 'bar',
                },
            },
            bla: [
                {
                    a: 1,
                },
            ],
        });
    });

    it('isSealed flag on every nested object', () => {
        assert.ok(Object.isSealed(subject));
        assert.ok(Object.isSealed(subject.test));
        assert.ok(Object.isSealed(subject.c));
        assert.ok(Object.isSealed(subject.c.e));
    });

    it('Should throw when not passed an object or array', () => {
        for (const el of [
            ...CONSTANTS.IS_NUMERIC,
            ...CONSTANTS.IS_INTEGER,
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_STRING,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_FUNCTION,
            ...CONSTANTS.IS_NULLABLE,
        ]) {
            assert.throws(
                () => deepSeal(el),
                new TypeError('Only objects/arrays can be sealed')
            );
        }
    });
});
