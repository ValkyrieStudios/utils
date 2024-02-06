'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import endOfUTC         from '../../../lib/date/endOfUTC.mjs';

describe('Date - endOfUTC', () => {
    it('Throw when passed a non-date for var', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            assert.throws(
                () => endOfUTC(el, 10, 'day'),
                new TypeError('endOfUTC requires a date object')
            );
        }
    });

    it('Throw when passed a non-string for key', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            assert.throws(
                () => endOfUTC(new Date(), el),
                new TypeError('Key needs to be a string with content')
            );
        }
    });

    it('Should return original date in utc when passed a non-recognized key', () => {
        assert.deepEqual(endOfUTC(new Date('2022-10-05T13:12:11+02:00'), 'jedis'), new Date('2022-10-05T11:12:11.000Z'));
    });

    describe('year', () => {
        it('Set to end of year utc', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'year'), new Date('2023-12-31T23:59:59.999Z'));
        });
    });

    describe('quarter', () => {
        it('Set to end of quarter utc', () => {
            const qmap = {
                1: {m: 3, d: 31},
                2: {m: 3, d: 31},
                3: {m: 3, d: 31},
                4: {m: 6, d: 30},
                5: {m: 6, d: 30},
                6: {m: 6, d: 30},
                7: {m: 9, d: 30},
                8: {m: 9, d: 30},
                9: {m: 9, d: 30},
                10: {m: 12, d: 31},
                11: {m: 12, d: 31},
                12: {m: 12, d: 31},
            };
            for (let i = 1; i <= 12; i++) {
                const date = `2023-${i < 10 ? '0' : ''}${i}-04T12:04:27+02:00`;
                const date_q = `2023-${qmap[i].m < 10 ? '0' : ''}${qmap[i].m}-${qmap[i].d}T23:59:59.999Z`;
                assert.deepEqual(endOfUTC(new Date(date), 'quarter'), new Date(date_q));
            }
        });
    });

    describe('month', () => {
        it('Set to end of month utc', () => {
            assert.deepEqual(endOfUTC(new Date('2023-01-04T12:04:27+02:00'), 'month'), new Date('2023-01-31T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-02-04T12:04:27+02:00'), 'month'), new Date('2023-02-28T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-03-04T12:04:27+02:00'), 'month'), new Date('2023-03-31T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-04-04T12:04:27+02:00'), 'month'), new Date('2023-04-30T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'month'), new Date('2023-05-31T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-06-04T12:04:27+02:00'), 'month'), new Date('2023-06-30T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-07-04T12:04:27+02:00'), 'month'), new Date('2023-07-31T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-08-04T12:04:27+02:00'), 'month'), new Date('2023-08-31T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-09-04T12:04:27+02:00'), 'month'), new Date('2023-09-30T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-10-04T12:04:27+02:00'), 'month'), new Date('2023-10-31T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-11-04T12:04:27+02:00'), 'month'), new Date('2023-11-30T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-12-04T12:04:27+02:00'), 'month'), new Date('2023-12-31T23:59:59.999Z'));
        });

        it('Set to end of month utc for february when in a leap year', () => {
            assert.deepEqual(endOfUTC(new Date('2024-02-04T12:04:27+02:00'), 'month'), new Date('2024-02-29T23:59:59.999Z'));
        });
    });

    describe('week', () => {
        it('Set to end of sunday as end of week utc with monday as first day of the week', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week'), new Date('2023-05-07T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-13T12:04:27+02:00'), 'week'), new Date('2023-05-14T23:59:59.999Z'));
        });

        it('Set to end of sunday as end of week utc with monday as first day of the week when already on that day', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-14T12:04:27+02:00'), 'week'), new Date('2023-05-14T23:59:59.999Z'));
        });

        it('Set to end of sunday as end of week utc with monday as first day of the week when end is in different month', () => {
            assert.deepEqual(endOfUTC(new Date('2023-02-27T12:04:27+02:00'), 'week'), new Date('2023-03-05T23:59:59.999Z'));
        });

        it('Set to end of sunday as end of week utc with monday as first day of the week when end is in different year', () => {
            assert.deepEqual(endOfUTC(new Date('2022-12-29T12:04:27+02:00'), 'week'), new Date('2023-01-01T23:59:59.999Z'));
        });
    });

    describe('week_sun', () => {
        it('Set to end of saturday as end of week utc with sunday as first day of the week', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_sun'), new Date('2023-05-06T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-12T12:04:27+02:00'), 'week_sun'), new Date('2023-05-13T23:59:59.999Z'));
        });

        it('Set to end of saturday as end of week utc with sunday as first day of the week when already on that day', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-06T12:04:27+02:00'), 'week_sun'), new Date('2023-05-06T23:59:59.999Z'));
        });

        it('Set to end of saturday as end of week utc with sunday as first day of the week when end is in different month', () => {
            assert.deepEqual(endOfUTC(new Date('2023-03-29T12:04:27+02:00'), 'week_sun'), new Date('2023-04-01T23:59:59.999Z'));
        });

        it('Set to end of saturday as end of week utc with sunday as first day of the week when end is in different year', () => {
            assert.deepEqual(endOfUTC(new Date('2021-12-28T12:04:27+02:00'), 'week_sun'), new Date('2022-01-01T23:59:59.999Z'));
        });
    });

    describe('week_mon', () => {
        it('Set to end of sunday as end of week utc with monday as first day of the week', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-01T12:04:27+02:00'), 'week_mon'), new Date('2023-05-07T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-02T12:04:27+02:00'), 'week_mon'), new Date('2023-05-07T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-03T12:04:27+02:00'), 'week_mon'), new Date('2023-05-07T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_mon'), new Date('2023-05-07T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-12T12:04:27+02:00'), 'week_mon'), new Date('2023-05-14T23:59:59.999Z'));
        });

        it('Set to end of sunday as end of week utc with monday as first day of the week when already on that day', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-14T12:04:27+02:00'), 'week_mon'), new Date('2023-05-14T23:59:59.999Z'));
        });

        it('Set to end of sunday as end of week utc with monday as first day of the week when end is in different month', () => {
            assert.deepEqual(endOfUTC(new Date('2023-02-27T12:04:27+02:00'), 'week_mon'), new Date('2023-03-05T23:59:59.999Z'));
        });

        it('Set to end of sunday as end of week utc with monday as first day of the week when end is in different year', () => {
            assert.deepEqual(endOfUTC(new Date('2022-12-29T12:04:27+02:00'), 'week_mon'), new Date('2023-01-01T23:59:59.999Z'));
        });
    });

    describe('week_tue', () => {
        it('Set to end of monday as end of week utc with tuesday as first day of the week', () => {
            assert.deepEqual(endOfUTC(new Date('2023-04-30T12:04:27+02:00'), 'week_tue'), new Date('2023-05-01T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-01T12:04:27+02:00'), 'week_tue'), new Date('2023-05-01T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-02T12:04:27+02:00'), 'week_tue'), new Date('2023-05-08T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-03T12:04:27+02:00'), 'week_tue'), new Date('2023-05-08T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_tue'), new Date('2023-05-08T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-12T12:04:27+02:00'), 'week_tue'), new Date('2023-05-15T23:59:59.999Z'));
        });

        it('Set to end of monday as end of week utc with tuesday as first day of the week when already on that day', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-22T12:04:27+02:00'), 'week_tue'), new Date('2023-05-22T23:59:59.999Z'));
        });

        it('Set to end of monday as end of week utc with tuesday as first day of the week when end is in different month', () => {
            assert.deepEqual(endOfUTC(new Date('2023-04-29T12:04:27+02:00'), 'week_tue'), new Date('2023-05-01T23:59:59.999Z'));
        });

        it('Set to end of monday as end of week utc with tuesday as first day of the week when end is in different year', () => {
            assert.deepEqual(endOfUTC(new Date('2017-12-29T12:04:27+02:00'), 'week_tue'), new Date('2018-01-01T23:59:59.999Z'));
        });
    });

    describe('week_wed', () => {
        it('Set to end of tuesday as end of week utc with wednesday as first day of the week', () => {
            assert.deepEqual(endOfUTC(new Date('2023-04-30T12:04:27+02:00'), 'week_wed'), new Date('2023-05-02T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-01T12:04:27+02:00'), 'week_wed'), new Date('2023-05-02T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-02T12:04:27+02:00'), 'week_wed'), new Date('2023-05-02T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-03T12:04:27+02:00'), 'week_wed'), new Date('2023-05-09T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_wed'), new Date('2023-05-09T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-16T12:04:27+02:00'), 'week_wed'), new Date('2023-05-16T23:59:59.999Z'));
        });

        it('Set to end of tuesday as end of week utc with wednesday as first day of the week when already on that day', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-23T12:04:27+02:00'), 'week_wed'), new Date('2023-05-23T23:59:59.999Z'));
        });

        it('Set to end of tuesday as end of week utc with wednesday as first day of the week when end is in different month', () => {
            assert.deepEqual(endOfUTC(new Date('2023-07-31T12:04:27+02:00'), 'week_wed'), new Date('2023-08-01T23:59:59.999Z'));
        });

        it('Set to end of tuesday as end of week utc with wednesday as first day of the week when end is in different year', () => {
            assert.deepEqual(endOfUTC(new Date('2018-12-27T12:04:27+02:00'), 'week_wed'), new Date('2019-01-01T23:59:59.999Z'));
        });
    });

    describe('week_thu', () => {
        it('Set to end of wednesday as end of week utc with thursday as first day of the week', () => {
            assert.deepEqual(endOfUTC(new Date('2023-04-30T12:04:27+02:00'), 'week_thu'), new Date('2023-05-03T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-01T12:04:27+02:00'), 'week_thu'), new Date('2023-05-03T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-02T12:04:27+02:00'), 'week_thu'), new Date('2023-05-03T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-03T12:04:27+02:00'), 'week_thu'), new Date('2023-05-03T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_thu'), new Date('2023-05-10T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-16T12:04:27+02:00'), 'week_thu'), new Date('2023-05-17T23:59:59.999Z'));
        });

        it('Set to end of wednesday as end of week utc with thursday as first day of the week when already on that day', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-17T12:04:27+02:00'), 'week_thu'), new Date('2023-05-17T23:59:59.999Z'));
        });

        it('Set to end of wednesday as end of week utc with thursday as first day of the week when end is in different month', () => {
            assert.deepEqual(endOfUTC(new Date('2023-01-28T12:04:27+02:00'), 'week_thu'), new Date('2023-02-01T23:59:59.999Z'));
        });

        it('Set to end of wednesday as end of week utc with thursday as first day of the week when end is in different year', () => {
            assert.deepEqual(endOfUTC(new Date('2019-12-29T12:04:27+02:00'), 'week_thu'), new Date('2020-01-01T23:59:59.999Z'));
        });
    });

    describe('week_fri', () => {
        it('Set to end of thursday as end of week utc with friday as first day of the week', () => {
            assert.deepEqual(endOfUTC(new Date('2023-04-30T12:04:27+02:00'), 'week_fri'), new Date('2023-05-04T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-01T12:04:27+02:00'), 'week_fri'), new Date('2023-05-04T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-02T12:04:27+02:00'), 'week_fri'), new Date('2023-05-04T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-03T12:04:27+02:00'), 'week_fri'), new Date('2023-05-04T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_fri'), new Date('2023-05-04T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-16T12:04:27+02:00'), 'week_fri'), new Date('2023-05-18T23:59:59.999Z'));
        });

        it('Set to end of thursday as end of week utc with friday as first day of the week when already on that day', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-11T12:04:27+02:00'), 'week_fri'), new Date('2023-05-11T23:59:59.999Z'));
        });

        it('Set to end of thursday as end of week utc with friday as first day of the week when end is in different month', () => {
            assert.deepEqual(endOfUTC(new Date('2023-02-27T12:04:27+02:00'), 'week_fri'), new Date('2023-03-02T23:59:59.999Z'));
        });

        it('Set to end of thursday as end of week utc with friday as first day of the week when end is in different year', () => {
            assert.deepEqual(endOfUTC(new Date('2019-12-29T12:04:27+02:00'), 'week_fri'), new Date('2020-01-02T23:59:59.999Z'));
        });
    });

    describe('week_sat', () => {
        it('Set to end of friday as end of week utc with saturday as first day of the week', () => {
            assert.deepEqual(endOfUTC(new Date('2023-04-30T12:04:27+02:00'), 'week_sat'), new Date('2023-05-05T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-01T12:04:27+02:00'), 'week_sat'), new Date('2023-05-05T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-02T12:04:27+02:00'), 'week_sat'), new Date('2023-05-05T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-03T12:04:27+02:00'), 'week_sat'), new Date('2023-05-05T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'week_sat'), new Date('2023-05-05T23:59:59.999Z'));
            assert.deepEqual(endOfUTC(new Date('2023-05-20T12:04:27+02:00'), 'week_sat'), new Date('2023-05-26T23:59:59.999Z'));
        });

        it('Set to end of friday as end of week utc with saturday as first day of the week when already on that day', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-19T12:04:27+02:00'), 'week_sat'), new Date('2023-05-19T23:59:59.999Z'));
        });

        it('Set to end of friday as end of week utc with saturday as first day of the week when end is in different month', () => {
            assert.deepEqual(endOfUTC(new Date('2023-02-27T12:04:27+02:00'), 'week_sat'), new Date('2023-03-03T23:59:59.999Z'));
        });

        it('Set to end of friday as end of week utc with saturday as first day of the week when end is in different year', () => {
            assert.deepEqual(endOfUTC(new Date('2020-12-29T12:04:27+02:00'), 'week_sat'), new Date('2021-01-01T23:59:59.999Z'));
        });
    });

    describe('day', () => {
        it('Set to end of day utc', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'day'), new Date('2023-05-04T23:59:59.999Z'));
        });
    });

    describe('hour', () => {
        it('Set to end of hour utc', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'hour'), new Date('2023-05-04T10:59:59.999Z'));
        });
    });

    describe('minute', () => {
        it('Set to end of minute utc', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27+02:00'), 'minute'), new Date('2023-05-04T10:04:59.999Z'));
        });
    });

    describe('second', () => {
        it('Set to end of second utc', () => {
            assert.deepEqual(endOfUTC(new Date('2023-05-04T12:04:27.043+02:00'), 'second'), new Date('2023-05-04T10:04:27.999Z'));
        });
    });
});
