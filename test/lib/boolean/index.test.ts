import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibBoolean  from '../../../lib/boolean';
import is               from '../../../lib/boolean/is';

describe('Boolean - *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibBoolean, {
            is,
            isBoolean: is,
        });
    });
});
