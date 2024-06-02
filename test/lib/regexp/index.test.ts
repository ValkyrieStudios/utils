import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibRegExp   from '../../../lib/regexp';
import is               from '../../../lib/regexp/is';
import sanitize         from '../../../lib/regexp/sanitize';

describe('RegExp - *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibRegExp, {
            is,
            isRegExp: is,
            sanitizeRegExp: sanitize,
            sanitize,
        });
    });
});
