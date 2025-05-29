import {describe, it, expect} from 'vitest';
import * as LibArray from '../../../lib/array';
import dedupe from '../../../lib/array/dedupe';
import is from '../../../lib/array/is';
import isNotEmpty from '../../../lib/array/isNotEmpty';
import join from '../../../lib/array/join';
import mapFn from '../../../lib/array/mapFn';
import mapFnAsMap from '../../../lib/array/mapFnAsMap';
import mapKey from '../../../lib/array/mapKey';
import mapKeyAsMap from '../../../lib/array/mapKeyAsMap';
import mapPrimitive from '../../../lib/array/mapPrimitive';
import groupBy from '../../../lib/array/groupBy';
import shuffle from '../../../lib/array/shuffle';
import split from '../../../lib/array/split';
import sort from '../../../lib/array/sort';

describe('Array - *', () => {
    it('Should be a correct export', () => {
        expect(LibArray.dedupe).toEqual(dedupe);
        expect(LibArray.isArray).toEqual(is);
        expect(LibArray.isNotEmptyArray).toEqual(isNotEmpty);
        expect(LibArray.isNeArray).toEqual(isNotEmpty);
        expect(LibArray.join).toEqual(join);
        expect(LibArray.mapFn).toEqual(mapFn);
        expect(LibArray.mapFnAsMap).toEqual(mapFnAsMap);
        expect(LibArray.mapKey).toEqual(mapKey);
        expect(LibArray.mapKeyAsMap).toEqual(mapKeyAsMap);
        expect(LibArray.mapPrimitive).toEqual(mapPrimitive);
        expect(LibArray.groupBy).toEqual(groupBy);
        expect(LibArray.shuffle).toEqual(shuffle);
        expect(LibArray.split).toEqual(split);
        expect(LibArray.sort).toEqual(sort);
    });
});
