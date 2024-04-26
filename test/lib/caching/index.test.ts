'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibCaching  from '../../../lib/caching';
import memoize          from '../../../lib/caching/memoize';

describe('Caching - *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibCaching, {memoize});
    });
});
