import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibString   from '../../../lib/string';
import is               from '../../../lib/string/is';
import isNotEmpty       from '../../../lib/string/isNotEmpty';
import isBetween        from '../../../lib/string/isBetween';
import humanizeBytes    from '../../../lib/string/humanizeBytes';
import humanizeNumber   from '../../../lib/string/humanizeNumber';
import shorten          from '../../../lib/string/shorten';

describe('String - *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibString, {
            is,
            isString: is,
            isNe: isNotEmpty,
            isNeString: isNotEmpty,
            isNotEmpty: isNotEmpty,
            isNotEmptyString: isNotEmpty,
            isBetween,
            isStringBetween: isBetween,
            humanizeBytes,
            humanizeNumber,
            shorten,
        });
    });
});
