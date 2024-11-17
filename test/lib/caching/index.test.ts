import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibCaching  from '../../../lib/caching';
import memoize          from '../../../lib/caching/memoize';
import LRU              from '../../../lib/caching/LRU';

describe('Caching - *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibCaching, {memoize, LRU, LRUCache: LRU});
    });
});
