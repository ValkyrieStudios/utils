'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import nowUnix          from '../../../lib/date/nowUnix.mjs';

describe('Date - nowUnix', () => {
    it('Returns unix timestamp in seconds', () => {
        assert.equal(nowUnix(), Math.floor(Date.now()/1000));
    });
});
