'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import shorten          from '../../../src/string/shorten.mjs';

describe('String - shorten', () => {
    it('Return false when passing nothing', () => {
        assert.equal(shorten(), false);
    });

    it('Return false when passed a non string value', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            assert.equal(shorten(el), false);
        }
    });

    it('Return false when passed a non-numeric length', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            if (el === undefined) continue;
            assert.equal(shorten('  Mama Mia   ', el), false);
        }
    });

    it('Return false when passed a non string value', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            if (el === undefined) continue;
            assert.equal(shorten('  Mama Mia   ', 10, el), false);
        }
    });

    it('Returns original text when text is not beyond boundaries of length', () => {
        assert.equal(shorten('Mama Mia', 50), 'Mama Mia');
    });

    it('Autotrims text and returns autotrimmed text when text is not beyond boundaries of length', () => {
        assert.equal(shorten('   Mama Mia    ', 10), 'Mama Mia');
    });

    it('Autotrims text and returns autotrimmed shortened text when text is beyond boundaries of length', () => {
        assert.equal(shorten('  Mama Mia  ', 4), 'Mama...');
    });

    it('Uses ... as the default postfix', () => {
        assert.equal(shorten('To the moon and beyond', 11), 'To the moon...');
    });

    it('Allows setting a custom postfix', () => {
        assert.equal(shorten('To the moon and beyond', 11, '..'), 'To the moon..');
    });

    it('Allows setting an empty string as postfix', () => {
        assert.equal(shorten('To the moon and beyond', 11, ''), 'To the moon');
    });

    it('Does not autotrim the postfix', () => {
        assert.equal(shorten('To the moon and beyond', 11, ' '), 'To the moon ');
    });
});
