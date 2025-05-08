import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibObject   from '../../../lib/object';
import define           from '../../../lib/object/define';
import is               from '../../../lib/object/is';
import isNotEmpty       from '../../../lib/object/isNotEmpty';
import merge            from '../../../lib/object/merge';
import pick             from '../../../lib/object/pick';
import omit             from '../../../lib/object/omit';

describe('Object - *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibObject, {
            isObject: is,
            isNeObject: isNotEmpty,
            isNotEmptyObject: isNotEmpty,
            define,
            merge,
            pick,
            omit,
        });
    });
});
