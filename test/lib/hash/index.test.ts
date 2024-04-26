'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibHash     from '../../../lib/hash';
import fnv1A            from '../../../lib/hash/fnv1A';
import guid             from '../../../lib/hash/guid';

describe('Hash- *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibHash, {
            fnv1A,
            guid,
        });
    });
});
