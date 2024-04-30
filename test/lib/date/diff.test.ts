'use strict';

/* eslint-disable no-loss-of-precision,@typescript-eslint/no-loss-of-precision */

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import diff             from '../../../lib/date/diff';

describe('Date - diff', () => {
    it('Throw when passed a non-date for var_a', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            assert.throws(
                () => diff(el, new Date()),
                new TypeError('Diff requires date objects for both values')
            );
        }
    });

    it('Throw when passed a non-date for var_b', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            assert.throws(
                () => diff(new Date(), el),
                new TypeError('Diff requires date objects for both values')
            );
        }
    });

    it('Throw when passed a non-string for key', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            if (el === undefined) continue;

            assert.throws(
                () => diff(new Date(), new Date(), el),
                new TypeError('Key needs to be a string')
            );
        }
    });

    it('Should correctly calculate difference in milliseconds when passing a var_a after var_b and nothing for key', () => {
        assert.equal(
            diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z')),
            -315619200000
        );
    });

    it('Should correctly calculate difference in milliseconds when passing a var_a after var_b and a random key', () => {
        for (const el of ['foo', 'bar', 'hello world']) {
            assert.equal(
                /* @ts-ignore */
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), el),
                -315619200000
            );
        }
    });

    describe('week', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'week'),
                -521.8571428571429
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'week'),
                521.8571428571429
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'week'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'week'),
                -4.404761904761905
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'week'),
                0
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'week'),
                4.404761904761905
            );
        });
    });

    describe('weeks', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'weeks'),
                -521.8571428571429
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'weeks'),
                521.8571428571429
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'weeks'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'weeks'),
                -4.404761904761905
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'weeks'),
                0
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'weeks'),
                4.404761904761905
            );
        });
    });

    describe('day', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'day'),
                -3653
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'day'),
                3653
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'day'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'day'),
                -30.83333333333333332
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'day'),
                0
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'day'),
                30.83333333333333332
            );
        });
    });

    describe('days', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'days'),
                -3653
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'days'),
                3653
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'days'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'days'),
                -30.83333333333333332
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'days'),
                0
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'days'),
                30.83333333333333332
            );
        });
    });

    describe('hour', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'hour'),
                -87672
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'hour'),
                87672
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'hour'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'hour'),
                -740
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'hour'),
                0
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'hour'),
                740
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:25:11+06:00'), 'hour'),
                -740.2166666666667
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:11+02:00'), 'hour'),
                739.78333333333333
            );
        });
    });

    describe('hours', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'hours'),
                -87672
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'hours'),
                87672
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'hours'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'hours'),
                -740
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'hours'),
                0
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'hours'),
                740
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:25:11+06:00'), 'hours'),
                -740.2166666666667
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:11+02:00'), 'hours'),
                739.78333333333333
            );
        });
    });

    describe('minute', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'minute'),
                -5260320
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'minute'),
                5260320
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'minute'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'minute'),
                -44400.00756666667
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'minute'),
                0
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'minute'),
                -30.9724
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'minute'),
                44377.4521
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'minute'),
                -44441.177866666665
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'minute'),
                44386.4517
            );
        });
    });

    describe('minutes', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'minutes'),
                -5260320
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'minutes'),
                5260320
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'minutes'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'minutes'),
                -44400.00756666667
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'minutes'),
                0
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'minutes'),
                -30.9724
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'minutes'),
                44377.4521
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'minutes'),
                -44441.177866666665
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'minutes'),
                44386.4517
            );
        });
    });

    describe('second', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'second'),
                -315619200
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'second'),
                315619200
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'second'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'second'),
                -2664000.454
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'second'),
                0
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'second'),
                -1858.344
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'second'),
                2662647.126
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'second'),
                -2666470.672
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'second'),
                2663187.102
            );
        });
    });

    describe('seconds', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'seconds'),
                -315619200
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'seconds'),
                315619200
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'seconds'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'seconds'),
                -2664000.454
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'seconds'),
                0
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'seconds'),
                -1858.344
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'seconds'),
                2662647.126
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'seconds'),
                -2666470.672
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'seconds'),
                2663187.102
            );
        });
    });

    describe('millisecond', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'millisecond'),
                -315619200000
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'millisecond'),
                315619200000
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'millisecond'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'millisecond'),
                -2664000454
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'millisecond'),
                0
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'millisecond'),
                -1858344
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'millisecond'),
                2662647126
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'millisecond'),
                -2666470672
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'millisecond'),
                2663187102
            );
        });
    });

    describe('milliseconds', () => {
        it('Should correctly calculate difference when passing a var_a after var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'milliseconds'),
                -315619200000
            );
        });

        it('Should correctly calculate difference when passing a var_a before var_b', () => {
            assert.equal(
                diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'milliseconds'),
                315619200000
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'milliseconds'),
                0
            );
        });

        it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'milliseconds'),
                -2664000454
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'milliseconds'),
                0
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'milliseconds'),
                -1858344
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'milliseconds'),
                2662647126
            );
            assert.equal(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'milliseconds'),
                -2666470672
            );
            assert.equal(
                diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'milliseconds'),
                2663187102
            );
        });
    });
});
