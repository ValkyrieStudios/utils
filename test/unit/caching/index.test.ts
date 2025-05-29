import {describe, it, expect} from 'vitest';
import * as LibCaching from '../../../lib/caching';
import memoize from '../../../lib/caching/memoize';
import LRU from '../../../lib/caching/LRU';

describe('Caching - *', () => {
    it('Should be a correct export', () => {
        expect(LibCaching.memoize).toEqual(memoize);
        expect(LibCaching.LRU).toEqual(LRU);
        expect(LibCaching.LRUCache).toEqual(LRU);
    });
});
