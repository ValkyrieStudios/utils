/* eslint-disable no-loss-of-precision */

import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import diff from '../../../lib/date/diff';

describe('Date - diff', () => {
    it('Throw when passed a non-date for var_a', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            expect(
                () => diff(el, new Date())
            ).toThrowError(/Diff requires date objects for both values/);
        }
    });

    it('Throw when passed a non-date for var_b', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            expect(
                () => diff(new Date(), el)
            ).toThrowError(/Diff requires date objects for both values/);
        }
    });

    describe('dateObject', () => {
        it('Should return difference in milliseconds when passing a non-string/unrecognized key', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), el)
                ).toBe(-315619200000);
            }
        });

        it('Should correctly calculate difference in milliseconds when passing a var_a after var_b and nothing for key', () => {
            expect(
                diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'))
            ).toBe(-315619200000);
        });

        it('Should correctly calculate difference in milliseconds when passing a var_a after var_b and a random key', () => {
            for (const el of ['foo', 'bar', 'hello world']) {
                expect(
                    /* @ts-ignore */
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), el)
                ).toBe(-315619200000);
            }
        });

        describe('week', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'week')
                ).toBe(-521.8571428571429);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'week')
                ).toBe(521.8571428571429);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'week')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'week')
                ).toBe(-4.404761904761905);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'week')
                ).toBe(0);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'week')
                ).toBe(4.404761904761905);
            });
        });

        describe('weeks', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'weeks')
                ).toBe(-521.8571428571429);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'weeks')
                ).toBe(521.8571428571429);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'weeks')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'weeks')
                ).toBe(-4.404761904761905);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'weeks')
                ).toBe(0);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'weeks')
                ).toBe(4.404761904761905);
            });
        });

        describe('day', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'day')
                ).toBe(-3653);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'day')
                ).toBe(3653);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'day')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'day')
                ).toBe(-30.83333333333333332);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'day')
                ).toBe(0);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'day')
                ).toBe(30.83333333333333332);
            });
        });

        describe('days', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'days')
                ).toBe(-3653);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'days')
                ).toBe(3653);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'days')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'days')
                ).toBe(-30.83333333333333332);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'days')
                ).toBe(0);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'days')
                ).toBe(30.83333333333333332);
            });
        });

        describe('hour', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'hour')
                ).toBe(-87672);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'hour')
                ).toBe(87672);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'hour')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'hour')
                ).toBe(-740);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'hour')
                ).toBe(0);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'hour')
                ).toBe(740);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:25:11+06:00'), 'hour')
                ).toBe(-740.2166666666666);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:11+02:00'), 'hour')
                ).toBe(739.78333333333333);
            });
        });

        describe('hours', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'hours')
                ).toBe(-87672);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'hours')
                ).toBe(87672);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'hours')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11+06:00'), 'hours')
                ).toBe(-740);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11+06:00'), 'hours')
                ).toBe(0);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:12:11+02:00'), 'hours')
                ).toBe(740);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:25:11+06:00'), 'hours')
                ).toBe(-740.2166666666666);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:11+02:00'), 'hours')
                ).toBe(739.78333333333333);
            });
        });

        describe('minute', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'minute')
                ).toBe(-5260320);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'minute')
                ).toBe(5260320);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'minute')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'minute')
                ).toBe(-44400.00756666667);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'minute')
                ).toBe(0);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'minute')
                ).toBe(-30.9724);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'minute')
                ).toBe(44377.4521);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'minute')
                ).toBe(-44441.17786666667);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'minute')
                ).toBe(44386.451700000005);
            });
        });

        describe('minutes', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'minutes')
                ).toBe(-5260320);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'minutes')
                ).toBe(5260320);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'minutes')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'minutes')
                ).toBe(-44400.00756666667);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'minutes')
                ).toBe(0);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'minutes')
                ).toBe(-30.9724);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'minutes')
                ).toBe(44377.4521);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'minutes')
                ).toBe(-44441.17786666667);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'minutes')
                ).toBe(44386.451700000005);
            });
        });

        describe('second', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'second')
                ).toBe(-315619200);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'second')
                ).toBe(315619200);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'second')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'second')
                ).toBe(-2664000.454);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'second')
                ).toBe(0);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'second')
                ).toBe(-1858.344);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'second')
                ).toBe(2662647.126);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'second')
                ).toBe(-2666470.6720000003);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'second')
                ).toBe(2663187.102);
            });
        });

        describe('seconds', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'seconds')
                ).toBe(-315619200);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'seconds')
                ).toBe(315619200);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'seconds')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'seconds')
                ).toBe(-2664000.454);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'seconds')
                ).toBe(0);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'seconds')
                ).toBe(-1858.344);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'seconds')
                ).toBe(2662647.126);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'seconds')
                ).toBe(-2666470.6720000003);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'seconds')
                ).toBe(2663187.102);
            });
        });

        describe('millisecond', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'millisecond')
                ).toBe(-315619200000);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'millisecond')
                ).toBe(315619200000);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'millisecond')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'millisecond')
                ).toBe(-2664000454);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'millisecond')
                ).toBe(0);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'millisecond')
                ).toBe(-1858344);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'millisecond')
                ).toBe(2662647126);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'millisecond')
                ).toBe(-2666470672);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'millisecond')
                ).toBe(2663187102);
            });
        });

        describe('milliseconds', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2032-10-05T11:12:11.000Z'), 'milliseconds')
                ).toBe(-315619200000);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff(new Date('2032-10-05T11:12:11.000Z'), new Date('2022-10-05T13:12:11+02:00'), 'milliseconds')
                ).toBe(315619200000);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T13:12:11+02:00'), 'milliseconds')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:12:11.454+06:00'), 'milliseconds')
                ).toBe(-2664000454);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:12:11.000+06:00'), 'milliseconds')
                ).toBe(0);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-10-05T17:43:09.344+06:00'), 'milliseconds')
                ).toBe(-1858344);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:34:43.874+02:00'), 'milliseconds')
                ).toBe(2662647126);
                expect(
                    diff(new Date('2022-10-05T13:12:11+02:00'), new Date('2022-11-05T13:53:21.672+06:00'), 'milliseconds')
                ).toBe(-2666470672);
                expect(
                    diff(new Date('2022-11-05T13:12:11+06:00'), new Date('2022-10-05T13:25:43.898+02:00'), 'milliseconds')
                ).toBe(2663187102);
            });
        });
    });

    describe('dateString', () => {
        it('Should return difference in milliseconds when passing a non-string/unrecognized key', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', el)
                ).toBe(-315619200000);
            }
        });

        it('Should correctly calculate difference in milliseconds when passing a var_a after var_b and nothing for key', () => {
            expect(
                diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z')
            ).toBe(-315619200000);
        });

        it('Should correctly calculate difference in milliseconds when passing a var_a after var_b and a random key', () => {
            for (const el of ['foo', 'bar', 'hello world']) {
                expect(
                    /* @ts-ignore */
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', el)
                ).toBe(-315619200000);
            }
        });

        describe('week', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'week')
                ).toBe(-521.8571428571429);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'week')
                ).toBe(521.8571428571429);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'week')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11+06:00', 'week')
                ).toBe(-4.404761904761905);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11+06:00', 'week')
                ).toBe(0);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:12:11+02:00', 'week')
                ).toBe(4.404761904761905);
            });
        });

        describe('weeks', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'weeks')
                ).toBe(-521.8571428571429);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'weeks')
                ).toBe(521.8571428571429);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'weeks')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11+06:00', 'weeks')
                ).toBe(-4.404761904761905);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11+06:00', 'weeks')
                ).toBe(0);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:12:11+02:00', 'weeks')
                ).toBe(4.404761904761905);
            });
        });

        describe('day', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'day')
                ).toBe(-3653);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'day')
                ).toBe(3653);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'day')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11+06:00', 'day')
                ).toBe(-30.83333333333333332);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11+06:00', 'day')
                ).toBe(0);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:12:11+02:00', 'day')
                ).toBe(30.83333333333333332);
            });
        });

        describe('days', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'days')
                ).toBe(-3653);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'days')
                ).toBe(3653);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'days')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11+06:00', 'days')
                ).toBe(-30.83333333333333332);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11+06:00', 'days')
                ).toBe(0);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:12:11+02:00', 'days')
                ).toBe(30.83333333333333332);
            });
        });

        describe('hour', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'hour')
                ).toBe(-87672);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'hour')
                ).toBe(87672);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'hour')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11+06:00', 'hour')
                ).toBe(-740);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11+06:00', 'hour')
                ).toBe(0);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:12:11+02:00', 'hour')
                ).toBe(740);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:25:11+06:00', 'hour')
                ).toBe(-740.2166666666666);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:25:11+02:00', 'hour')
                ).toBe(739.78333333333333);
            });
        });

        describe('hours', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'hours')
                ).toBe(-87672);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'hours')
                ).toBe(87672);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'hours')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11+06:00', 'hours')
                ).toBe(-740);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11+06:00', 'hours')
                ).toBe(0);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:12:11+02:00', 'hours')
                ).toBe(740);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:25:11+06:00', 'hours')
                ).toBe(-740.2166666666666);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:25:11+02:00', 'hours')
                ).toBe(739.78333333333333);
            });
        });

        describe('minute', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'minute')
                ).toBe(-5260320);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'minute')
                ).toBe(5260320);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'minute')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11.454+06:00', 'minute')
                ).toBe(-44400.00756666667);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11.000+06:00', 'minute')
                ).toBe(0);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:43:09.344+06:00', 'minute')
                ).toBe(-30.9724);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:34:43.874+02:00', 'minute')
                ).toBe(44377.4521);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:53:21.672+06:00', 'minute')
                ).toBe(-44441.17786666667);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:25:43.898+02:00', 'minute')
                ).toBe(44386.451700000005);
            });
        });

        describe('minutes', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'minutes')
                ).toBe(-5260320);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'minutes')
                ).toBe(5260320);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'minutes')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11.454+06:00', 'minutes')
                ).toBe(-44400.00756666667);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11.000+06:00', 'minutes')
                ).toBe(0);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:43:09.344+06:00', 'minutes')
                ).toBe(-30.9724);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:34:43.874+02:00', 'minutes')
                ).toBe(44377.4521);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:53:21.672+06:00', 'minutes')
                ).toBe(-44441.17786666667);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:25:43.898+02:00', 'minutes')
                ).toBe(44386.451700000005);
            });
        });

        describe('second', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'second')
                ).toBe(-315619200);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'second')
                ).toBe(315619200);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'second')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11.454+06:00', 'second')
                ).toBe(-2664000.454);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11.000+06:00', 'second')
                ).toBe(0);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:43:09.344+06:00', 'second')
                ).toBe(-1858.344);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:34:43.874+02:00', 'second')
                ).toBe(2662647.126);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:53:21.672+06:00', 'second')
                ).toBe(-2666470.6720000003);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:25:43.898+02:00', 'second')
                ).toBe(2663187.102);
            });
        });

        describe('seconds', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'seconds')
                ).toBe(-315619200);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'seconds')
                ).toBe(315619200);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'seconds')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11.454+06:00', 'seconds')
                ).toBe(-2664000.454);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11.000+06:00', 'seconds')
                ).toBe(0);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:43:09.344+06:00', 'seconds')
                ).toBe(-1858.344);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:34:43.874+02:00', 'seconds')
                ).toBe(2662647.126);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:53:21.672+06:00', 'seconds')
                ).toBe(-2666470.6720000003);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:25:43.898+02:00', 'seconds')
                ).toBe(2663187.102);
            });
        });

        describe('millisecond', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'millisecond')
                ).toBe(-315619200000);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'millisecond')
                ).toBe(315619200000);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'millisecond')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11.454+06:00', 'millisecond')
                ).toBe(-2664000454);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11.000+06:00', 'millisecond')
                ).toBe(0);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:43:09.344+06:00', 'millisecond')
                ).toBe(-1858344);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:34:43.874+02:00', 'millisecond')
                ).toBe(2662647126);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:53:21.672+06:00', 'millisecond')
                ).toBe(-2666470672);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:25:43.898+02:00', 'millisecond')
                ).toBe(2663187102);
            });
        });

        describe('milliseconds', () => {
            it('Should correctly calculate difference when passing a var_a after var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2032-10-05T11:12:11.000Z', 'milliseconds')
                ).toBe(-315619200000);
            });

            it('Should correctly calculate difference when passing a var_a before var_b', () => {
                expect(
                    diff('2032-10-05T11:12:11.000Z', '2022-10-05T13:12:11+02:00', 'milliseconds')
                ).toBe(315619200000);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T13:12:11+02:00', 'milliseconds')
                ).toBe(0);
            });

            it('Should correctly calculate difference when passing a var_a equal to var_b and not care about timezones', () => {
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:12:11.454+06:00', 'milliseconds')
                ).toBe(-2664000454);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:12:11.000+06:00', 'milliseconds')
                ).toBe(0);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-10-05T17:43:09.344+06:00', 'milliseconds')
                ).toBe(-1858344);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:34:43.874+02:00', 'milliseconds')
                ).toBe(2662647126);
                expect(
                    diff('2022-10-05T13:12:11+02:00', '2022-11-05T13:53:21.672+06:00', 'milliseconds')
                ).toBe(-2666470672);
                expect(
                    diff('2022-11-05T13:12:11+06:00', '2022-10-05T13:25:43.898+02:00', 'milliseconds')
                ).toBe(2663187102);
            });
        });
    });
});
