/* eslint-disable max-len */
import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import addUTC from '../../../lib/date/addUTC';

describe('Date - addUTC', () => {
    it('Throw when passed a non-date for var', () => {
        for (const el of [false, true, null, {hello: 'world'}]) {
            expect(
                () => addUTC(el as unknown as Date, 10, 'day')
            ).toThrowError(/addUTC requires a date object/);
        }
    });

    it('Throw when passed a non-integer amount', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            if (el === undefined) continue;

            expect(
                () => addUTC(new Date(), el, 'day')
            ).toThrowError(/Amount needs to be an integer/);
        }
    });

    it('Should return original date in utc when passed a non-string key', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            if (el === undefined) continue;
            expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60, el)).toEqual(new Date('2022-10-05T11:12:11.000Z'));
        }
    });

    it('Should return original date in utc when passed a non-recognized key', () => {
        /* @ts-ignore */
        expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60, 'jedis')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
    });

    it('Should return original date in utc when passed no amt or key', () => {
        expect(addUTC(new Date('2022-10-05T13:12:11+02:00'))).toEqual(new Date('2022-10-05T11:12:11.000Z'));
    });

    describe('dateObject', () => {
        describe('year', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'year')).toEqual(new Date('2032-10-05T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'year')).toEqual(new Date('2012-10-05T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'year')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -100, 'year')).toEqual(new Date('1922-10-05T11:12:11.000Z'));
            });
        });

        describe('years', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'years')).toEqual(new Date('2032-10-05T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'years')).toEqual(new Date('2012-10-05T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'years')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -100, 'years')).toEqual(new Date('1922-10-05T11:12:11.000Z'));
            });
        });

        describe('month', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'month')).toEqual(new Date('2023-08-05T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'month')).toEqual(new Date('2021-12-05T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'month')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -8970, 'month')).toEqual(new Date('1275-04-05T11:12:11.000Z'));
            });
        });

        describe('months', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'months')).toEqual(new Date('2023-08-05T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'months')).toEqual(new Date('2021-12-05T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'months')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -4832, 'months')).toEqual(new Date('1620-02-05T11:12:11.000Z'));
            });
        });

        describe('day', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'day')).toEqual(new Date('2022-10-15T11:12:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 200, 'day')).toEqual(new Date('2023-04-23T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'day')).toEqual(new Date('2022-09-25T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -400, 'day')).toEqual(new Date('2021-08-31T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'day')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -89700, 'day')).toEqual(new Date('1777-03-03T11:12:11.000Z'));
            });
        });

        describe('days', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'days')).toEqual(new Date('2022-10-15T11:12:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 200, 'days')).toEqual(new Date('2023-04-23T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'days')).toEqual(new Date('2022-09-25T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -400, 'days')).toEqual(new Date('2021-08-31T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'days')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -48320, 'days')).toEqual(new Date('1890-06-19T11:12:11.000Z'));
            });
        });

        describe('hour', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'hour')).toEqual(new Date('2022-10-05T21:12:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 2200, 'hour')).toEqual(new Date('2023-01-05T03:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'hour')).toEqual(new Date('2022-10-05T01:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -8400, 'hour')).toEqual(new Date('2021-10-20T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'hour')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -897000, 'hour')).toEqual(new Date('1920-06-07T11:12:11.000Z'));
            });
        });

        describe('hours', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'hours')).toEqual(new Date('2022-10-05T21:12:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 2200, 'hours')).toEqual(new Date('2023-01-05T03:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'hours')).toEqual(new Date('2022-10-05T01:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -8400, 'hours')).toEqual(new Date('2021-10-20T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'hours')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -483200, 'hours')).toEqual(new Date('1967-08-22T03:12:11.000Z'));
            });
        });

        describe('minute', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'minute')).toEqual(new Date('2022-10-05T11:22:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 59, 'minute')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873, 'minute')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053, 'minute')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000, 'minute')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'minute')).toEqual(new Date('2022-10-05T11:02:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -34, 'minute')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -769, 'minute')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923, 'minute')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005, 'minute')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'minute')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000, 'minute')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });

        describe('minutes', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'minutes')).toEqual(new Date('2022-10-05T11:22:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 59, 'minutes')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873, 'minutes')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053, 'minutes')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000, 'minutes')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'minutes')).toEqual(new Date('2022-10-05T11:02:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -34, 'minutes')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -769, 'minutes')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923, 'minutes')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005, 'minutes')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'minutes')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000, 'minutes')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });

        describe('second', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'second')).toEqual(new Date('2022-10-05T11:12:21.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next minute', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 59, 'second')).toEqual(new Date('2022-10-05T11:13:10.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 59 * 60, 'second')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873 * 60, 'second')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053 * 60, 'second')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000 * 60, 'second')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'second')).toEqual(new Date('2022-10-05T11:12:01.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60, 'second')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60, 'second')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -769 * 60, 'second')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923 * 60, 'second')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005 * 60, 'second')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'second')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60, 'second')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });

        describe('seconds', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'seconds')).toEqual(new Date('2022-10-05T11:12:21.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next minute', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 59, 'seconds')).toEqual(new Date('2022-10-05T11:13:10.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 59 * 60, 'seconds')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873 * 60, 'seconds')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053 * 60, 'seconds')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000 * 60, 'seconds')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'seconds')).toEqual(new Date('2022-10-05T11:12:01.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60, 'seconds')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60, 'seconds')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -769 * 60, 'seconds')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923 * 60, 'seconds')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005 * 60, 'seconds')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'seconds')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60, 'seconds')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });

        describe('millisecond', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'millisecond')).toEqual(new Date('2022-10-05T11:12:11.010Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next minute', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 59000, 'millisecond')).toEqual(new Date('2022-10-05T11:13:10.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 59 * 60000, 'millisecond')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873 * 60000, 'millisecond')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053 * 60000, 'millisecond')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000 * 60000, 'millisecond')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'millisecond')).toEqual(new Date('2022-10-05T11:12:10.990Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60000, 'millisecond')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60000, 'millisecond')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -769 * 60000, 'millisecond')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923 * 60000, 'millisecond')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005 * 60000, 'millisecond')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'millisecond')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60000, 'millisecond')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });

        describe('milliseconds', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 10, 'milliseconds')).toEqual(new Date('2022-10-05T11:12:11.010Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next minute', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 59000, 'milliseconds')).toEqual(new Date('2022-10-05T11:13:10.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 59 * 60000, 'milliseconds')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 2873 * 60000, 'milliseconds')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 92053 * 60000, 'milliseconds')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 336000 * 60000, 'milliseconds')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -10, 'milliseconds')).toEqual(new Date('2022-10-05T11:12:10.990Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60000, 'milliseconds')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -34 * 60000, 'milliseconds')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -769 * 60000, 'milliseconds')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -14923 * 60000, 'milliseconds')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -414005 * 60000, 'milliseconds')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), 0, 'milliseconds')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC(new Date('2022-10-05T13:12:11+02:00'), -38970000 * 60000, 'milliseconds')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });
    });

    describe('dateString', () => {
        describe('year', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'year')).toEqual(new Date('2032-10-05T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'year')).toEqual(new Date('2012-10-05T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'year')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -100, 'year')).toEqual(new Date('1922-10-05T11:12:11.000Z'));
            });
        });

        describe('years', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'years')).toEqual(new Date('2032-10-05T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'years')).toEqual(new Date('2012-10-05T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'years')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -100, 'years')).toEqual(new Date('1922-10-05T11:12:11.000Z'));
            });
        });

        describe('month', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'month')).toEqual(new Date('2023-08-05T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'month')).toEqual(new Date('2021-12-05T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'month')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -8970, 'month')).toEqual(new Date('1275-04-05T11:12:11.000Z'));
            });
        });

        describe('months', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'months')).toEqual(new Date('2023-08-05T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'months')).toEqual(new Date('2021-12-05T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'months')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -4832, 'months')).toEqual(new Date('1620-02-05T11:12:11.000Z'));
            });
        });

        describe('day', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'day')).toEqual(new Date('2022-10-15T11:12:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 200, 'day')).toEqual(new Date('2023-04-23T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'day')).toEqual(new Date('2022-09-25T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -400, 'day')).toEqual(new Date('2021-08-31T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'day')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -89700, 'day')).toEqual(new Date('1777-03-03T11:12:11.000Z'));
            });
        });

        describe('days', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'days')).toEqual(new Date('2022-10-15T11:12:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 200, 'days')).toEqual(new Date('2023-04-23T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'days')).toEqual(new Date('2022-09-25T11:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -400, 'days')).toEqual(new Date('2021-08-31T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'days')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -48320, 'days')).toEqual(new Date('1890-06-19T11:12:11.000Z'));
            });
        });

        describe('hour', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'hour')).toEqual(new Date('2022-10-05T21:12:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 2200, 'hour')).toEqual(new Date('2023-01-05T03:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'hour')).toEqual(new Date('2022-10-05T01:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -8400, 'hour')).toEqual(new Date('2021-10-20T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'hour')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -897000, 'hour')).toEqual(new Date('1920-06-07T11:12:11.000Z'));
            });
        });

        describe('hours', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'hours')).toEqual(new Date('2022-10-05T21:12:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 2200, 'hours')).toEqual(new Date('2023-01-05T03:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'hours')).toEqual(new Date('2022-10-05T01:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -8400, 'hours')).toEqual(new Date('2021-10-20T11:12:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'hours')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -483200, 'hours')).toEqual(new Date('1967-08-22T03:12:11.000Z'));
            });
        });

        describe('minute', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'minute')).toEqual(new Date('2022-10-05T11:22:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 59, 'minute')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 2873, 'minute')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 92053, 'minute')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 336000, 'minute')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'minute')).toEqual(new Date('2022-10-05T11:02:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -34, 'minute')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -769, 'minute')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -14923, 'minute')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -414005, 'minute')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'minute')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -38970000, 'minute')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });

        describe('minutes', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'minutes')).toEqual(new Date('2022-10-05T11:22:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 59, 'minutes')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 2873, 'minutes')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 92053, 'minutes')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 336000, 'minutes')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'minutes')).toEqual(new Date('2022-10-05T11:02:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -34, 'minutes')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -769, 'minutes')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -14923, 'minutes')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -414005, 'minutes')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'minutes')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -38970000, 'minutes')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });

        describe('second', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'second')).toEqual(new Date('2022-10-05T11:12:21.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next minute', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 59, 'second')).toEqual(new Date('2022-10-05T11:13:10.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 59 * 60, 'second')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 2873 * 60, 'second')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 92053 * 60, 'second')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 336000 * 60, 'second')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'second')).toEqual(new Date('2022-10-05T11:12:01.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -34 * 60, 'second')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -34 * 60, 'second')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -769 * 60, 'second')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -14923 * 60, 'second')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -414005 * 60, 'second')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'second')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -38970000 * 60, 'second')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });

        describe('seconds', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'seconds')).toEqual(new Date('2022-10-05T11:12:21.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next minute', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 59, 'seconds')).toEqual(new Date('2022-10-05T11:13:10.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 59 * 60, 'seconds')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 2873 * 60, 'seconds')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 92053 * 60, 'seconds')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 336000 * 60, 'seconds')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'seconds')).toEqual(new Date('2022-10-05T11:12:01.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -34 * 60, 'seconds')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -34 * 60, 'seconds')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -769 * 60, 'seconds')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -14923 * 60, 'seconds')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -414005 * 60, 'seconds')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'seconds')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -38970000 * 60, 'seconds')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });

        describe('millisecond', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'millisecond')).toEqual(new Date('2022-10-05T11:12:11.010Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next minute', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 59000, 'millisecond')).toEqual(new Date('2022-10-05T11:13:10.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 59 * 60000, 'millisecond')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 2873 * 60000, 'millisecond')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 92053 * 60000, 'millisecond')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 336000 * 60000, 'millisecond')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'millisecond')).toEqual(new Date('2022-10-05T11:12:10.990Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -34 * 60000, 'millisecond')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -34 * 60000, 'millisecond')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -769 * 60000, 'millisecond')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -14923 * 60000, 'millisecond')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -414005 * 60000, 'millisecond')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'millisecond')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -38970000 * 60000, 'millisecond')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });

        describe('milliseconds', () => {
            it('Should correctly add when passing a positive integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 10, 'milliseconds')).toEqual(new Date('2022-10-05T11:12:11.010Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next minute', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 59000, 'milliseconds')).toEqual(new Date('2022-10-05T11:13:10.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 59 * 60000, 'milliseconds')).toEqual(new Date('2022-10-05T12:11:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 2873 * 60000, 'milliseconds')).toEqual(new Date('2022-10-07T11:05:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 92053 * 60000, 'milliseconds')).toEqual(new Date('2022-12-08T09:25:11.000Z'));
            });

            it('Should correctly add when passing a positive integer and it would go into next year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 336000 * 60000, 'milliseconds')).toEqual(new Date('2023-05-26T19:12:11.000Z'));
            });

            it('Should correctly add when passing a negative integer', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -10, 'milliseconds')).toEqual(new Date('2022-10-05T11:12:10.990Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous minute', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -34 * 60000, 'milliseconds')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous hour', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -34 * 60000, 'milliseconds')).toEqual(new Date('2022-10-05T10:38:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous day', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -769 * 60000, 'milliseconds')).toEqual(new Date('2022-10-04T22:23:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous month', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -14923 * 60000, 'milliseconds')).toEqual(new Date('2022-09-25T02:29:11.000Z'));
            });

            it('Should correctly add when passing a negative integer and it would go into previous year', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -414005 * 60000, 'milliseconds')).toEqual(new Date('2021-12-21T23:07:11.000Z'));
            });

            it('Should correctly keep and just convert to utc when passing 0', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', 0, 'milliseconds')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
            });

            it('Should correctly set when going before the unix timestamp', () => {
                expect(addUTC('2022-10-05T13:12:11+02:00', -38970000 * 60000, 'milliseconds')).toEqual(new Date('1948-08-31T23:12:11.000Z'));
            });
        });
    });
});
