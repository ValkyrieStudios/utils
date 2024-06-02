import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import nowUnixMs        from '../../../lib/date/nowUnixMs';

describe('Date - nowUnixMs', () => {
    it('Returns unix timestamp in milliseconds', () => {
        assert.equal(nowUnixMs(), Math.floor(Date.now()));
    });
});
