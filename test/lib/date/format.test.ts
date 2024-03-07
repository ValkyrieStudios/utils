'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import format           from '../../../lib/date/format';

describe('Date - format', () => {
    it('Throw when passed a non-date for val', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            assert.throws(
                () => format(el, 'YYYY-MM-DD'),
                new TypeError('format: val must be a Date')
            );
        }
    });

    it('Throw when passed a non-string or empty string for spec', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            assert.throws(
                () => format(new Date(), el),
                new TypeError('format: spec must be a non-empty string')
            );
        }
    });

    it('Throw when passed a non-string or empty string for locale', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            if (el === undefined) continue;
            assert.throws(
                () => format(new Date(), 'YYYY-MM-DD', el),
                new TypeError('format: locale must be a non-empty string')
            );
        }
    });

    describe('token:YYYY', () => {
        it('Should be correct', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), '2019'],
                [new Date('2007-12-31T23:59:59+02:00'), '2007'],
                [new Date('2007-12-31T23:59:59-02:00'), '2008'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'YYYY'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            assert.equal(format(new Date('2019-02-01T05:20:19+02:00'), 'YYYY', 'fr'), '2019');
        });
    });

    describe('token:Q', () => {
        it('Should be correct', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), '1'],
                [new Date('2007-12-31T23:59:59+02:00'), '4'],
                [new Date('2007-12-31T23:59:59-02:00'), '1'],
                [new Date('2023-05-23T12:23:34'), '2'],
                [new Date('2023-08-23T12:23:34'), '3'],
                [new Date('2023-09-23T12:23:34'), '3'],
                [new Date('2023-11-05T23:23:34'), '4'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'Q'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            assert.equal(format(new Date('2019-02-01T05:20:19+02:00'), 'Q', 'fr'), '1');
        });
    });

    describe('token:MMMM', () => {
        it('Should be correct', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'February'],
                [new Date('2007-12-31T23:59:59+02:00'), 'December'],
                [new Date('2007-12-31T23:59:59-02:00'), 'January'],
                [new Date('2023-04-23T12:23:34'), 'April'],
                [new Date('2023-08-23T12:23:34'), 'August'],
                [new Date('2023-09-23T12:23:34'), 'September'],
                [new Date('2023-11-05T23:23:34'), 'November'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'MMMM'), el[1]);
            }
        });

        it('Should take locale into account', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'février'],
                [new Date('2007-12-31T23:59:59+02:00'), 'décembre'],
                [new Date('2007-12-31T23:59:59-02:00'), 'janvier'],
                [new Date('2023-04-23T12:23:34'), 'avril'],
                [new Date('2023-08-23T12:23:34'), 'août'],
                [new Date('2023-09-23T12:23:34'), 'septembre'],
                [new Date('2023-11-05T23:23:34'), 'novembre'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'MMMM', 'fr'), el[1]);
            }

            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'februari'],
                [new Date('2007-12-31T23:59:59+02:00'), 'december'],
                [new Date('2007-12-31T23:59:59-02:00'), 'januari'],
                [new Date('2023-05-23T12:23:34'), 'mei'],
                [new Date('2023-08-23T12:23:34'), 'augustus'],
                [new Date('2023-09-23T12:23:34'), 'september'],
                [new Date('2023-11-05T23:23:34'), 'november'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'MMMM', 'nl'), el[1]);
            }

            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'fevereiro'],
                [new Date('2007-12-31T23:59:59+02:00'), 'dezembro'],
                [new Date('2007-12-31T23:59:59-02:00'), 'janeiro'],
                [new Date('2023-05-23T12:23:34'), 'maio'],
                [new Date('2023-08-23T12:23:34'), 'agosto'],
                [new Date('2023-09-23T12:23:34'), 'setembro'],
                [new Date('2023-11-05T23:23:34'), 'novembro'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'MMMM', 'pt'), el[1]);
            }
        });
    });

    describe('token:MMM', () => {
        it('Should be correct', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'Feb'],
                [new Date('2007-12-31T23:59:59+02:00'), 'Dec'],
                [new Date('2007-12-31T23:59:59-02:00'), 'Jan'],
                [new Date('2023-04-23T12:23:34'), 'Apr'],
                [new Date('2023-08-23T12:23:34'), 'Aug'],
                [new Date('2023-09-23T12:23:34'), 'Sep'],
                [new Date('2023-11-05T23:23:34'), 'Nov'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'MMM'), el[1]);
            }
        });

        it('Should take locale into account', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'févr.'],
                [new Date('2007-12-31T23:59:59+02:00'), 'déc.'],
                [new Date('2007-12-31T23:59:59-02:00'), 'janv.'],
                [new Date('2023-05-23T12:23:34'), 'mai'],
                [new Date('2023-08-23T12:23:34'), 'août'],
                [new Date('2023-09-23T12:23:34'), 'sept.'],
                [new Date('2023-11-05T23:23:34'), 'nov.'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'MMM', 'fr'), el[1]);
            }

            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'feb'],
                [new Date('2007-12-31T23:59:59+02:00'), 'dec'],
                [new Date('2007-12-31T23:59:59-02:00'), 'jan'],
                [new Date('2023-05-23T12:23:34'), 'mei'],
                [new Date('2023-08-23T12:23:34'), 'aug'],
                [new Date('2023-09-23T12:23:34'), 'sep'],
                [new Date('2023-11-05T23:23:34'), 'nov'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'MMM', 'nl'), el[1]);
            }

            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'fev.'],
                [new Date('2007-12-31T23:59:59+02:00'), 'dez.'],
                [new Date('2007-12-31T23:59:59-02:00'), 'jan.'],
                [new Date('2023-05-23T12:23:34'), 'mai.'],
                [new Date('2023-08-23T12:23:34'), 'ago.'],
                [new Date('2023-09-23T12:23:34'), 'set.'],
                [new Date('2023-11-05T23:23:34'), 'nov.'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'MMM', 'pt'), el[1]);
            }
        });
    });

    describe('token:MM', () => {
        it('Should be correct', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), '02'],
                [new Date('2007-12-31T23:59:59+02:00'), '12'],
                [new Date('2007-12-31T23:59:59-02:00'), '01'],
                [new Date('2023-04-23T12:23:34'), '04'],
                [new Date('2023-08-23T12:23:34'), '08'],
                [new Date('2009-10-01T08:40:42'), '10'],
                [new Date('2023-09-23T12:23:34'), '09'],
                [new Date('2023-11-05T23:23:34'), '11'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'MM'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), '02'],
                [new Date('2007-12-31T23:59:59+02:00'), '12'],
                [new Date('2007-12-31T23:59:59-02:00'), '01'],
                [new Date('2023-04-23T12:23:34'), '04'],
                [new Date('2023-08-23T12:23:34'), '08'],
                [new Date('2009-10-01T08:40:42'), '10'],
                [new Date('2023-09-23T12:23:34'), '09'],
                [new Date('2023-11-05T23:23:34'), '11'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'MM', 'fr'), el[1]);
            }
        });
    });

    describe('token:M', () => {
        it('Should be correct', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), '2'],
                [new Date('2007-12-31T23:59:59+02:00'), '12'],
                [new Date('2007-12-31T23:59:59-02:00'), '1'],
                [new Date('2023-04-23T12:23:34'), '4'],
                [new Date('2023-08-23T12:23:34'), '8'],
                [new Date('2009-10-01T08:40:42'), '10'],
                [new Date('2023-09-23T12:23:34'), '9'],
                [new Date('2023-11-05T23:23:34'), '11'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'M'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), '2'],
                [new Date('2007-12-31T23:59:59+02:00'), '12'],
                [new Date('2007-12-31T23:59:59-02:00'), '1'],
                [new Date('2023-04-23T12:23:34'), '4'],
                [new Date('2023-08-23T12:23:34'), '8'],
                [new Date('2009-10-01T08:40:42'), '10'],
                [new Date('2023-09-23T12:23:34'), '9'],
                [new Date('2023-11-05T23:23:34'), '11'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'M', 'fr'), el[1]);
            }
        });
    });

    describe('token:DD', () => {
        it('Should be correct', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), '01'],
                [new Date('2019-02-02T05:20:19+02:00'), '02'],
                [new Date('2019-02-03T05:20:19+02:00'), '03'],
                [new Date('2019-02-04T05:20:19+02:00'), '04'],
                [new Date('2019-02-05T05:20:19+02:00'), '05'],
                [new Date('2019-02-06T05:20:19+02:00'), '06'],
                [new Date('2019-02-07T05:20:19+02:00'), '07'],
                [new Date('2019-02-08T05:20:19+02:00'), '08'],
                [new Date('2019-02-09T05:20:19+02:00'), '09'],
                [new Date('2019-02-10T05:20:19+02:00'), '10'],
                [new Date('2019-02-11T05:20:19+02:00'), '11'],
                [new Date('2019-02-12T05:20:19+02:00'), '12'],
                [new Date('2019-02-13T05:20:19+02:00'), '13'],
                [new Date('2019-02-14T05:20:19+02:00'), '14'],
                [new Date('2019-02-15T05:20:19+02:00'), '15'],
                [new Date('2019-02-16T05:20:19+02:00'), '16'],
                [new Date('2019-02-17T05:20:19+02:00'), '17'],
                [new Date('2019-02-18T05:20:19+02:00'), '18'],
                [new Date('2019-02-19T05:20:19+02:00'), '19'],
                [new Date('2019-02-20T05:20:19+02:00'), '20'],
                [new Date('2019-02-21T05:20:19+02:00'), '21'],
                [new Date('2019-02-22T05:20:19+02:00'), '22'],
                [new Date('2019-02-23T05:20:19+02:00'), '23'],
                [new Date('2019-02-24T05:20:19+02:00'), '24'],
                [new Date('2019-02-25T05:20:19+02:00'), '25'],
                [new Date('2019-02-26T05:20:19+02:00'), '26'],
                [new Date('2019-02-27T05:20:19+02:00'), '27'],
                [new Date('2019-02-28T05:20:19+02:00'), '28'],
                [new Date('2019-02-29T05:20:19+02:00'), '01'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), '29'],
                [new Date('2007-12-31T23:59:59+02:00'), '31'],
                [new Date('2007-12-31T23:59:59-02:00'), '01'],
                [new Date('2023-04-23T12:23:34'), '23'],
                [new Date('2023-08-23T12:23:34'), '23'],
                [new Date('2009-10-01T08:40:42'), '01'],
                [new Date('2023-09-23T12:23:34'), '23'],
                [new Date('2023-11-05T23:23:34'), '05'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'DD'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), '01'],
                [new Date('2019-02-02T05:20:19+02:00'), '02'],
                [new Date('2019-02-03T05:20:19+02:00'), '03'],
                [new Date('2019-02-04T05:20:19+02:00'), '04'],
                [new Date('2019-02-05T05:20:19+02:00'), '05'],
                [new Date('2019-02-06T05:20:19+02:00'), '06'],
                [new Date('2019-02-07T05:20:19+02:00'), '07'],
                [new Date('2019-02-08T05:20:19+02:00'), '08'],
                [new Date('2019-02-09T05:20:19+02:00'), '09'],
                [new Date('2019-02-10T05:20:19+02:00'), '10'],
                [new Date('2019-02-11T05:20:19+02:00'), '11'],
                [new Date('2019-02-12T05:20:19+02:00'), '12'],
                [new Date('2019-02-13T05:20:19+02:00'), '13'],
                [new Date('2019-02-14T05:20:19+02:00'), '14'],
                [new Date('2019-02-15T05:20:19+02:00'), '15'],
                [new Date('2019-02-16T05:20:19+02:00'), '16'],
                [new Date('2019-02-17T05:20:19+02:00'), '17'],
                [new Date('2019-02-18T05:20:19+02:00'), '18'],
                [new Date('2019-02-19T05:20:19+02:00'), '19'],
                [new Date('2019-02-20T05:20:19+02:00'), '20'],
                [new Date('2019-02-21T05:20:19+02:00'), '21'],
                [new Date('2019-02-22T05:20:19+02:00'), '22'],
                [new Date('2019-02-23T05:20:19+02:00'), '23'],
                [new Date('2019-02-24T05:20:19+02:00'), '24'],
                [new Date('2019-02-25T05:20:19+02:00'), '25'],
                [new Date('2019-02-26T05:20:19+02:00'), '26'],
                [new Date('2019-02-27T05:20:19+02:00'), '27'],
                [new Date('2019-02-28T05:20:19+02:00'), '28'],
                [new Date('2019-02-29T05:20:19+02:00'), '01'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), '29'],
                [new Date('2007-12-31T23:59:59+02:00'), '31'],
                [new Date('2007-12-31T23:59:59-02:00'), '01'],
                [new Date('2023-04-23T12:23:34'), '23'],
                [new Date('2023-08-23T12:23:34'), '23'],
                [new Date('2009-10-01T08:40:42'), '01'],
                [new Date('2023-09-23T12:23:34'), '23'],
                [new Date('2023-11-05T23:23:34'), '05'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'DD', 'fr'), el[1]);
            }
        });
    });

    describe('token:D', () => {
        it('Should be correct', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), '1'],
                [new Date('2019-02-02T05:20:19+02:00'), '2'],
                [new Date('2019-02-03T05:20:19+02:00'), '3'],
                [new Date('2019-02-04T05:20:19+02:00'), '4'],
                [new Date('2019-02-05T05:20:19+02:00'), '5'],
                [new Date('2019-02-06T05:20:19+02:00'), '6'],
                [new Date('2019-02-07T05:20:19+02:00'), '7'],
                [new Date('2019-02-08T05:20:19+02:00'), '8'],
                [new Date('2019-02-09T05:20:19+02:00'), '9'],
                [new Date('2019-02-10T05:20:19+02:00'), '10'],
                [new Date('2019-02-11T05:20:19+02:00'), '11'],
                [new Date('2019-02-12T05:20:19+02:00'), '12'],
                [new Date('2019-02-13T05:20:19+02:00'), '13'],
                [new Date('2019-02-14T05:20:19+02:00'), '14'],
                [new Date('2019-02-15T05:20:19+02:00'), '15'],
                [new Date('2019-02-16T05:20:19+02:00'), '16'],
                [new Date('2019-02-17T05:20:19+02:00'), '17'],
                [new Date('2019-02-18T05:20:19+02:00'), '18'],
                [new Date('2019-02-19T05:20:19+02:00'), '19'],
                [new Date('2019-02-20T05:20:19+02:00'), '20'],
                [new Date('2019-02-21T05:20:19+02:00'), '21'],
                [new Date('2019-02-22T05:20:19+02:00'), '22'],
                [new Date('2019-02-23T05:20:19+02:00'), '23'],
                [new Date('2019-02-24T05:20:19+02:00'), '24'],
                [new Date('2019-02-25T05:20:19+02:00'), '25'],
                [new Date('2019-02-26T05:20:19+02:00'), '26'],
                [new Date('2019-02-27T05:20:19+02:00'), '27'],
                [new Date('2019-02-28T05:20:19+02:00'), '28'],
                [new Date('2019-02-29T05:20:19+02:00'), '1'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), '29'],
                [new Date('2007-12-31T23:59:59+02:00'), '31'],
                [new Date('2007-12-31T23:59:59-02:00'), '1'],
                [new Date('2023-04-23T12:23:34'), '23'],
                [new Date('2023-08-23T12:23:34'), '23'],
                [new Date('2009-10-01T08:40:42'), '1'],
                [new Date('2023-09-23T12:23:34'), '23'],
                [new Date('2023-11-05T23:23:34'), '5'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'D'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), '1'],
                [new Date('2019-02-02T05:20:19+02:00'), '2'],
                [new Date('2019-02-03T05:20:19+02:00'), '3'],
                [new Date('2019-02-04T05:20:19+02:00'), '4'],
                [new Date('2019-02-05T05:20:19+02:00'), '5'],
                [new Date('2019-02-06T05:20:19+02:00'), '6'],
                [new Date('2019-02-07T05:20:19+02:00'), '7'],
                [new Date('2019-02-08T05:20:19+02:00'), '8'],
                [new Date('2019-02-09T05:20:19+02:00'), '9'],
                [new Date('2019-02-10T05:20:19+02:00'), '10'],
                [new Date('2019-02-11T05:20:19+02:00'), '11'],
                [new Date('2019-02-12T05:20:19+02:00'), '12'],
                [new Date('2019-02-13T05:20:19+02:00'), '13'],
                [new Date('2019-02-14T05:20:19+02:00'), '14'],
                [new Date('2019-02-15T05:20:19+02:00'), '15'],
                [new Date('2019-02-16T05:20:19+02:00'), '16'],
                [new Date('2019-02-17T05:20:19+02:00'), '17'],
                [new Date('2019-02-18T05:20:19+02:00'), '18'],
                [new Date('2019-02-19T05:20:19+02:00'), '19'],
                [new Date('2019-02-20T05:20:19+02:00'), '20'],
                [new Date('2019-02-21T05:20:19+02:00'), '21'],
                [new Date('2019-02-22T05:20:19+02:00'), '22'],
                [new Date('2019-02-23T05:20:19+02:00'), '23'],
                [new Date('2019-02-24T05:20:19+02:00'), '24'],
                [new Date('2019-02-25T05:20:19+02:00'), '25'],
                [new Date('2019-02-26T05:20:19+02:00'), '26'],
                [new Date('2019-02-27T05:20:19+02:00'), '27'],
                [new Date('2019-02-28T05:20:19+02:00'), '28'],
                [new Date('2019-02-29T05:20:19+02:00'), '1'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), '29'],
                [new Date('2007-12-31T23:59:59+02:00'), '31'],
                [new Date('2007-12-31T23:59:59-02:00'), '1'],
                [new Date('2023-04-23T12:23:34'), '23'],
                [new Date('2023-08-23T12:23:34'), '23'],
                [new Date('2009-10-01T08:40:42'), '1'],
                [new Date('2023-09-23T12:23:34'), '23'],
                [new Date('2023-11-05T23:23:34'), '5'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'D', 'fr'), el[1]);
            }
        });
    });

    describe('token:dddd', () => {
        it('Should be correct', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'Friday'],
                [new Date('2019-02-02T05:20:19+02:00'), 'Saturday'],
                [new Date('2019-02-03T05:20:19+02:00'), 'Sunday'],
                [new Date('2019-02-04T05:20:19+02:00'), 'Monday'],
                [new Date('2019-02-05T05:20:19+02:00'), 'Tuesday'],
                [new Date('2019-02-06T05:20:19+02:00'), 'Wednesday'],
                [new Date('2019-02-07T05:20:19+02:00'), 'Thursday'],
                [new Date('2019-02-08T05:20:19+02:00'), 'Friday'],
                [new Date('2019-02-09T05:20:19+02:00'), 'Saturday'],
                [new Date('2019-02-10T05:20:19+02:00'), 'Sunday'],
                [new Date('2019-02-11T05:20:19+02:00'), 'Monday'],
                [new Date('2019-02-12T05:20:19+02:00'), 'Tuesday'],
                [new Date('2019-02-13T05:20:19+02:00'), 'Wednesday'],
                [new Date('2019-02-14T05:20:19+02:00'), 'Thursday'],
                [new Date('2019-02-15T05:20:19+02:00'), 'Friday'],
                [new Date('2019-02-16T05:20:19+02:00'), 'Saturday'],
                [new Date('2019-02-17T05:20:19+02:00'), 'Sunday'],
                [new Date('2019-02-18T05:20:19+02:00'), 'Monday'],
                [new Date('2019-02-19T05:20:19+02:00'), 'Tuesday'],
                [new Date('2019-02-20T05:20:19+02:00'), 'Wednesday'],
                [new Date('2019-02-21T05:20:19+02:00'), 'Thursday'],
                [new Date('2019-02-22T05:20:19+02:00'), 'Friday'],
                [new Date('2019-02-23T05:20:19+02:00'), 'Saturday'],
                [new Date('2019-02-24T05:20:19+02:00'), 'Sunday'],
                [new Date('2019-02-25T05:20:19+02:00'), 'Monday'],
                [new Date('2019-02-26T05:20:19+02:00'), 'Tuesday'],
                [new Date('2019-02-27T05:20:19+02:00'), 'Wednesday'],
                [new Date('2019-02-28T05:20:19+02:00'), 'Thursday'],
                [new Date('2019-02-29T05:20:19+02:00'), 'Friday'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), 'Thursday'],
                [new Date('2007-12-31T23:59:59+02:00'), 'Monday'],
                [new Date('2007-12-31T23:59:59-02:00'), 'Tuesday'],
                [new Date('2023-04-23T12:23:34'), 'Sunday'],
                [new Date('2023-08-23T12:23:34'), 'Wednesday'],
                [new Date('2009-10-01T08:40:42'), 'Thursday'],
                [new Date('2023-09-23T12:23:34'), 'Saturday'],
                [new Date('2023-11-05T23:23:34'), 'Sunday'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'dddd'), el[1]);
            }
        });

        it('Should take locale into account', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'vendredi'],
                [new Date('2019-02-02T05:20:19+02:00'), 'samedi'],
                [new Date('2019-02-03T05:20:19+02:00'), 'dimanche'],
                [new Date('2019-02-04T05:20:19+02:00'), 'lundi'],
                [new Date('2019-02-05T05:20:19+02:00'), 'mardi'],
                [new Date('2019-02-06T05:20:19+02:00'), 'mercredi'],
                [new Date('2019-02-07T05:20:19+02:00'), 'jeudi'],
                [new Date('2019-02-08T05:20:19+02:00'), 'vendredi'],
                [new Date('2019-02-09T05:20:19+02:00'), 'samedi'],
                [new Date('2019-02-10T05:20:19+02:00'), 'dimanche'],
                [new Date('2019-02-11T05:20:19+02:00'), 'lundi'],
                [new Date('2019-02-12T05:20:19+02:00'), 'mardi'],
                [new Date('2019-02-13T05:20:19+02:00'), 'mercredi'],
                [new Date('2019-02-14T05:20:19+02:00'), 'jeudi'],
                [new Date('2019-02-15T05:20:19+02:00'), 'vendredi'],
                [new Date('2019-02-16T05:20:19+02:00'), 'samedi'],
                [new Date('2019-02-17T05:20:19+02:00'), 'dimanche'],
                [new Date('2019-02-18T05:20:19+02:00'), 'lundi'],
                [new Date('2019-02-19T05:20:19+02:00'), 'mardi'],
                [new Date('2019-02-20T05:20:19+02:00'), 'mercredi'],
                [new Date('2019-02-21T05:20:19+02:00'), 'jeudi'],
                [new Date('2019-02-22T05:20:19+02:00'), 'vendredi'],
                [new Date('2019-02-23T05:20:19+02:00'), 'samedi'],
                [new Date('2019-02-24T05:20:19+02:00'), 'dimanche'],
                [new Date('2019-02-25T05:20:19+02:00'), 'lundi'],
                [new Date('2019-02-26T05:20:19+02:00'), 'mardi'],
                [new Date('2019-02-27T05:20:19+02:00'), 'mercredi'],
                [new Date('2019-02-28T05:20:19+02:00'), 'jeudi'],
                [new Date('2019-02-29T05:20:19+02:00'), 'vendredi'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), 'jeudi'],
                [new Date('2007-12-31T23:59:59+02:00'), 'lundi'],
                [new Date('2007-12-31T23:59:59-02:00'), 'mardi'],
                [new Date('2023-04-23T12:23:34'), 'dimanche'],
                [new Date('2023-08-23T12:23:34'), 'mercredi'],
                [new Date('2009-10-01T08:40:42'), 'jeudi'],
                [new Date('2023-09-23T12:23:34'), 'samedi'],
                [new Date('2023-11-05T23:23:34'), 'dimanche'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'dddd', 'fr'), el[1]);
            }

            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'vrijdag'],
                [new Date('2019-02-02T05:20:19+02:00'), 'zaterdag'],
                [new Date('2019-02-03T05:20:19+02:00'), 'zondag'],
                [new Date('2019-02-04T05:20:19+02:00'), 'maandag'],
                [new Date('2019-02-05T05:20:19+02:00'), 'dinsdag'],
                [new Date('2019-02-06T05:20:19+02:00'), 'woensdag'],
                [new Date('2019-02-07T05:20:19+02:00'), 'donderdag'],
                [new Date('2019-02-08T05:20:19+02:00'), 'vrijdag'],
                [new Date('2019-02-09T05:20:19+02:00'), 'zaterdag'],
                [new Date('2019-02-10T05:20:19+02:00'), 'zondag'],
                [new Date('2019-02-11T05:20:19+02:00'), 'maandag'],
                [new Date('2019-02-12T05:20:19+02:00'), 'dinsdag'],
                [new Date('2019-02-13T05:20:19+02:00'), 'woensdag'],
                [new Date('2019-02-14T05:20:19+02:00'), 'donderdag'],
                [new Date('2019-02-15T05:20:19+02:00'), 'vrijdag'],
                [new Date('2019-02-16T05:20:19+02:00'), 'zaterdag'],
                [new Date('2019-02-17T05:20:19+02:00'), 'zondag'],
                [new Date('2019-02-18T05:20:19+02:00'), 'maandag'],
                [new Date('2019-02-19T05:20:19+02:00'), 'dinsdag'],
                [new Date('2019-02-20T05:20:19+02:00'), 'woensdag'],
                [new Date('2019-02-21T05:20:19+02:00'), 'donderdag'],
                [new Date('2019-02-22T05:20:19+02:00'), 'vrijdag'],
                [new Date('2019-02-23T05:20:19+02:00'), 'zaterdag'],
                [new Date('2019-02-24T05:20:19+02:00'), 'zondag'],
                [new Date('2019-02-25T05:20:19+02:00'), 'maandag'],
                [new Date('2019-02-26T05:20:19+02:00'), 'dinsdag'],
                [new Date('2019-02-27T05:20:19+02:00'), 'woensdag'],
                [new Date('2019-02-28T05:20:19+02:00'), 'donderdag'],
                [new Date('2019-02-29T05:20:19+02:00'), 'vrijdag'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), 'donderdag'],
                [new Date('2007-12-31T23:59:59+02:00'), 'maandag'],
                [new Date('2007-12-31T23:59:59-02:00'), 'dinsdag'],
                [new Date('2023-04-23T12:23:34'), 'zondag'],
                [new Date('2023-08-23T12:23:34'), 'woensdag'],
                [new Date('2009-10-01T08:40:42'), 'donderdag'],
                [new Date('2023-09-23T12:23:34'), 'zaterdag'],
                [new Date('2023-11-05T23:23:34'), 'zondag'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'dddd', 'nl'), el[1]);
            }

            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'sexta-feira'],
                [new Date('2019-02-02T05:20:19+02:00'), 'sábado'],
                [new Date('2019-02-03T05:20:19+02:00'), 'domingo'],
                [new Date('2019-02-04T05:20:19+02:00'), 'segunda-feira'],
                [new Date('2019-02-05T05:20:19+02:00'), 'terça-feira'],
                [new Date('2019-02-06T05:20:19+02:00'), 'quarta-feira'],
                [new Date('2019-02-07T05:20:19+02:00'), 'quinta-feira'],
                [new Date('2019-02-08T05:20:19+02:00'), 'sexta-feira'],
                [new Date('2019-02-09T05:20:19+02:00'), 'sábado'],
                [new Date('2019-02-10T05:20:19+02:00'), 'domingo'],
                [new Date('2019-02-11T05:20:19+02:00'), 'segunda-feira'],
                [new Date('2019-02-12T05:20:19+02:00'), 'terça-feira'],
                [new Date('2019-02-13T05:20:19+02:00'), 'quarta-feira'],
                [new Date('2019-02-14T05:20:19+02:00'), 'quinta-feira'],
                [new Date('2019-02-15T05:20:19+02:00'), 'sexta-feira'],
                [new Date('2019-02-16T05:20:19+02:00'), 'sábado'],
                [new Date('2019-02-17T05:20:19+02:00'), 'domingo'],
                [new Date('2019-02-18T05:20:19+02:00'), 'segunda-feira'],
                [new Date('2019-02-19T05:20:19+02:00'), 'terça-feira'],
                [new Date('2019-02-20T05:20:19+02:00'), 'quarta-feira'],
                [new Date('2019-02-21T05:20:19+02:00'), 'quinta-feira'],
                [new Date('2019-02-22T05:20:19+02:00'), 'sexta-feira'],
                [new Date('2019-02-23T05:20:19+02:00'), 'sábado'],
                [new Date('2019-02-24T05:20:19+02:00'), 'domingo'],
                [new Date('2019-02-25T05:20:19+02:00'), 'segunda-feira'],
                [new Date('2019-02-26T05:20:19+02:00'), 'terça-feira'],
                [new Date('2019-02-27T05:20:19+02:00'), 'quarta-feira'],
                [new Date('2019-02-28T05:20:19+02:00'), 'quinta-feira'],
                [new Date('2019-02-29T05:20:19+02:00'), 'sexta-feira'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), 'quinta-feira'],
                [new Date('2007-12-31T23:59:59+02:00'), 'segunda-feira'],
                [new Date('2007-12-31T23:59:59-02:00'), 'terça-feira'],
                [new Date('2023-04-23T12:23:34'), 'domingo'],
                [new Date('2023-08-23T12:23:34'), 'quarta-feira'],
                [new Date('2009-10-01T08:40:42'), 'quinta-feira'],
                [new Date('2023-09-23T12:23:34'), 'sábado'],
                [new Date('2023-11-05T23:23:34'), 'domingo'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'dddd', 'pt'), el[1]);
            }
        });
    });

    describe('token:ddd', () => {
        it('Should be correct', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'Fri'],
                [new Date('2019-02-02T05:20:19+02:00'), 'Sat'],
                [new Date('2019-02-03T05:20:19+02:00'), 'Sun'],
                [new Date('2019-02-04T05:20:19+02:00'), 'Mon'],
                [new Date('2019-02-05T05:20:19+02:00'), 'Tue'],
                [new Date('2019-02-06T05:20:19+02:00'), 'Wed'],
                [new Date('2019-02-07T05:20:19+02:00'), 'Thu'],
                [new Date('2019-02-08T05:20:19+02:00'), 'Fri'],
                [new Date('2019-02-09T05:20:19+02:00'), 'Sat'],
                [new Date('2019-02-10T05:20:19+02:00'), 'Sun'],
                [new Date('2019-02-11T05:20:19+02:00'), 'Mon'],
                [new Date('2019-02-12T05:20:19+02:00'), 'Tue'],
                [new Date('2019-02-13T05:20:19+02:00'), 'Wed'],
                [new Date('2019-02-14T05:20:19+02:00'), 'Thu'],
                [new Date('2019-02-15T05:20:19+02:00'), 'Fri'],
                [new Date('2019-02-16T05:20:19+02:00'), 'Sat'],
                [new Date('2019-02-17T05:20:19+02:00'), 'Sun'],
                [new Date('2019-02-18T05:20:19+02:00'), 'Mon'],
                [new Date('2019-02-19T05:20:19+02:00'), 'Tue'],
                [new Date('2019-02-20T05:20:19+02:00'), 'Wed'],
                [new Date('2019-02-21T05:20:19+02:00'), 'Thu'],
                [new Date('2019-02-22T05:20:19+02:00'), 'Fri'],
                [new Date('2019-02-23T05:20:19+02:00'), 'Sat'],
                [new Date('2019-02-24T05:20:19+02:00'), 'Sun'],
                [new Date('2019-02-25T05:20:19+02:00'), 'Mon'],
                [new Date('2019-02-26T05:20:19+02:00'), 'Tue'],
                [new Date('2019-02-27T05:20:19+02:00'), 'Wed'],
                [new Date('2019-02-28T05:20:19+02:00'), 'Thu'],
                [new Date('2019-02-29T05:20:19+02:00'), 'Fri'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), 'Thu'],
                [new Date('2007-12-31T23:59:59+02:00'), 'Mon'],
                [new Date('2007-12-31T23:59:59-02:00'), 'Tue'],
                [new Date('2023-04-23T12:23:34'), 'Sun'],
                [new Date('2023-08-23T12:23:34'), 'Wed'],
                [new Date('2009-10-01T08:40:42'), 'Thu'],
                [new Date('2023-09-23T12:23:34'), 'Sat'],
                [new Date('2023-11-05T23:23:34'), 'Sun'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'ddd'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            // When converted to Europe/Brussels the day should be next day
            assert.equal(format(new Date('2019-02-25T22:09:09-07:00'), 'ddd', 'en', 'Europe/Brussels'), 'Tue');

            // When converted to CST (which is one hour ahead of MST) it should still be same day
            assert.equal(format(new Date('2019-02-25T22:09:09-07:00'), 'ddd', 'en', 'CST'), 'Mon');

            // When converted to EST (which is two hours ahead of MST) it should be next day
            assert.equal(format(new Date('2019-02-25T22:09:09-07:00'), 'ddd', 'en', 'EST'), 'Tue');

            // When converted to MST (which is the same as the offset in the date) it should be same day
            assert.equal(format(new Date('2019-02-25T22:09:09-07:00'), 'ddd', 'en', 'MST'), 'Mon');
        });

        it('Should take locale into account', () => {
            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'ven.'],
                [new Date('2019-02-02T05:20:19+02:00'), 'sam.'],
                [new Date('2019-02-03T05:20:19+02:00'), 'dim.'],
                [new Date('2019-02-04T05:20:19+02:00'), 'lun.'],
                [new Date('2019-02-05T05:20:19+02:00'), 'mar.'],
                [new Date('2019-02-06T05:20:19+02:00'), 'mer.'],
                [new Date('2019-02-07T05:20:19+02:00'), 'jeu.'],
                [new Date('2019-02-08T05:20:19+02:00'), 'ven.'],
                [new Date('2019-02-09T05:20:19+02:00'), 'sam.'],
                [new Date('2019-02-10T05:20:19+02:00'), 'dim.'],
                [new Date('2019-02-11T05:20:19+02:00'), 'lun.'],
                [new Date('2019-02-12T05:20:19+02:00'), 'mar.'],
                [new Date('2019-02-13T05:20:19+02:00'), 'mer.'],
                [new Date('2019-02-14T05:20:19+02:00'), 'jeu.'],
                [new Date('2019-02-15T05:20:19+02:00'), 'ven.'],
                [new Date('2019-02-16T05:20:19+02:00'), 'sam.'],
                [new Date('2019-02-17T05:20:19+02:00'), 'dim.'],
                [new Date('2019-02-18T05:20:19+02:00'), 'lun.'],
                [new Date('2019-02-19T05:20:19+02:00'), 'mar.'],
                [new Date('2019-02-20T05:20:19+02:00'), 'mer.'],
                [new Date('2019-02-21T05:20:19+02:00'), 'jeu.'],
                [new Date('2019-02-22T05:20:19+02:00'), 'ven.'],
                [new Date('2019-02-23T05:20:19+02:00'), 'sam.'],
                [new Date('2019-02-24T05:20:19+02:00'), 'dim.'],
                [new Date('2019-02-25T05:20:19+02:00'), 'lun.'],
                [new Date('2019-02-26T05:20:19+02:00'), 'mar.'],
                [new Date('2019-02-27T05:20:19+02:00'), 'mer.'],
                [new Date('2019-02-28T05:20:19+02:00'), 'jeu.'],
                [new Date('2019-02-29T05:20:19+02:00'), 'ven.'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), 'jeu.'],
                [new Date('2007-12-31T23:59:59+02:00'), 'lun.'],
                [new Date('2007-12-31T23:59:59-02:00'), 'mar.'],
                [new Date('2023-04-23T12:23:34'), 'dim.'],
                [new Date('2023-08-23T12:23:34'), 'mer.'],
                [new Date('2009-10-01T08:40:42'), 'jeu.'],
                [new Date('2023-09-23T12:23:34'), 'sam.'],
                [new Date('2023-11-05T23:23:34'), 'dim.'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'ddd', 'fr'), el[1]);
            }

            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'vr'],
                [new Date('2019-02-02T05:20:19+02:00'), 'za'],
                [new Date('2019-02-03T05:20:19+02:00'), 'zo'],
                [new Date('2019-02-04T05:20:19+02:00'), 'ma'],
                [new Date('2019-02-05T05:20:19+02:00'), 'di'],
                [new Date('2019-02-06T05:20:19+02:00'), 'wo'],
                [new Date('2019-02-07T05:20:19+02:00'), 'do'],
                [new Date('2019-02-08T05:20:19+02:00'), 'vr'],
                [new Date('2019-02-09T05:20:19+02:00'), 'za'],
                [new Date('2019-02-10T05:20:19+02:00'), 'zo'],
                [new Date('2019-02-11T05:20:19+02:00'), 'ma'],
                [new Date('2019-02-12T05:20:19+02:00'), 'di'],
                [new Date('2019-02-13T05:20:19+02:00'), 'wo'],
                [new Date('2019-02-14T05:20:19+02:00'), 'do'],
                [new Date('2019-02-15T05:20:19+02:00'), 'vr'],
                [new Date('2019-02-16T05:20:19+02:00'), 'za'],
                [new Date('2019-02-17T05:20:19+02:00'), 'zo'],
                [new Date('2019-02-18T05:20:19+02:00'), 'ma'],
                [new Date('2019-02-19T05:20:19+02:00'), 'di'],
                [new Date('2019-02-20T05:20:19+02:00'), 'wo'],
                [new Date('2019-02-21T05:20:19+02:00'), 'do'],
                [new Date('2019-02-22T05:20:19+02:00'), 'vr'],
                [new Date('2019-02-23T05:20:19+02:00'), 'za'],
                [new Date('2019-02-24T05:20:19+02:00'), 'zo'],
                [new Date('2019-02-25T05:20:19+02:00'), 'ma'],
                [new Date('2019-02-26T05:20:19+02:00'), 'di'],
                [new Date('2019-02-27T05:20:19+02:00'), 'wo'],
                [new Date('2019-02-28T05:20:19+02:00'), 'do'],
                [new Date('2019-02-29T05:20:19+02:00'), 'vr'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), 'do'],
                [new Date('2007-12-31T23:59:59+02:00'), 'ma'],
                [new Date('2007-12-31T23:59:59-02:00'), 'di'],
                [new Date('2023-04-23T12:23:34'), 'zo'],
                [new Date('2023-08-23T12:23:34'), 'wo'],
                [new Date('2009-10-01T08:40:42'), 'do'],
                [new Date('2023-09-23T12:23:34'), 'za'],
                [new Date('2023-11-05T23:23:34'), 'zo'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'ddd', 'nl'), el[1]);
            }

            for (const el of [
                [new Date('2019-02-01T05:20:19+02:00'), 'sex.'],
                [new Date('2019-02-02T05:20:19+02:00'), 'sáb.'],
                [new Date('2019-02-03T05:20:19+02:00'), 'dom.'],
                [new Date('2019-02-04T05:20:19+02:00'), 'seg.'],
                [new Date('2019-02-05T05:20:19+02:00'), 'ter.'],
                [new Date('2019-02-06T05:20:19+02:00'), 'qua.'],
                [new Date('2019-02-07T05:20:19+02:00'), 'qui.'],
                [new Date('2019-02-08T05:20:19+02:00'), 'sex.'],
                [new Date('2019-02-09T05:20:19+02:00'), 'sáb.'],
                [new Date('2019-02-10T05:20:19+02:00'), 'dom.'],
                [new Date('2019-02-11T05:20:19+02:00'), 'seg.'],
                [new Date('2019-02-12T05:20:19+02:00'), 'ter.'],
                [new Date('2019-02-13T05:20:19+02:00'), 'qua.'],
                [new Date('2019-02-14T05:20:19+02:00'), 'qui.'],
                [new Date('2019-02-15T05:20:19+02:00'), 'sex.'],
                [new Date('2019-02-16T05:20:19+02:00'), 'sáb.'],
                [new Date('2019-02-17T05:20:19+02:00'), 'dom.'],
                [new Date('2019-02-18T05:20:19+02:00'), 'seg.'],
                [new Date('2019-02-19T05:20:19+02:00'), 'ter.'],
                [new Date('2019-02-20T05:20:19+02:00'), 'qua.'],
                [new Date('2019-02-21T05:20:19+02:00'), 'qui.'],
                [new Date('2019-02-22T05:20:19+02:00'), 'sex.'],
                [new Date('2019-02-23T05:20:19+02:00'), 'sáb.'],
                [new Date('2019-02-24T05:20:19+02:00'), 'dom.'],
                [new Date('2019-02-25T05:20:19+02:00'), 'seg.'],
                [new Date('2019-02-26T05:20:19+02:00'), 'ter.'],
                [new Date('2019-02-27T05:20:19+02:00'), 'qua.'],
                [new Date('2019-02-28T05:20:19+02:00'), 'qui.'],
                [new Date('2019-02-29T05:20:19+02:00'), 'sex.'], // Not a leap year
                [new Date('2024-02-29T05:20:19+02:00'), 'qui.'],
                [new Date('2007-12-31T23:59:59+02:00'), 'seg.'],
                [new Date('2007-12-31T23:59:59-02:00'), 'ter.'],
                [new Date('2023-04-23T12:23:34'), 'dom.'],
                [new Date('2023-08-23T12:23:34'), 'qua.'],
                [new Date('2009-10-01T08:40:42'), 'qui.'],
                [new Date('2023-09-23T12:23:34'), 'sáb.'],
                [new Date('2023-11-05T23:23:34'), 'dom.'],
            ] as [Date, string][]) {
                assert.equal(format(el[0], 'ddd', 'pt'), el[1]);
            }
        });
    });

});
