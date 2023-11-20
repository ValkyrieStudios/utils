'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.js';
import startOfUTC       from '../../../src/date/startOfUTC.js';

describe('Date - startOfUTC', () => {
    it('Throw when passed a non-date for var', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            assert.throws(
                () => startOfUTC(el, 10, 'day'),
                new TypeError('startOfUTC requires a date object')
            );
        }
    });

    it('Throw when passed a non-string for key', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            assert.throws(
                () => startOfUTC(new Date(), el),
                new TypeError('Key needs to be a string with content')
            );
        }
    });

    it('Should return original date in utc when passed a non-recognized key', () => {
        assert.deepEqual(startOfUTC(new Date('2022-10-05T13:12:11+02:00'), 'jedis'), new Date('2022-10-05T11:12:11.000Z'));
    });

    describe('year', () => {
        it('Should correctly set to start of year utc', () => {
            assert.deepEqual(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'year'), new Date('2023-01-01T00:00:00.000Z'));
        });
    });

    describe('quarter', () => {
        it('Should correctly set to start of quarter utc', () => {
            const qmap = {1: 1, 2: 1, 3: 1, 4: 4, 5: 4, 6: 4, 7: 7, 8: 7, 9: 7, 10: 10, 11: 10, 12: 10};
            for (let i = 1; i <= 12; i++) {
                let date = `2023-${i < 10 ? '0' : ''}${i}-04T12:04:27+02:00`;
                let date_q = `2023-${qmap[i] < 10 ? '0' : ''}${qmap[i]}-01T00:00:00.000Z`;
                assert.deepEqual(startOfUTC(new Date(date), 'quarter'), new Date(date_q));
            }
        });
    });

    describe('month', () => {
        it('Should correctly set to start of month utc', () => {
            assert.deepEqual(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'month'), new Date('2023-05-01T00:00:00.000Z'));
        });
    });

    describe('week', () => {
        it('Should correctly set to start of week utc with monday as first day of the week', () => {
            assert.deepEqual(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week'), new Date('2023-05-01T00:00:00.000Z'));
            assert.deepEqual(startOfUTC(new Date('2023-05-14T12:04:27+02:00'), 'week'), new Date('2023-05-08T00:00:00.000Z'));
        });

        it('Should correctly set to start of week utc with monday as first day of the week when already on that day', () => {
            assert.deepEqual(startOfUTC(new Date('2023-05-08T12:04:27+02:00'), 'week'), new Date('2023-05-08T00:00:00.000Z'));
        });

        it('Should correctly set to start of week utc with monday as first day of the week when start of week is in different month', () => {
            assert.deepEqual(startOfUTC(new Date('2023-02-03T12:04:27+02:00'), 'week'), new Date('2023-01-30T00:00:00.000Z'));
        });

        it('Should correctly set to start of week utc with monday as first day of the week when start of week is in different year', () => {
            assert.deepEqual(startOfUTC(new Date('2023-01-01T12:04:27+02:00'), 'week'), new Date('2022-12-26T00:00:00.000Z'));
        });
    });

    describe('week_sun', () => {
        it('Should correctly set to start of week utc with sunday as first day of the week', () => {
            assert.deepEqual(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_sun'), new Date('2023-04-30T00:00:00.000Z'));
            assert.deepEqual(startOfUTC(new Date('2023-05-13T12:04:27+02:00'), 'week_sun'), new Date('2023-05-07T00:00:00.000Z'));
        });

        it('Should correctly set to start of week utc with sunday as first day of the week when already on that day', () => {
            assert.deepEqual(startOfUTC(new Date('2023-05-07T12:04:27+02:00'), 'week_sun'), new Date('2023-05-07T00:00:00.000Z'));
        });

        it('Should correctly set to start of week utc with sunday as first day of the week when start of week is in different month', () => {
            assert.deepEqual(startOfUTC(new Date('2023-02-03T12:04:27+02:00'), 'week_sun'), new Date('2023-01-29T00:00:00.000Z'));
        });

        it('Should correctly set to start of week utc with sunday as first day of the week when start of week is in different year', () => {
            assert.deepEqual(startOfUTC(new Date('2022-01-01T12:04:27+02:00'), 'week_sun'), new Date('2021-12-26T00:00:00.000Z'));
        });
    });

    describe('day', () => {
        it('Should correctly set to start of day utc', () => {
            assert.deepEqual(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'day'), new Date('2023-05-04T00:00:00.000Z'));
        });
    });

    describe('hour', () => {
        it('Should correctly set to start of hour utc', () => {
            assert.deepEqual(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'hour'), new Date('2023-05-04T10:00:00.000Z'));
        });
    });

    describe('minute', () => {
        it('Should correctly set to start of minute utc', () => {
            assert.deepEqual(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'minute'), new Date('2023-05-04T10:04:00.000Z'));
        });
    });

    describe('second', () => {
        it('Should correctly set to start of second utc', () => {
            assert.deepEqual(startOfUTC(new Date('2023-05-04T12:04:27.043+02:00'), 'second'), new Date('2023-05-04T10:04:27.000Z'));
        });
    });
});
