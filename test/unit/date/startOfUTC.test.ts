import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import startOfUTC from '../../../lib/date/startOfUTC';

describe('Date - startOfUTC', () => {
    it('Throw when passed a non-date for var', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            expect(
                () => startOfUTC(el, 'day')
            ).toThrowError(/startOfUTC requires a date object/);
        }
    });

    it('Should return original date in utc when passed a non-string key', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            expect(startOfUTC(new Date('2022-10-05T13:12:11+02:00'), el)).toEqual(new Date('2022-10-05T11:12:11.000Z'));
        }
    });

    it('Should return original date in utc when passed a non-recognized key', () => {
        /* @ts-ignore */
        expect(startOfUTC(new Date('2022-10-05T13:12:11+02:00'), 'jedis')).toEqual(new Date('2022-10-05T11:12:11.000Z'));
    });

    it('Should return original date in utc when not passed a key', () => {
        expect(startOfUTC(new Date('2022-10-05T13:12:11+02:00'))).toEqual(new Date('2022-10-05T11:12:11.000Z'));
    });

    describe('dateObject', () => {
        describe('year', () => {
            it('Set to start of year utc', () => {
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'year')).toEqual(new Date('2023-01-01T00:00:00.000Z'));
            });
        });

        describe('quarter', () => {
            it('Set to start of quarter utc', () => {
                const qmap = {1: 1, 2: 1, 3: 1, 4: 4, 5: 4, 6: 4, 7: 7, 8: 7, 9: 7, 10: 10, 11: 10, 12: 10};
                for (let i = 1; i <= 12; i++) {
                    const date = `2023-${i < 10 ? '0' : ''}${i}-04T12:04:27+02:00`;
                    const date_q = `2023-${qmap[i] < 10 ? '0' : ''}${qmap[i]}-01T00:00:00.000Z`;
                    expect(startOfUTC(new Date(date), 'quarter')).toEqual(new Date(date_q));
                }
            });
        });

        describe('month', () => {
            it('Set to start of month utc', () => {
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'month')).toEqual(new Date('2023-05-01T00:00:00.000Z'));
            });
        });

        describe('week', () => {
            it('Set to start of week utc with monday as first day of week', () => {
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week')).toEqual(new Date('2023-05-01T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-14T12:04:27+02:00'), 'week')).toEqual(new Date('2023-05-08T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when already on that day', () => {
                expect(startOfUTC(new Date('2023-05-08T12:04:27+02:00'), 'week')).toEqual(new Date('2023-05-08T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when start of week is in different month', () => {
                expect(startOfUTC(new Date('2023-02-03T12:04:27+02:00'), 'week')).toEqual(new Date('2023-01-30T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when start of week is in different year', () => {
                expect(startOfUTC(new Date('2023-01-01T12:04:27+02:00'), 'week')).toEqual(new Date('2022-12-26T00:00:00.000Z'));
            });
        });

        describe('week_sun', () => {
            it('Set to start of week utc with sunday as first day of week', () => {
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_sun')).toEqual(new Date('2023-04-30T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-13T12:04:27+02:00'), 'week_sun')).toEqual(new Date('2023-05-07T00:00:00.000Z'));
            });

            it('Set to start of week utc with sunday as first day of week when already on that day', () => {
                expect(startOfUTC(new Date('2023-05-07T12:04:27+02:00'), 'week_sun')).toEqual(new Date('2023-05-07T00:00:00.000Z'));
            });

            it('Set to start of week utc with sunday as first day of week when start of week is in different month', () => {
                expect(startOfUTC(new Date('2023-02-03T12:04:27+02:00'), 'week_sun')).toEqual(new Date('2023-01-29T00:00:00.000Z'));
            });

            it('Set to start of week utc with sunday as first day of week when start of week is in different year', () => {
                expect(startOfUTC(new Date('2022-01-01T12:04:27+02:00'), 'week_sun')).toEqual(new Date('2021-12-26T00:00:00.000Z'));
            });
        });

        describe('week_mon', () => {
            it('Set to start of week utc with monday as first day of week', () => {
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_mon')).toEqual(new Date('2023-05-01T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-14T12:04:27+02:00'), 'week_mon')).toEqual(new Date('2023-05-08T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when already on that day', () => {
                expect(startOfUTC(new Date('2023-05-08T12:04:27+02:00'), 'week_mon')).toEqual(new Date('2023-05-08T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when start of week is in different month', () => {
                expect(startOfUTC(new Date('2023-02-03T12:04:27+02:00'), 'week_mon')).toEqual(new Date('2023-01-30T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when start of week is in different year', () => {
                expect(startOfUTC(new Date('2023-01-01T12:04:27+02:00'), 'week_mon')).toEqual(new Date('2022-12-26T00:00:00.000Z'));
            });
        });

        describe('week_tue', () => {
            it('Set to start of week utc with tuesday as first day of week', () => {
                expect(startOfUTC(new Date('2023-05-01T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2023-04-25T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-02T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-03T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-05T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-06T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-07T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-08T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-22T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2023-05-16T00:00:00.000Z'));
            });

            it('Set to start of week utc with tuesday as first day of week when already on that day', () => {
                expect(startOfUTC(new Date('2023-05-09T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2023-05-09T00:00:00.000Z'));
            });

            it('Set to start of week utc with tuesday as first day of week when start of week is in different month', () => {
                expect(startOfUTC(new Date('2023-02-03T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2023-01-31T00:00:00.000Z'));
            });

            it('Set to start of week utc with tuesday as first day of week when start of week is in different year', () => {
                expect(startOfUTC(new Date('2023-01-01T12:04:27+02:00'), 'week_tue')).toEqual(new Date('2022-12-27T00:00:00.000Z'));
            });
        });

        describe('week_wed', () => {
            it('Set to start of week utc with wednessday as first day of week', () => {
                expect(startOfUTC(new Date('2023-05-01T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2023-04-26T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-02T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2023-04-26T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-03T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-05T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-06T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-07T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-08T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-23T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2023-05-17T00:00:00.000Z'));
            });

            it('Set to start of week utc with wednessday as first day of week when already on that day', () => {
                expect(startOfUTC(new Date('2023-05-10T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2023-05-10T00:00:00.000Z'));
            });

            it('Set to start of week utc with wednessday as first day of week when start of week is in different month', () => {
                expect(startOfUTC(new Date('2023-04-02T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2023-03-29T00:00:00.000Z'));
            });

            it('Set to start of week utc with wednessday as first day of week when start of week is in different year', () => {
                expect(startOfUTC(new Date('2023-01-01T12:04:27+02:00'), 'week_wed')).toEqual(new Date('2022-12-28T00:00:00.000Z'));
            });
        });

        describe('week_thu', () => {
            it('Set to start of week utc with thursday as first day of week', () => {
                expect(startOfUTC(new Date('2023-05-01T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2023-04-27T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-02T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2023-04-27T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-03T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2023-04-27T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-05T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-06T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-07T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-08T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-24T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2023-05-18T00:00:00.000Z'));
            });

            it('Set to start of week utc with thursday as first day of week when already on that day', () => {
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
            });

            it('Set to start of week utc with thursday as first day of week when start of week is in different month', () => {
                expect(startOfUTC(new Date('2023-08-01T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2023-07-27T00:00:00.000Z'));
            });

            it('Set to start of week utc with thursday as first day of week when start of week is in different year', () => {
                expect(startOfUTC(new Date('2023-01-01T12:04:27+02:00'), 'week_thu')).toEqual(new Date('2022-12-29T00:00:00.000Z'));
            });
        });

        describe('week_fri', () => {
            it('Set to start of week utc with friday as first day of week', () => {
                expect(startOfUTC(new Date('2023-05-01T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2023-04-28T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-02T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2023-04-28T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-03T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2023-04-28T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2023-04-28T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-05T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2023-05-05T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-06T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2023-05-05T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-07T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2023-05-05T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-08T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2023-05-05T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-24T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2023-05-19T00:00:00.000Z'));
            });

            it('Set to start of week utc with friday as first day of week when already on that day', () => {
                expect(startOfUTC(new Date('2023-05-05T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2023-05-05T00:00:00.000Z'));
            });

            it('Set to start of week utc with friday as first day of week when start of week is in different month', () => {
                expect(startOfUTC(new Date('2023-04-04T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2023-03-31T00:00:00.000Z'));
            });

            it('Set to start of week utc with friday as first day of week when start of week is in different year', () => {
                expect(startOfUTC(new Date('2023-01-01T12:04:27+02:00'), 'week_fri')).toEqual(new Date('2022-12-30T00:00:00.000Z'));
            });
        });

        describe('week_sat', () => {
            it('Set to start of week utc with saturday as first day of week', () => {
                expect(startOfUTC(new Date('2023-05-01T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2023-04-29T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-02T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2023-04-29T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-03T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2023-04-29T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2023-04-29T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-05T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2023-04-29T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-06T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2023-05-06T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-07T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2023-05-06T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-08T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2023-05-06T00:00:00.000Z'));
                expect(startOfUTC(new Date('2023-05-24T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2023-05-20T00:00:00.000Z'));
            });

            it('Set to start of week utc with saturday as first day of week when already on that day', () => {
                expect(startOfUTC(new Date('2023-05-20T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2023-05-20T00:00:00.000Z'));
            });

            it('Set to start of week utc with saturday as first day of week when start of week is in different month', () => {
                expect(startOfUTC(new Date('2023-02-03T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2023-01-28T00:00:00.000Z'));
            });

            it('Set to start of week utc with saturday as first day of week when start of week is in different year', () => {
                expect(startOfUTC(new Date('2023-01-01T12:04:27+02:00'), 'week_sat')).toEqual(new Date('2022-12-31T00:00:00.000Z'));
            });
        });

        describe('day', () => {
            it('Set to start of day utc', () => {
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'day')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
            });
        });

        describe('hour', () => {
            it('Set to start of hour utc', () => {
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'hour')).toEqual(new Date('2023-05-04T10:00:00.000Z'));
            });
        });

        describe('minute', () => {
            it('Set to start of minute utc', () => {
                expect(startOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'minute')).toEqual(new Date('2023-05-04T10:04:00.000Z'));
            });
        });

        describe('second', () => {
            it('Set to start of second utc', () => {
                expect(startOfUTC(new Date('2023-05-04T12:04:27.043+02:00'), 'second')).toEqual(new Date('2023-05-04T10:04:27.000Z'));
            });
        });
    });

    describe('dateString', () => {
        describe('year', () => {
            it('Set to start of year utc', () => {
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'year')).toEqual(new Date('2023-01-01T00:00:00.000Z'));
            });
        });

        describe('quarter', () => {
            it('Set to start of quarter utc', () => {
                const qmap = {1: 1, 2: 1, 3: 1, 4: 4, 5: 4, 6: 4, 7: 7, 8: 7, 9: 7, 10: 10, 11: 10, 12: 10};
                for (let i = 1; i <= 12; i++) {
                    const date = `2023-${i < 10 ? '0' : ''}${i}-04T12:04:27+02:00`;
                    const date_q = `2023-${qmap[i] < 10 ? '0' : ''}${qmap[i]}-01T00:00:00.000Z`;
                    expect(startOfUTC(date, 'quarter')).toEqual(new Date(date_q));
                }
            });
        });

        describe('month', () => {
            it('Set to start of month utc', () => {
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'month')).toEqual(new Date('2023-05-01T00:00:00.000Z'));
            });
        });

        describe('week', () => {
            it('Set to start of week utc with monday as first day of week', () => {
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'week')).toEqual(new Date('2023-05-01T00:00:00.000Z'));
                expect(startOfUTC('2023-05-14T12:04:27+02:00', 'week')).toEqual(new Date('2023-05-08T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when already on that day', () => {
                expect(startOfUTC('2023-05-08T12:04:27+02:00', 'week')).toEqual(new Date('2023-05-08T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when start of week is in different month', () => {
                expect(startOfUTC('2023-02-03T12:04:27+02:00', 'week')).toEqual(new Date('2023-01-30T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when start of week is in different year', () => {
                expect(startOfUTC('2023-01-01T12:04:27+02:00', 'week')).toEqual(new Date('2022-12-26T00:00:00.000Z'));
            });
        });

        describe('week_sun', () => {
            it('Set to start of week utc with sunday as first day of week', () => {
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'week_sun')).toEqual(new Date('2023-04-30T00:00:00.000Z'));
                expect(startOfUTC('2023-05-13T12:04:27+02:00', 'week_sun')).toEqual(new Date('2023-05-07T00:00:00.000Z'));
            });

            it('Set to start of week utc with sunday as first day of week when already on that day', () => {
                expect(startOfUTC('2023-05-07T12:04:27+02:00', 'week_sun')).toEqual(new Date('2023-05-07T00:00:00.000Z'));
            });

            it('Set to start of week utc with sunday as first day of week when start of week is in different month', () => {
                expect(startOfUTC('2023-02-03T12:04:27+02:00', 'week_sun')).toEqual(new Date('2023-01-29T00:00:00.000Z'));
            });

            it('Set to start of week utc with sunday as first day of week when start of week is in different year', () => {
                expect(startOfUTC('2022-01-01T12:04:27+02:00', 'week_sun')).toEqual(new Date('2021-12-26T00:00:00.000Z'));
            });
        });

        describe('week_mon', () => {
            it('Set to start of week utc with monday as first day of week', () => {
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'week_mon')).toEqual(new Date('2023-05-01T00:00:00.000Z'));
                expect(startOfUTC('2023-05-14T12:04:27+02:00', 'week_mon')).toEqual(new Date('2023-05-08T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when already on that day', () => {
                expect(startOfUTC('2023-05-08T12:04:27+02:00', 'week_mon')).toEqual(new Date('2023-05-08T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when start of week is in different month', () => {
                expect(startOfUTC('2023-02-03T12:04:27+02:00', 'week_mon')).toEqual(new Date('2023-01-30T00:00:00.000Z'));
            });

            it('Set to start of week utc with monday as first day of week when start of week is in different year', () => {
                expect(startOfUTC('2023-01-01T12:04:27+02:00', 'week_mon')).toEqual(new Date('2022-12-26T00:00:00.000Z'));
            });
        });

        describe('week_tue', () => {
            it('Set to start of week utc with tuesday as first day of week', () => {
                expect(startOfUTC('2023-05-01T12:04:27+02:00', 'week_tue')).toEqual(new Date('2023-04-25T00:00:00.000Z'));
                expect(startOfUTC('2023-05-02T12:04:27+02:00', 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC('2023-05-03T12:04:27+02:00', 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC('2023-05-05T12:04:27+02:00', 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC('2023-05-06T12:04:27+02:00', 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC('2023-05-07T12:04:27+02:00', 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC('2023-05-08T12:04:27+02:00', 'week_tue')).toEqual(new Date('2023-05-02T00:00:00.000Z'));
                expect(startOfUTC('2023-05-22T12:04:27+02:00', 'week_tue')).toEqual(new Date('2023-05-16T00:00:00.000Z'));
            });

            it('Set to start of week utc with tuesday as first day of week when already on that day', () => {
                expect(startOfUTC('2023-05-09T12:04:27+02:00', 'week_tue')).toEqual(new Date('2023-05-09T00:00:00.000Z'));
            });

            it('Set to start of week utc with tuesday as first day of week when start of week is in different month', () => {
                expect(startOfUTC('2023-02-03T12:04:27+02:00', 'week_tue')).toEqual(new Date('2023-01-31T00:00:00.000Z'));
            });

            it('Set to start of week utc with tuesday as first day of week when start of week is in different year', () => {
                expect(startOfUTC('2023-01-01T12:04:27+02:00', 'week_tue')).toEqual(new Date('2022-12-27T00:00:00.000Z'));
            });
        });

        describe('week_wed', () => {
            it('Set to start of week utc with wednessday as first day of week', () => {
                expect(startOfUTC('2023-05-01T12:04:27+02:00', 'week_wed')).toEqual(new Date('2023-04-26T00:00:00.000Z'));
                expect(startOfUTC('2023-05-02T12:04:27+02:00', 'week_wed')).toEqual(new Date('2023-04-26T00:00:00.000Z'));
                expect(startOfUTC('2023-05-03T12:04:27+02:00', 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC('2023-05-05T12:04:27+02:00', 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC('2023-05-06T12:04:27+02:00', 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC('2023-05-07T12:04:27+02:00', 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC('2023-05-08T12:04:27+02:00', 'week_wed')).toEqual(new Date('2023-05-03T00:00:00.000Z'));
                expect(startOfUTC('2023-05-23T12:04:27+02:00', 'week_wed')).toEqual(new Date('2023-05-17T00:00:00.000Z'));
            });

            it('Set to start of week utc with wednessday as first day of week when already on that day', () => {
                expect(startOfUTC('2023-05-10T12:04:27+02:00', 'week_wed')).toEqual(new Date('2023-05-10T00:00:00.000Z'));
            });

            it('Set to start of week utc with wednessday as first day of week when start of week is in different month', () => {
                expect(startOfUTC('2023-04-02T12:04:27+02:00', 'week_wed')).toEqual(new Date('2023-03-29T00:00:00.000Z'));
            });

            it('Set to start of week utc with wednessday as first day of week when start of week is in different year', () => {
                expect(startOfUTC('2023-01-01T12:04:27+02:00', 'week_wed')).toEqual(new Date('2022-12-28T00:00:00.000Z'));
            });
        });

        describe('week_thu', () => {
            it('Set to start of week utc with thursday as first day of week', () => {
                expect(startOfUTC('2023-05-01T12:04:27+02:00', 'week_thu')).toEqual(new Date('2023-04-27T00:00:00.000Z'));
                expect(startOfUTC('2023-05-02T12:04:27+02:00', 'week_thu')).toEqual(new Date('2023-04-27T00:00:00.000Z'));
                expect(startOfUTC('2023-05-03T12:04:27+02:00', 'week_thu')).toEqual(new Date('2023-04-27T00:00:00.000Z'));
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
                expect(startOfUTC('2023-05-05T12:04:27+02:00', 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
                expect(startOfUTC('2023-05-06T12:04:27+02:00', 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
                expect(startOfUTC('2023-05-07T12:04:27+02:00', 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
                expect(startOfUTC('2023-05-08T12:04:27+02:00', 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
                expect(startOfUTC('2023-05-24T12:04:27+02:00', 'week_thu')).toEqual(new Date('2023-05-18T00:00:00.000Z'));
            });

            it('Set to start of week utc with thursday as first day of week when already on that day', () => {
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'week_thu')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
            });

            it('Set to start of week utc with thursday as first day of week when start of week is in different month', () => {
                expect(startOfUTC('2023-08-01T12:04:27+02:00', 'week_thu')).toEqual(new Date('2023-07-27T00:00:00.000Z'));
            });

            it('Set to start of week utc with thursday as first day of week when start of week is in different year', () => {
                expect(startOfUTC('2023-01-01T12:04:27+02:00', 'week_thu')).toEqual(new Date('2022-12-29T00:00:00.000Z'));
            });
        });

        describe('week_fri', () => {
            it('Set to start of week utc with friday as first day of week', () => {
                expect(startOfUTC('2023-05-01T12:04:27+02:00', 'week_fri')).toEqual(new Date('2023-04-28T00:00:00.000Z'));
                expect(startOfUTC('2023-05-02T12:04:27+02:00', 'week_fri')).toEqual(new Date('2023-04-28T00:00:00.000Z'));
                expect(startOfUTC('2023-05-03T12:04:27+02:00', 'week_fri')).toEqual(new Date('2023-04-28T00:00:00.000Z'));
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'week_fri')).toEqual(new Date('2023-04-28T00:00:00.000Z'));
                expect(startOfUTC('2023-05-05T12:04:27+02:00', 'week_fri')).toEqual(new Date('2023-05-05T00:00:00.000Z'));
                expect(startOfUTC('2023-05-06T12:04:27+02:00', 'week_fri')).toEqual(new Date('2023-05-05T00:00:00.000Z'));
                expect(startOfUTC('2023-05-07T12:04:27+02:00', 'week_fri')).toEqual(new Date('2023-05-05T00:00:00.000Z'));
                expect(startOfUTC('2023-05-08T12:04:27+02:00', 'week_fri')).toEqual(new Date('2023-05-05T00:00:00.000Z'));
                expect(startOfUTC('2023-05-24T12:04:27+02:00', 'week_fri')).toEqual(new Date('2023-05-19T00:00:00.000Z'));
            });

            it('Set to start of week utc with friday as first day of week when already on that day', () => {
                expect(startOfUTC('2023-05-05T12:04:27+02:00', 'week_fri')).toEqual(new Date('2023-05-05T00:00:00.000Z'));
            });

            it('Set to start of week utc with friday as first day of week when start of week is in different month', () => {
                expect(startOfUTC('2023-04-04T12:04:27+02:00', 'week_fri')).toEqual(new Date('2023-03-31T00:00:00.000Z'));
            });

            it('Set to start of week utc with friday as first day of week when start of week is in different year', () => {
                expect(startOfUTC('2023-01-01T12:04:27+02:00', 'week_fri')).toEqual(new Date('2022-12-30T00:00:00.000Z'));
            });
        });

        describe('week_sat', () => {
            it('Set to start of week utc with saturday as first day of week', () => {
                expect(startOfUTC('2023-05-01T12:04:27+02:00', 'week_sat')).toEqual(new Date('2023-04-29T00:00:00.000Z'));
                expect(startOfUTC('2023-05-02T12:04:27+02:00', 'week_sat')).toEqual(new Date('2023-04-29T00:00:00.000Z'));
                expect(startOfUTC('2023-05-03T12:04:27+02:00', 'week_sat')).toEqual(new Date('2023-04-29T00:00:00.000Z'));
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'week_sat')).toEqual(new Date('2023-04-29T00:00:00.000Z'));
                expect(startOfUTC('2023-05-05T12:04:27+02:00', 'week_sat')).toEqual(new Date('2023-04-29T00:00:00.000Z'));
                expect(startOfUTC('2023-05-06T12:04:27+02:00', 'week_sat')).toEqual(new Date('2023-05-06T00:00:00.000Z'));
                expect(startOfUTC('2023-05-07T12:04:27+02:00', 'week_sat')).toEqual(new Date('2023-05-06T00:00:00.000Z'));
                expect(startOfUTC('2023-05-08T12:04:27+02:00', 'week_sat')).toEqual(new Date('2023-05-06T00:00:00.000Z'));
                expect(startOfUTC('2023-05-24T12:04:27+02:00', 'week_sat')).toEqual(new Date('2023-05-20T00:00:00.000Z'));
            });

            it('Set to start of week utc with saturday as first day of week when already on that day', () => {
                expect(startOfUTC('2023-05-20T12:04:27+02:00', 'week_sat')).toEqual(new Date('2023-05-20T00:00:00.000Z'));
            });

            it('Set to start of week utc with saturday as first day of week when start of week is in different month', () => {
                expect(startOfUTC('2023-02-03T12:04:27+02:00', 'week_sat')).toEqual(new Date('2023-01-28T00:00:00.000Z'));
            });

            it('Set to start of week utc with saturday as first day of week when start of week is in different year', () => {
                expect(startOfUTC('2023-01-01T12:04:27+02:00', 'week_sat')).toEqual(new Date('2022-12-31T00:00:00.000Z'));
            });
        });

        describe('day', () => {
            it('Set to start of day utc', () => {
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'day')).toEqual(new Date('2023-05-04T00:00:00.000Z'));
            });
        });

        describe('hour', () => {
            it('Set to start of hour utc', () => {
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'hour')).toEqual(new Date('2023-05-04T10:00:00.000Z'));
            });
        });

        describe('minute', () => {
            it('Set to start of minute utc', () => {
                expect(startOfUTC('2023-05-04T12:04:27+02:00', 'minute')).toEqual(new Date('2023-05-04T10:04:00.000Z'));
            });
        });

        describe('second', () => {
            it('Set to start of second utc', () => {
                expect(startOfUTC('2023-05-04T12:04:27.043+02:00', 'second')).toEqual(new Date('2023-05-04T10:04:27.000Z'));
            });
        });
    });
});
