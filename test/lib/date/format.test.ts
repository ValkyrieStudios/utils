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
});
