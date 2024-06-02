import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import toUnix           from '../../../lib/date/toUnix';

describe('Date - toUnix', () => {
    it('Throw when passed a non-date for var', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            assert.throws(
                () => toUnix(el),
                new TypeError('toUnix requires a date object')
            );
        }
    });

    it('Return a date in unix as seconds', () => {
        const date = new Date('2023-05-01T12:04:27+02:00');
        assert.equal(toUnix(date), 1682935467);

        const date2 = new Date('2023-05-01T10:04:27.000Z');
        assert.equal(toUnix(date2), 1682935467);
    });

    it('Not touch on the passed date', () => {
        const date = new Date('14 Jun 2017 00:00:00 PDT');
        assert.equal(toUnix(date), 1497423600);

        date.setHours(20);
        assert.equal(toUnix(date), 1497463200);
        assert.equal(date.toJSON(), '2017-06-14T18:00:00.000Z');
    });
});
