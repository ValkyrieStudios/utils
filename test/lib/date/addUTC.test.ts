import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import addUTC           from '../../../lib/date/addUTC';

describe('Date - addUTC', () => {
    it('Throw when passed a non-date for var', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            assert.throws(
                () => addUTC(el, 10, 'day'),
                new TypeError('addUTC requires a date object')
            );
        }
    });

    it('Throw when passed a non-integer amount', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            if (el === undefined) continue;

            assert.throws(
                () => addUTC(new Date(), el, 'day'),
                new TypeError('Amount needs to be an integer')
            );
        }
    });

    it('Should return original date in utc when passed a non-string key', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            if (el === undefined) continue;
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60, el),
                new Date('2022-10-05T11:12:11.000Z')
            );
        }
    });

    it('Should return original date in utc when passed a non-recognized key', () => {
        assert.deepEqual(
            /* @ts-ignore */
            addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60, 'jedis'),
            new Date('2022-10-05T11:12:11.000Z')
        );
    });

    it('Should return original date in utc when passed no amt or key', () => {
        assert.deepEqual(
            addUTC(new Date('2022-10-05T13:12:11+02:00')),
            new Date('2022-10-05T11:12:11.000Z')
        );
    });

    describe('year', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'year'),
                new Date('2032-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'year'),
                new Date('2012-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'year'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -100, 'year'),
                new Date('1922-10-05T11:12:11.000Z')
            );
        });
    });

    describe('years', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'years'),
                new Date('2032-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'years'),
                new Date('2012-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'years'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -100, 'years'),
                new Date('1922-10-05T11:12:11.000Z')
            );
        });
    });

    describe('month', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'month'),
                new Date('2023-08-05T11:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'month'),
                new Date('2021-12-05T11:12:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'month'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -8970, 'month'),
                new Date('1275-04-05T11:12:11.000Z')
            );
        });
    });

    describe('months', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'months'),
                new Date('2023-08-05T11:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'months'),
                new Date('2021-12-05T11:12:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'months'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -4832, 'months'),
                new Date('1620-02-05T11:12:11.000Z')
            );
        });
    });

    describe('day', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'day'),
                new Date('2022-10-15T11:12:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 200, 'day'),
                new Date('2023-04-23T11:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'day'),
                new Date('2022-09-25T11:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -400, 'day'),
                new Date('2021-08-31T11:12:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'day'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -89700, 'day'),
                new Date('1777-03-03T11:12:11.000Z')
            );
        });
    });

    describe('days', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'days'),
                new Date('2022-10-15T11:12:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 200, 'days'),
                new Date('2023-04-23T11:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'days'),
                new Date('2022-09-25T11:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -400, 'days'),
                new Date('2021-08-31T11:12:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'days'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -48320, 'days'),
                new Date('1890-06-19T11:12:11.000Z')
            );
        });
    });

    describe('hour', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'hour'),
                new Date('2022-10-05T21:12:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 2200, 'hour'),
                new Date('2023-01-05T03:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'hour'),
                new Date('2022-10-05T01:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -8400, 'hour'),
                new Date('2021-10-20T11:12:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'hour'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -897000, 'hour'),
                new Date('1920-06-07T11:12:11.000Z')
            );
        });
    });

    describe('hours', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'hours'),
                new Date('2022-10-05T21:12:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 2200, 'hours'),
                new Date('2023-01-05T03:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'hours'),
                new Date('2022-10-05T01:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -8400, 'hours'),
                new Date('2021-10-20T11:12:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'hours'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -483200, 'hours'),
                new Date('1967-08-22T03:12:11.000Z')
            );
        });
    });

    describe('minute', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'minute'),
                new Date('2022-10-05T11:22:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 59, 'minute'),
                new Date('2022-10-05T12:11:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873, 'minute'),
                new Date('2022-10-07T11:05:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053, 'minute'),
                new Date('2022-12-08T09:25:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000, 'minute'),
                new Date('2023-05-26T19:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'minute'),
                new Date('2022-10-05T11:02:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -34, 'minute'),
                new Date('2022-10-05T10:38:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -769, 'minute'),
                new Date('2022-10-04T22:23:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923, 'minute'),
                new Date('2022-09-25T02:29:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005, 'minute'),
                new Date('2021-12-21T23:07:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'minute'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000, 'minute'),
                new Date('1948-08-31T23:12:11.000Z')
            );
        });
    });

    describe('minutes', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'minutes'),
                new Date('2022-10-05T11:22:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 59, 'minutes'),
                new Date('2022-10-05T12:11:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873, 'minutes'),
                new Date('2022-10-07T11:05:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053, 'minutes'),
                new Date('2022-12-08T09:25:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000, 'minutes'),
                new Date('2023-05-26T19:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'minutes'),
                new Date('2022-10-05T11:02:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -34, 'minutes'),
                new Date('2022-10-05T10:38:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -769, 'minutes'),
                new Date('2022-10-04T22:23:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923, 'minutes'),
                new Date('2022-09-25T02:29:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005, 'minutes'),
                new Date('2021-12-21T23:07:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'minutes'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000, 'minutes'),
                new Date('1948-08-31T23:12:11.000Z')
            );
        });
    });

    describe('second', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'second'),
                new Date('2022-10-05T11:12:21.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next minute', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 59, 'second'),
                new Date('2022-10-05T11:13:10.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 59 * 60, 'second'),
                new Date('2022-10-05T12:11:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873 * 60, 'second'),
                new Date('2022-10-07T11:05:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053 * 60, 'second'),
                new Date('2022-12-08T09:25:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000 * 60, 'second'),
                new Date('2023-05-26T19:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'second'),
                new Date('2022-10-05T11:12:01.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60, 'second'),
                new Date('2022-10-05T10:38:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60, 'second'),
                new Date('2022-10-05T10:38:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -769 * 60, 'second'),
                new Date('2022-10-04T22:23:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923 * 60, 'second'),
                new Date('2022-09-25T02:29:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005 * 60, 'second'),
                new Date('2021-12-21T23:07:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'second'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60, 'second'),
                new Date('1948-08-31T23:12:11.000Z')
            );
        });
    });

    describe('seconds', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'seconds'),
                new Date('2022-10-05T11:12:21.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next minute', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 59, 'seconds'),
                new Date('2022-10-05T11:13:10.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 59 * 60, 'seconds'),
                new Date('2022-10-05T12:11:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873 * 60, 'seconds'),
                new Date('2022-10-07T11:05:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053 * 60, 'seconds'),
                new Date('2022-12-08T09:25:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000 * 60, 'seconds'),
                new Date('2023-05-26T19:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'seconds'),
                new Date('2022-10-05T11:12:01.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60, 'seconds'),
                new Date('2022-10-05T10:38:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60, 'seconds'),
                new Date('2022-10-05T10:38:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -769 * 60, 'seconds'),
                new Date('2022-10-04T22:23:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923 * 60, 'seconds'),
                new Date('2022-09-25T02:29:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005 * 60, 'seconds'),
                new Date('2021-12-21T23:07:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'seconds'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60, 'seconds'),
                new Date('1948-08-31T23:12:11.000Z')
            );
        });
    });

    describe('millisecond', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'millisecond'),
                new Date('2022-10-05T11:12:11.010Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next minute', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 59000, 'millisecond'),
                new Date('2022-10-05T11:13:10.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 59 * 60000, 'millisecond'),
                new Date('2022-10-05T12:11:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873 * 60000, 'millisecond'),
                new Date('2022-10-07T11:05:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053 * 60000, 'millisecond'),
                new Date('2022-12-08T09:25:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000 * 60000, 'millisecond'),
                new Date('2023-05-26T19:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'millisecond'),
                new Date('2022-10-05T11:12:10.990Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60000, 'millisecond'),
                new Date('2022-10-05T10:38:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60000, 'millisecond'),
                new Date('2022-10-05T10:38:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -769 * 60000, 'millisecond'),
                new Date('2022-10-04T22:23:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923 * 60000, 'millisecond'),
                new Date('2022-09-25T02:29:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005 * 60000, 'millisecond'),
                new Date('2021-12-21T23:07:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'millisecond'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60000, 'millisecond'),
                new Date('1948-08-31T23:12:11.000Z')
            );
        });
    });

    describe('milliseconds', () => {
        it('Should correctly add when passing a positive integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'milliseconds'),
                new Date('2022-10-05T11:12:11.010Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next minute', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 59000, 'milliseconds'),
                new Date('2022-10-05T11:13:10.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 59 * 60000, 'milliseconds'),
                new Date('2022-10-05T12:11:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873 * 60000, 'milliseconds'),
                new Date('2022-10-07T11:05:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053 * 60000, 'milliseconds'),
                new Date('2022-12-08T09:25:11.000Z')
            );
        });

        it('Should correctly add when passing a positive integer and it would go into next year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000 * 60000, 'milliseconds'),
                new Date('2023-05-26T19:12:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'milliseconds'),
                new Date('2022-10-05T11:12:10.990Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60000, 'milliseconds'),
                new Date('2022-10-05T10:38:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60000, 'milliseconds'),
                new Date('2022-10-05T10:38:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous day', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -769 * 60000, 'milliseconds'),
                new Date('2022-10-04T22:23:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous month', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923 * 60000, 'milliseconds'),
                new Date('2022-09-25T02:29:11.000Z')
            );
        });

        it('Should correctly add when passing a negative integer and it would go into previous year', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005 * 60000, 'milliseconds'),
                new Date('2021-12-21T23:07:11.000Z')
            );
        });

        it('Should correctly keep and just convert to utc when passing 0', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'milliseconds'),
                new Date('2022-10-05T11:12:11.000Z')
            );
        });

        it('Should correctly set when going before the unix timestamp', () => {
            assert.deepEqual(
                addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60000, 'milliseconds'),
                new Date('1948-08-31T23:12:11.000Z')
            );
        });
    });
});
