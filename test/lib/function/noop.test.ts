'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import noop             from '../../../lib/function/noop';

describe('Function - noop', () => {
    it('Return nothing', () => {
        assert.equal(noop(), undefined);
    });

    it('Not throw an error', () => {
        assert.doesNotThrow(() => noop());
    });
});
