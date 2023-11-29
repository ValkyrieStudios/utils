'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import sanitize         from '../../../src/regexp/sanitize.mjs';

describe('RegExp - sanitize', () => {
    it('Return false when passing nothing', () => {
        assert.equal(sanitize(), false);
    });

    it('Return false when passed a non string or empty string value', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.equal(sanitize(el), false);
    });

    it('Should return escaped string when passed a string with special characters', () => {
        for (const el of [
            ['Av. P)', 'Av\\. P\\)'],
            ['Suc contry(garza sada', 'Suc contry\\(garza sada'],
            ['contact@valkyriestudios.be', 'contact@valkyriestudios\\.be'],
            ['*alond', '\\*alond'],
            ['[a', '\\[a'],
            ['[a]', '\\[a\\]'],
        ]) assert.equal(sanitize(el[0]), el[1]);
    });

    it('Should autotrim passed strings', () => {
        assert.equal(sanitize('   hello world   '), 'hello world');
    });

    it('Should autotrim passed strings and escape special characters', () => {
        for (const el of [
            ['  Av. P)', 'Av\\. P\\)'],
            ['Suc contry(garza sada  ', 'Suc contry\\(garza sada'],
            [' contact@valkyriestudios.be ', 'contact@valkyriestudios\\.be'],
            ['*alond   ', '\\*alond'],
            ['  [a   ', '\\[a'],
            ['[a]   ', '\\[a\\]'],
        ]) assert.equal(sanitize(el[0]), el[1]);
    });
});
