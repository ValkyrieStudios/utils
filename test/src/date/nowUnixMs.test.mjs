'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import nowUnixMs        from '../../../src/date/nowUnixMs.mjs';

describe('Date - nowUnixMs', () => {
    it('Returns unix timestamp in milliseconds', () => {
        assert.equal(nowUnixMs(), Math.floor(Date.now()));
    });
});
