import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibArray    from '../../../lib/array';
import dedupe           from '../../../lib/array/dedupe';
import is               from '../../../lib/array/is';
import isNotEmpty       from '../../../lib/array/isNotEmpty';
import join             from '../../../lib/array/join';
import mapFn            from '../../../lib/array/mapFn';
import mapFnAsMap       from '../../../lib/array/mapFnAsMap';
import mapKey           from '../../../lib/array/mapKey';
import mapKeyAsMap      from '../../../lib/array/mapKeyAsMap';
import mapPrimitive     from '../../../lib/array/mapPrimitive';
import groupBy          from '../../../lib/array/groupBy';
import shuffle          from '../../../lib/array/shuffle';
import split            from '../../../lib/array/split';
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
            mapFnAsMap,
            mapKey,
            mapKeyAsMap,
            mapPrimitive,
            groupBy,
            shuffle,
            split,
            sort,
        });
    });
});
