'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibDate     from '../../../lib/date';
import is               from '../../../lib/date/is';
import addUTC           from '../../../lib/date/addUTC';
import diff             from '../../../lib/date/diff';
import endOfUTC         from '../../../lib/date/endOfUTC';
import format           from '../../../lib/date/format';
import nowUnix          from '../../../lib/date/nowUnix';
import nowUnixMs        from '../../../lib/date/nowUnixMs';
import startOfUTC       from '../../../lib/date/startOfUTC';
import toUnix           from '../../../lib/date/toUnix';
import toUTC            from '../../../lib/date/toUTC';

describe('Date - *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibDate, {
            isDate: is,
            is,
            addUTC,
            diff,
            endOfUTC,
            format,
            nowUnix,
            nowUnixMs,
            startOfUTC,
            toUnix,
            toUTC,
        });
    });
});
