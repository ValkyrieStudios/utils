'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import noopreturn       from '../../../src/function/noopreturn.js';

describe('Function - noopreturn', () => {
    it('Return undefined when called without values', () => {
        assert.equal(noopreturn(), undefined);
    });

    it('Return the passed value', () => {
        assert.equal(noopreturn(45), 45);
    });

    it('Not throw an error', () => {
        assert.doesNotThrow(() => noopreturn());
    });
});
