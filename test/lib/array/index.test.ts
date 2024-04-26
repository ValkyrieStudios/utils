'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibArray    from '../../../lib/array';
import dedupe           from '../../../lib/array/dedupe';
import is               from '../../../lib/array/is';
import isNotEmpty       from '../../../lib/array/isNotEmpty';
import join             from '../../../lib/array/join';
import mapFn            from '../../../lib/array/mapFn';
import mapKey           from '../../../lib/array/mapKey';
import mapPrimitive     from '../../../lib/array/mapPrimitive';
import shuffle          from '../../../lib/array/shuffle';
import sort             from '../../../lib/array/sort';

describe('Array - *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibArray, {
            dedupe: dedupe,
            is,
            isArray: is,
            isNotEmptyArray: isNotEmpty,
            isNotEmpty,
            isNeArray: isNotEmpty,
            isNe: isNotEmpty,
            join,
            mapFn,
            mapKey,
            mapPrimitive,
            shuffle,
            sort,
        });
    });
});
