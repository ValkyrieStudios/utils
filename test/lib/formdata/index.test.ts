import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibFormData from '../../../lib/formdata';
import is               from '../../../lib/formdata/is';

describe('FormData - *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibFormData, {
            isFormData: is,
            is,
        });
    });
});
