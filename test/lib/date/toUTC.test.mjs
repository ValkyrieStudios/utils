'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import toUTC            from '../../../lib/date/toUTC.mjs';

describe('Date - toUTC', () => {
    it('Throw when passed a non-date for var', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            assert.throws(
                () => toUTC(el, 10, 'day'),
                new TypeError('toUTC requires a date object')
            );
        }
    });

    it('Return a date in UTC', () => {
        const date = new Date('2023-05-01T12:04:27+02:00');
        assert.deepEqual(toUTC(date), new Date('2023-05-01T10:04:27+00:00'));
        assert.deepEqual(toUTC(date).toISOString(), '2023-05-01T10:04:27.000Z');
        assert.deepEqual(date.toJSON(), '2023-05-01T10:04:27.000Z');
    });

    it('Not touch on the passed date', () => {
        const date = new Date('14 Jun 2017 00:00:00 PDT');
        const utc_date = toUTC(date);
        assert.deepEqual(utc_date.toJSON(), '2017-06-14T07:00:00.000Z');

        date.setHours(20);
        assert.deepEqual(date.toJSON(), '2017-06-14T18:00:00.000Z');
        assert.deepEqual(utc_date.toJSON(), '2017-06-14T07:00:00.000Z');
    });
});
