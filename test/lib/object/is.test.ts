'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isObject         from '../../../lib/object/is';

describe('Object - is', () => {
    it('Return false when passing nothing', () => {
        /* @ts-ignore */
        assert.equal(isObject(), false);
    });

    it('Return false when passed a non object value', () => {
        for (const el of CONSTANTS.NOT_OBJECT) assert.equal(isObject(el), false);
    });

    it('Return true when passed an empty object value', () => {
        assert.ok(isObject({}));
    });

    it('Return true when passed an object value', () => {
        for (const el of CONSTANTS.IS_OBJECT) assert.ok(isObject(el));
    });
});
