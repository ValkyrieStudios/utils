'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import nowUnix          from '../../../lib/date/nowUnix';

describe('Date - nowUnix', () => {
    it('Returns unix timestamp in seconds', () => {
        assert.equal(nowUnix(), Math.floor(Date.now()/1000));
    });
});
