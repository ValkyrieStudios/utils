import {describe, it, expect} from 'vitest';
import * as LibObject from '../../../lib/object';
import define from '../../../lib/object/define';
import is from '../../../lib/object/is';
import isNotEmpty from '../../../lib/object/isNotEmpty';
import merge from '../../../lib/object/merge';
import pick from '../../../lib/object/pick';
import omit from '../../../lib/object/omit';
import scramble from '../../../lib/object/scramble';

describe('Object - *', () => {
    it('Should be a correct export', () => {
        expect(LibObject.isObject).toEqual(is);
        expect(LibObject.isNeObject).toEqual(isNotEmpty);
        expect(LibObject.isNotEmptyObject).toEqual(isNotEmpty);
        expect(LibObject.define).toEqual(define);
        expect(LibObject.merge).toEqual(merge);
        expect(LibObject.pick).toEqual(pick);
        expect(LibObject.omit).toEqual(omit);
        expect(LibObject.scramble).toEqual(scramble);
    });
});
