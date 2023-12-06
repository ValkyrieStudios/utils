'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import isNotEmptyString from '../../../src/string/isNotEmpty.mjs';

describe('String - isNotEmpty', () => {
    it('Return false when passing nothing', () => {
        assert.equal(isNotEmptyString(), false);
    });

    it('Return false when passed a non string or empty string value', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.equal(isNotEmptyString(el), false);
    });

    it('Return true when passed a string value without content or spaces regardless of trimmed mode', () => {
        for (const val of [...CONSTANTS.NOT_BOOLEAN, false, true]) {
            assert.equal(isNotEmptyString('', val), false);
        }
    });

    it('Return true when passed a string value with content', () => {
        for (const el of CONSTANTS.IS_STRING) assert.ok(isNotEmptyString(el));
    });

    it('Return true when passed an empty string with spaces value and setting trimmed as anything but true', () => {
        for (const val of [...CONSTANTS.NOT_BOOLEAN, false]) {
            if (val === undefined) continue;
            for (const el of [' ', '    ', '   ']) assert.ok(isNotEmptyString(el, val));
        }
    });

    it('Return false when passed an empty string value and setting trimmed to true (default)', () => {
        for (const el of [...CONSTANTS.NOT_STRING, '', ' ', '   ']) assert.equal(isNotEmptyString(el, true), false);
    });
});