import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import shorten          from '../../../lib/string/shorten';

describe('String - shorten', () => {
    it('Return empty string when passed nothing', () => {
        /* @ts-ignore */
        assert.equal(shorten(), '');
    });

    it('Return empty string when passed a non string value', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            /* @ts-ignore */
            assert.equal(shorten(el), '');
        }
    });

    it('Return original string when passed a non-numeric length', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            if (el === undefined) continue;
            assert.equal(shorten('  Mama Mia   ', el), '  Mama Mia   ');
        }
    });

    it('Return original string when passed a non string postfix', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            if (el === undefined) continue;
            assert.equal(shorten('  Mama Mia   ', 10, el), '  Mama Mia   ');
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
