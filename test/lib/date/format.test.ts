/* eslint-disable max-lines,max-statements */

import {describe, it, afterEach}   from 'node:test';
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

    it('Throw when passed a non-string for spec', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            assert.throws(
                () => format(new Date(), el),
                new TypeError('format: spec must be a string')
            );
        }
    });

    it('Throw when passed a non-string for locale', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            if (el === undefined) continue;
            assert.throws(
                () => format(new Date(), 'YYYY-MM-DD', el),
                new TypeError('format: locale must be a string')
            );
        }
    });

    it('Throw when passed a non-string for zone', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            if (el === undefined) continue;
            assert.throws(
                () => format(new Date(), 'YYYY-MM-DD', 'en', el),
                new TypeError('format: zone must be a string')
            );
        }
    });

    it('Return the date as an iso string when passed a spec not containing any tokens', () => {
        const d = new Date();
        assert.equal(format(d, 'nope'), d.toISOString());
    });

    it('Throw when passed a zone that can not be formatted', () => {
        assert.throws(
            () => format(new Date(), 'YYYY-MM-DD', 'en', 'myfancyzone'),
            new Error('format: Invalid zone passed - myfancyzone')
        );
    });

    it('Throw when passed a locale that can not be formatted', () => {
        assert.throws(
            () => format(new Date(), 'YYYY dddd', 'The force is strong'),
            new Error('format: Failed to run conversion for dddd with locale The force is strong')
        );
    });

    describe('setLocale and getLocale', () => {
        const DEFAULT = format.getLocale();

        afterEach(() => {
            format.setLocale(DEFAULT);
        });

        it('Should be a function', () => {
            assert.ok(typeof format.setLocale === 'function');
            assert.ok(typeof format.getLocale === 'function');
        });

        it('Should not be an async function', () => {
            assert.ok(format.setLocale.constructor.name !== 'AsyncFunction');
            assert.ok(format.getLocale.constructor.name !== 'AsyncFunction');
        });

        it('Should set and return the default locale when a valid locale is provided', () => {
            format.setLocale('fr-FR');
            assert.equal(format.getLocale(), 'fr-FR');
        });

        it('Should throw an error when a non-string value is provided', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                assert.throws(() => {
                    format.setLocale(el);
                }, new Error('format/setLocale: locale should be a string'));
            }
        });

        it('Should return the default locale', () => {
            assert.equal(format.getLocale(), 'en-US');
        });
    });

    describe('setZone and getZone', () => {
        const DEFAULT = format.getZone();

        afterEach(() => {
            format.setZone(DEFAULT);
        });

        it('Should be a function', () => {
            assert.ok(typeof format.setZone === 'function');
            assert.ok(typeof format.getZone === 'function');
        });

        it('Should not be an async function', () => {
            assert.ok(format.setZone.constructor.name !== 'AsyncFunction');
            assert.ok(format.getZone.constructor.name !== 'AsyncFunction');
        });

        it('Should set and return the default time zone when a valid zone is provided', () => {
            format.setZone('America/New_York');
            assert.equal(format.getZone(), 'America/New_York'); // Ensure the time zone was set correctly
        });

        it('Should throw an error when an invalid time zone is provided', () => {
            assert.throws(() => {
                format.setZone('Invalid/Zone');
            }, new Error('format/setZone: \'Invalid/Zone\' is not a valid zone'));
        });

        it('Should throw an error when a non-string value is provided', () => {
            for (const el of CONSTANTS.NOT_STRING) {
                assert.throws(() => {
                    format.setZone(el);
                }, new Error('format/setZone: zone should be a string'));
            }
        });

        it('Should return the default time zone', () => {
            assert.equal(format.getZone(), DEFAULT); // Ensure it returns the correct default time zone
        });
    });

    describe('setStartOfWeek and getStartOfWeek', () => {
        const DEFAULT = format.getStartOfWeek();

        afterEach(() => {
            format.setStartOfWeek(DEFAULT);
        });

        it('Should be a function', () => {
            assert.ok(typeof format.setStartOfWeek === 'function');
            assert.ok(typeof format.getStartOfWeek === 'function');
        });

        it('Should not be an async function', () => {
            assert.ok(format.setStartOfWeek.constructor.name !== 'AsyncFunction');
            assert.ok(format.getStartOfWeek.constructor.name !== 'AsyncFunction');
        });

        it('should set and return the default start of the week when a valid value is provided', () => {
            for (const el of ['mon', 'sat', 'sun']) {
                format.setStartOfWeek(el);
                assert.equal(format.getStartOfWeek(), el);
            }
        });

        it('should throw an error when an invalid start of the week is provided', () => {
            assert.throws(() => {
                format.setStartOfWeek('fri' as WEEK_START);
            }, new Error('format/setStartOfWeek: sow should be a valid start of week'));
        });

        it('should throw an error when a non-string value is provided', () => {
            for (const el of CONSTANTS.NOT_STRING) {
                assert.throws(() => {
                    format.setStartOfWeek(el);
                }, new Error('format/setStartOfWeek: sow should be a valid start of week'));
            }
        });

        it('should return the default start of the week', () => {
            assert.equal(format.getStartOfWeek(), 'mon');
        });
    });

    it('Specific Cases: Default locale - UTC - Should format different combinations of tokens correctly', () => {
        for (const el of [
            {s: 'YYYY-MM-DD HH:mm:ss', i: '2022-03-06T08:30:45Z', o: '2022-03-06 08:30:45'},
            {s: 'ddd, YYYY Q Q M D', i: '2021-12-01T18:20:30Z', o: 'Wed, 2021 4 4 12 1'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2023-08-22T09:15:30Z', o: '2023-08-22 9:15:30'},
            {s: 'MMM D, YYYY [at] hh:mm A', i: '2022-07-10T03:30:45+02:00', o: 'Jul 10, 2022 at 01:30 AM'},
            {s: 'dddd, YYYY Q Q M D', i: '2022-11-30T23:59:59Z', o: 'Wednesday, 2022 4 4 11 30'},
            {s: 'YYYY/MM/DD HH:mm:ss', i: '2023-02-14T16:10:15Z', o: '2023/02/14 16:10:15'},
            {s: 'ddd, YYYY Q Q M D', i: '2023-04-18T04:45:30Z', o: 'Tue, 2023 2 2 4 18'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2021-06-07T06:25:10Z', o: '2021-06-07 6:25:10'},
            {s: 'MMMM D, YYYY [at] h:mm A', i: '2023-01-10T15:20:30Z', o: 'January 10, 2023 at 3:20 PM'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2022-08-17T08:55:15Z', o: '2022-08-17 8:55:15'},
            {s: 'YYYY/MM/DD HH:mm:ss', i: '2023-05-29T19:15:30Z', o: '2023/05/29 19:15:30'},
            {s: 'MMMM D, YYYY [at] h:mm A', i: '2022-02-28T04:25:00Z', o: 'February 28, 2022 at 4:25 AM'},
            {s: 'ddd, YYYY Q Q M D', i: '2021-09-12T10:45:30Z', o: 'Sun, 2021 3 3 9 12'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2022-06-03T14:30:10Z', o: '2022-06-03 14:30:10'},
            {s: 'MMMM D, YYYY [at] h:mm A', i: '2023-07-20T12:45:00Z', o: 'July 20, 2023 at 12:45 PM'},
            {s: 'ddd, YYYY Q Q M D', i: '2022-11-05T08:30:15Z', o: 'Sat, 2022 4 4 11 5'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2021-03-08T23:55:30Z', o: '2021-03-08 23:55:30'},
            {s: 'dddd, YYYY Q Q M D', i: '2023-04-01T18:10:00Z', o: 'Saturday, 2023 2 2 4 1'},
            {s: 'YYYY/MM/DD HH:mm:ss', i: '2021-09-30T17:45:20Z', o: '2021/09/30 17:45:20'},
            {s: 'ddd, YYYY Q Q M D', i: '2023-02-10T14:15:30Z', o: 'Fri, 2023 1 1 2 10'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2022-12-18T05:00:45Z', o: '2022-12-18 5:00:45'},
            {s: 'MMM D, YYYY [at] hh:mm A', i: '2021-07-07T21:08:15-04:00', o: 'Jul 8, 2021 at 01:08 AM'},
            {s: '[Today is] dddd, MMMM D, YYYY [at] h:mm A', i: '2023-01-10T14:30:00Z', o: 'Today is Tuesday, January 10, 2023 at 2:30 PM'},
            {s: 'YYYY [esc] Q Q M D [chars]', i: '2022-05-25T12:15:45Z', o: '2022 esc 2 2 5 25 chars'},
            {s: 'ddd, YYYY [random] Q Q M D [words]', i: '2023-09-05T08:45:30Z', o: 'Tue, 2023 random 3 3 9 5 words'},
            {s: 'YYYY [esc] Q Q M D [words]', i: '2023-06-18T10:10:00Z', o: '2023 esc 2 2 6 18 words'},
            {s: 'dddd, [Year] Q Q M D [at] hh:mm A', i: '2023-11-28T14:30:45Z', o: 'Tuesday, Year 4 4 11 28 at 02:30 PM'},
            {s: 'YYYY [esc] Q Q M D [chars]', i: '2022-01-01T08:00:00Z', o: '2022 esc 1 1 1 1 chars'},
            {s: 'YYYY [esc:] Q Q M D [chars]', i: '2022-01-01T08:00:00Z', o: '2022 esc: 1 1 1 1 chars'},
        ]) {
            assert.equal(format(new Date(el.i), el.s, 'en', 'UTC'), el.o);
            assert.equal(format(el.i, el.s, 'en', 'UTC'), el.o);
        }
    });

    it('Specific Cases: French locale - UTC Should format different combinations of tokens correctly', () => {
        for (const el of [
            {s: 'YYYY-MM-DD HH:mm:ss', i: '2022-03-06T08:30:45Z', o: '2022-03-06 08:30:45'},
            {s: 'ddd, YYYY Q Q M D', i: '2021-12-01T18:20:30Z', o: 'mer., 2021 4 4 12 1'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2023-08-22T09:15:30Z', o: '2023-08-22 9:15:30'},
            {s: 'MMM D, YYYY [à] hh:mm A', i: '2022-07-10T03:30:45+02:00', o: 'juil. 10, 2022 à 01:30 AM'},
            {s: 'dddd, YYYY Q Q M D', i: '2022-11-30T23:59:59Z', o: 'mercredi, 2022 4 4 11 30'},
            {s: 'YYYY/MM/DD HH:mm:ss', i: '2023-02-14T16:10:15Z', o: '2023/02/14 16:10:15'},
            {s: 'ddd, YYYY Q Q M D', i: '2023-04-18T04:45:30Z', o: 'mar., 2023 2 2 4 18'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2021-06-07T06:25:10Z', o: '2021-06-07 6:25:10'},
            {s: 'MMMM D, YYYY [à] h:mm A', i: '2023-01-10T15:20:30Z', o: 'janvier 10, 2023 à 3:20 PM'},
            {s: 'ddd, YYYY Q Q M D', i: '2022-04-25T12:40:00Z', o: 'lun., 2022 2 2 4 25'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2022-08-17T08:55:15Z', o: '2022-08-17 8:55:15'},
            {s: 'dddd, YYYY Q Q M D', i: '2021-11-15T05:30:00Z', o: 'lundi, 2021 4 4 11 15'},
            {s: 'YYYY/MM/DD HH:mm:ss', i: '2023-05-29T19:15:30Z', o: '2023/05/29 19:15:30'},
            {s: 'MMMM D, YYYY [à] h:mm A', i: '2022-02-28T04:25:00Z', o: 'février 28, 2022 à 4:25 AM'},
            {s: 'ddd, YYYY Q Q M D', i: '2021-09-12T10:45:30Z', o: 'dim., 2021 3 3 9 12'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2022-06-03T14:30:10Z', o: '2022-06-03 14:30:10'},
            {s: 'MMM D, YYYY [à] hh:mm A', i: '2023-04-05T18:40:45+03:00', o: 'avr. 5, 2023 à 03:40 PM'},
            {s: 'MMMM D, YYYY [à] h:mm A', i: '2023-07-20T12:45:00Z', o: 'juillet 20, 2023 à 12:45 PM'},
            {s: 'ddd, YYYY Q Q M D', i: '2022-11-05T08:30:15Z', o: 'sam., 2022 4 4 11 5'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2021-03-08T23:55:30Z', o: '2021-03-08 23:55:30'},
            {s: 'dddd, YYYY Q Q M D', i: '2023-04-01T18:10:00Z', o: 'samedi, 2023 2 2 4 1'},
            {s: 'YYYY/MM/DD HH:mm:ss', i: '2021-09-30T17:45:20Z', o: '2021/09/30 17:45:20'},
            {s: 'MMMM D, YYYY [à] h:mm A', i: '2022-08-01T09:35:00Z', o: 'août 1, 2022 à 9:35 AM'},
            {s: 'ddd, YYYY Q Q M D', i: '2023-02-10T14:15:30Z', o: 'ven., 2023 1 1 2 10'},
            {s: 'YYYY-MM-DD H:mm:ss', i: '2022-12-18T05:00:45Z', o: '2022-12-18 5:00:45'},
            {s: 'MMM D, YYYY [à] hh:mm A', i: '2021-07-07T21:08:15-04:00', o: 'juil. 8, 2021 à 01:08 AM'},
            {s: 'YYYY [esc] Q Q M D [chars]', i: '2022-05-25T12:15:45Z', o: '2022 esc 2 2 5 25 chars'},
            {s: 'ddd, YYYY [random] Q Q M D [words]', i: '2023-09-05T08:45:30Z', o: 'mar., 2023 random 3 3 9 5 words'},
            {s: '[Test] MMM D, YYYY [string] h:mm A', i: '2022-08-15T18:20:00Z', o: 'Test août 15, 2022 string 6:20 PM'},
            {s: 'YYYY [esc] Q Q M D [words]', i: '2023-06-18T10:10:00Z', o: '2023 esc 2 2 6 18 words'},
            {s: '[Test] MMM D, YYYY [string] h:mm A', i: '2022-04-07T21:05:15Z', o: 'Test avr. 7, 2022 string 9:05 PM'},
            {s: 'dddd, [Year] Q Q M D [à] hh:mm A [string]', i: '2022-07-14T16:40:30Z', o: 'jeudi, Year 3 3 7 14 à 04:40 PM string'},
            {s: 'YYYY [esc] Q Q M D [chars]', i: '2022-01-01T08:00:00Z', o: '2022 esc 1 1 1 1 chars'},
            {s: 'dddd, [Year] Q Q M D [à] hh:mm A [string]', i: '2022-07-14T16:40:30Z', o: 'jeudi, Year 3 3 7 14 à 04:40 PM string'},
            {s: 'ISO', i: '2022-07-14T16:40:30Z', o: '2022-07-14T16:40:30.000Z'},
        ]) {
            assert.equal(format(new Date(el.i), el.s, 'fr', 'UTC'), el.o);
            assert.equal(format(el.i, el.s, 'fr', 'UTC'), el.o);
        }
    });

    it('Specific Cases: French locale - Different Timezones Should format different combinations of tokens correctly', () => {
        for (const el of [
            {
                s: 'YYYY-MM-DD HH:mm:ss',
                i: '2022-03-06T08:30:45Z',
                o: '2022-03-06 09:30:45',
                tz: 'Europe/Paris',
            }, {
                s: 'ddd, YYYY Q Q M D',
                i: '2021-12-01T18:20:30Z',
                o: 'mer., 2021 4 4 12 1',
                tz: 'America/Montreal',
            }, {
                s: 'YYYY-MM-DD H:mm:ss',
                i: '2023-08-22T09:15:30Z',
                o: '2023-08-22 10:15:30',
                tz: 'Africa/Casablanca',
            }, {
                s: 'MMM D, YYYY [à] hh:mm A',
                i: '2022-07-10T03:30:45+02:00',
                o: 'juil. 10, 2022 à 04:30 AM',
                tz: 'Asia/Beirut',
            }, {
                s: 'dddd, YYYY Q Q M D',
                i: '2022-11-30T23:59:59Z',
                o: 'jeudi, 2022 4 4 12 1',
                tz: 'Europe/Paris',
            }, {
                s: 'YYYY/MM/DD HH:mm:ss',
                i: '2023-02-14T16:10:15Z',
                o: '2023/02/15 05:10:15',
                tz: 'Pacific/Auckland',
            }, {
                s: 'YYYY-MM-DD H:mm:ss',
                i: '2022-08-17T08:55:15Z',
                o: '2022-08-17 4:55:15',
                tz: 'America/New_York',
            }, {
                s: 'dddd, YYYY Q Q M D',
                i: '2021-11-15T05:30:00Z',
                o: 'lundi, 2021 4 4 11 15',
                tz: 'Europe/London',
            }, {
                s: 'YYYY/MM/DD HH:mm:ss',
                i: '2023-05-29T19:15:30Z',
                o: '2023/05/30 04:15:30',
                tz: 'Asia/Tokyo',
            }, {
                s: 'MMMM D, YYYY [à] h:mm A',
                i: '2022-02-28T04:25:00Z',
                o: 'février 28, 2022 à 5:25 AM',
                tz: 'Europe/Paris',
            }, {
                s: 'ddd, YYYY Q Q M D',
                i: '2021-09-12T10:45:30Z',
                o: 'dim., 2021 3 3 9 12',
                tz: 'America/Los_Angeles',
            }, {
                s: 'YYYY-MM-DD H:mm:ss',
                i: '2022-06-03T14:30:10Z',
                o: '2022-06-04 0:30:10',
                tz: 'Australia/Sydney',
            }, {
                s: 'MMM D, YYYY [à] hh:mm A',
                i: '2023-04-05T18:40:45+03:00',
                o: 'avr. 5, 2023 à 06:40 PM',
                tz: 'Europe/Athens',
            }, {
                s: 'MMMM D, YYYY [à] h:mm A',
                i: '2023-07-20T12:45:00Z',
                o: 'juillet 20, 2023 à 7:45 AM',
                tz: 'America/Chicago',
            }, {
                s: 'ddd, YYYY Q Q M D',
                i: '2022-11-05T08:30:15Z',
                o: 'sam., 2022 4 4 11 5',
                tz: 'Asia/Shanghai',
            }, {
                s: 'YYYY-MM-DD H:mm:ss',
                i: '2021-03-08T23:55:30Z',
                o: '2021-03-09 0:55:30',
                tz: 'Europe/Berlin',
            }, {
                s: 'dddd, YYYY Q Q M D',
                i: '2023-04-01T18:10:00Z',
                o: 'samedi, 2023 2 2 4 1',
                tz: 'America/Denver',
            }, {
                s: 'YYYY/MM/DD HH:mm:ss',
                i: '2021-09-30T17:45:20Z',
                o: '2021/10/01 06:45:20',
                tz: 'Pacific/Auckland',
            }, {
                s: 'MMMM D, YYYY [à] h:mm A',
                i: '2022-08-01T09:35:00Z',
                o: 'août 1, 2022 à 11:35 AM',
                tz: 'Europe/Amsterdam',
            }, {
                s: 'ddd, YYYY Q Q M D',
                i: '2023-02-10T14:15:30Z',
                o: 'ven., 2023 1 1 2 10',
                tz: 'America/Phoenix',
            }, {
                s: 'YYYY-MM-DD H:mm:ss',
                i: '2022-12-18T05:00:45Z',
                o: '2022-12-18 7:00:45',
                tz: 'Africa/Cairo',
            }, {
                s: 'MMM D, YYYY [à] hh:mm A',
                i: '2021-07-07T21:08:15-04:00',
                o: 'juil. 7, 2021 à 09:08 PM',
                tz: 'America/Toronto',
            }, {
                s: 'YYYY [esc] Q Q M D [chars]',
                i: '2022-05-25T12:15:45Z',
                o: '2022 esc 2 2 5 25 chars',
                tz: 'Asia/Kolkata',
            }, {
                s: 'ddd, YYYY [random] Q Q M D [words]',
                i: '2023-09-05T08:45:30Z',
                o: 'mar., 2023 random 3 3 9 5 words',
                tz: 'America/Vancouver',
            }, {
                s: '[Test] MMM D, YYYY [string] h:mm A',
                i: '2022-08-15T18:20:00Z',
                o: 'Test août 15, 2022 string 9:20 PM',
                tz: 'Europe/Bucharest',
            }, {
                s: 'YYYY [esc] Q Q M D [words]',
                i: '2023-06-18T10:10:00Z',
                o: '2023 esc 2 2 6 18 words',
                tz: 'America/Detroit',
            }, {
                s: '[Test] MMM D, YYYY [string] h:mm A',
                i: '2022-04-07T21:05:15Z',
                o: 'Test avr. 7, 2022 string 11:05 PM',
                tz: 'Europe/Madrid',
            }, {
                s: 'dddd, [Year] Q Q M D [à] hh:mm A [string]',
                i: '2022-07-14T16:40:30Z',
                o: 'jeudi, Year 3 3 7 14 à 09:40 AM string',
                tz: 'America/Phoenix',
            }, {
                s: 'YYYY [esc] Q Q M D [chars]',
                i: '2022-01-01T08:00:00Z',
                o: '2022 esc 1 1 1 1 chars',
                tz: 'Africa/Lagos',
            }, {
                s: 'dddd, [Year] Q Q M D [à] hh:mm A [string]',
                i: '2022-07-14T16:40:30Z',
                o: 'vendredi, Year 3 3 7 15 à 12:40 AM string',
                tz: 'Asia/Singapore',
            }, {
                s: 'ISO',
                i: '2022-07-14T16:40:30Z',
                o: '2022-07-15T00:40:30.000Z',
                tz: 'Asia/Singapore',
            },
        ]) {
            assert.equal(format(new Date(el.i), el.s, 'fr', el.tz), el.o);
            assert.equal(format(el.i, el.s, 'fr', el.tz), el.o);
        }
    });

    it('Specific Cases - Dutch locale', () => {
        for (const el of [
            {s: 'dddd l t', i: '2024-10-05T23:58:58.000Z', o: 'zondag 06-10-2024 01:58', tz: 'Europe/Brussels'},
            {s: 'dddd l t', i: '2024-10-05T23:58:58.000Z', o: 'zaterdag 05-10-2024 23:58', tz: 'UTC'},
            {
                s: 'YYYY [esc] Q Q M D [chars]',
                i: '2022-05-25T12:15:45Z',
                o: '2022 esc 2 2 5 25 chars',
                tz: 'Asia/Kolkata',
            },
            {
                s: 'MMM D, YYYY [à] hh:mm A',
                i: '2021-07-07T21:08:15-04:00',
                o: 'jul 7, 2021 à 09:08 PM',
                tz: 'America/Toronto',
            },
            {
                s: 'ISO',
                i: '2021-07-07T21:08:15-04:00',
                o: '2021-07-07T21:08:15.000Z',
                tz: 'America/Toronto',
            },
            {
                s: 'ISO',
                i: '2022-05-25T12:15:45Z',
                o: '2022-05-25T17:45:45.000Z',
                tz: 'Asia/Kolkata',
            },
        ]) {
            assert.equal(format(new Date(el.i), el.s, 'nl', el.tz), el.o);
            assert.equal(format(el.i, el.s, 'nl', el.tz), el.o);
        }
    });

    describe('token:YYYY', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', '2019'],
                ['2007-12-31T23:59:59+02:00', '2007'],
                ['2007-12-31T23:59:59-02:00', '2008'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'YYYY'), el[1]);
                assert.equal(format(el[0], 'YYYY'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            assert.equal(format(new Date('2019-02-01T05:20:19+02:00'), 'YYYY', 'fr'), '2019');
            assert.equal(format('2019-02-01T05:20:19+02:00', 'YYYY', 'fr'), '2019');
        });
    });

    describe('token:Q', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', '1'],
                ['2007-12-31T23:59:59+02:00', '4'],
                ['2007-12-31T23:59:59-02:00', '1'],
                ['2023-05-23T12:23:34', '2'],
                ['2023-08-23T12:23:34', '3'],
                ['2023-09-23T12:23:34', '3'],
                ['2023-11-05T23:23:34', '4'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'Q'), el[1]);
                assert.equal(format(el[0], 'Q'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            assert.equal(format(new Date('2019-02-01T05:20:19+02:00'), 'Q', 'fr'), '1');
            assert.equal(format('2019-02-01T05:20:19+02:00', 'Q', 'fr'), '1');
        });
    });

    describe('token:MMMM', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'February'],
                ['2007-12-31T23:59:59+02:00', 'December'],
                ['2007-12-31T23:59:59-02:00', 'January'],
                ['2023-05-23T12:23:34.000Z', 'May'],
                ['2023-04-23T12:23:34.000Z', 'April'],
                ['2023-08-23T12:23:34.000Z', 'August'],
                ['2023-09-23T12:23:34.000Z', 'September'],
                ['2023-11-05T23:23:34.000Z', 'November'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'MMMM'), el[1]);
                assert.equal(format(el[0], 'MMMM'), el[1]);
            }
        });

        it('Should take locale into account', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'février'],
                ['2007-12-31T23:59:59+02:00', 'décembre'],
                ['2007-12-31T23:59:59-02:00', 'janvier'],
                ['2023-05-23T12:23:34', 'mai'],
                ['2023-04-23T12:23:34', 'avril'],
                ['2023-08-23T12:23:34', 'août'],
                ['2023-09-23T12:23:34', 'septembre'],
                ['2023-11-05T23:23:34', 'novembre'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'MMMM', 'fr'), el[1]);
                assert.equal(format(el[0], 'MMMM', 'fr'), el[1]);
            }

            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'februari'],
                ['2007-12-31T23:59:59+02:00', 'december'],
                ['2007-12-31T23:59:59-02:00', 'januari'],
                ['2023-05-23T12:23:34', 'mei'],
                ['2023-08-23T12:23:34', 'augustus'],
                ['2023-09-23T12:23:34', 'september'],
                ['2023-11-05T23:23:34', 'november'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'MMMM', 'nl'), el[1]);
                assert.equal(format(el[0], 'MMMM', 'nl'), el[1]);
            }

            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'fevereiro'],
                ['2007-12-31T23:59:59+02:00', 'dezembro'],
                ['2007-12-31T23:59:59-02:00', 'janeiro'],
                ['2023-05-23T12:23:34', 'maio'],
                ['2023-08-23T12:23:34', 'agosto'],
                ['2023-09-23T12:23:34', 'setembro'],
                ['2023-11-05T23:23:34', 'novembro'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'MMMM', 'pt'), el[1]);
                assert.equal(format(el[0], 'MMMM', 'pt'), el[1]);
            }
        });
    });

    describe('token:MMM', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'Feb'],
                ['2007-12-31T23:59:59+02:00', 'Dec'],
                ['2007-12-31T23:59:59-02:00', 'Jan'],
                ['2023-04-23T12:23:34', 'Apr'],
                ['2023-08-23T12:23:34', 'Aug'],
                ['2023-09-23T12:23:34', 'Sep'],
                ['2023-11-05T23:23:34', 'Nov'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'MMM'), el[1]);
                assert.equal(format(el[0], 'MMM'), el[1]);
            }
        });

        it('Should take locale into account', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'févr.'],
                ['2007-12-31T23:59:59+02:00', 'déc.'],
                ['2007-12-31T23:59:59-02:00', 'janv.'],
                ['2023-05-23T12:23:34', 'mai'],
                ['2023-08-23T12:23:34', 'août'],
                ['2023-09-23T12:23:34', 'sept.'],
                ['2023-11-05T23:23:34', 'nov.'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'MMM', 'fr'), el[1]);
                assert.equal(format(el[0], 'MMM', 'fr'), el[1]);
            }

            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'feb'],
                ['2007-12-31T23:59:59+02:00', 'dec'],
                ['2007-12-31T23:59:59-02:00', 'jan'],
                ['2023-05-23T12:23:34', 'mei'],
                ['2023-08-23T12:23:34', 'aug'],
                ['2023-09-23T12:23:34', 'sep'],
                ['2023-11-05T23:23:34', 'nov'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'MMM', 'nl'), el[1]);
                assert.equal(format(el[0], 'MMM', 'nl'), el[1]);
            }

            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'fev.'],
                ['2007-12-31T23:59:59+02:00', 'dez.'],
                ['2007-12-31T23:59:59-02:00', 'jan.'],
                ['2023-05-23T12:23:34', 'mai.'],
                ['2023-08-23T12:23:34', 'ago.'],
                ['2023-09-23T12:23:34', 'set.'],
                ['2023-11-05T23:23:34', 'nov.'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'MMM', 'pt'), el[1]);
                assert.equal(format(el[0], 'MMM', 'pt'), el[1]);
            }
        });
    });

    describe('token:MM', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', '02'],
                ['2007-12-31T23:59:59+02:00', '12'],
                ['2007-12-31T23:59:59-02:00', '01'],
                ['2023-04-23T12:23:34', '04'],
                ['2023-08-23T12:23:34', '08'],
                ['2009-10-01T08:40:42', '10'],
                ['2023-09-23T12:23:34', '09'],
                ['2023-11-05T23:23:34', '11'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'MM'), el[1]);
                assert.equal(format(el[0], 'MM'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', '02'],
                ['2007-12-31T23:59:59+02:00', '12'],
                ['2007-12-31T23:59:59-02:00', '01'],
                ['2023-04-23T12:23:34', '04'],
                ['2023-08-23T12:23:34', '08'],
                ['2009-10-01T08:40:42', '10'],
                ['2023-09-23T12:23:34', '09'],
                ['2023-11-05T23:23:34', '11'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'MM', 'fr'), el[1]);
                assert.equal(format(el[0], 'MM', 'fr'), el[1]);
            }
        });
    });

    describe('token:M', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', '2'],
                ['2007-12-31T23:59:59+02:00', '12'],
                ['2007-12-31T23:59:59-02:00', '1'],
                ['2023-04-23T12:23:34', '4'],
                ['2023-08-23T12:23:34', '8'],
                ['2009-10-01T08:40:42', '10'],
                ['2023-09-23T12:23:34', '9'],
                ['2023-11-05T23:23:34', '11'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'M'), el[1]);
                assert.equal(format(el[0], 'M'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', '2'],
                ['2007-12-31T23:59:59+02:00', '12'],
                ['2007-12-31T23:59:59-02:00', '1'],
                ['2023-04-23T12:23:34', '4'],
                ['2023-08-23T12:23:34', '8'],
                ['2009-10-01T08:40:42', '10'],
                ['2023-09-23T12:23:34', '9'],
                ['2023-11-05T23:23:34', '11'],
            ] as [string, string][]) {
                assert.equal(format(new Date(el[0]), 'M', 'fr'), el[1]);
                assert.equal(format(el[0], 'M', 'fr'), el[1]);
            }
        });
    });

    describe('token:WW', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2023-01-01T00:00:00Z', '52'], // Week 52 of the previous year
                ['2023-01-02T00:00:00Z', '01'], // First week of the year
                ['2023-02-01T00:00:00Z', '05'], // February 1st
                ['2023-03-15T00:00:00Z', '11'], // March 15th
                ['2023-04-01T00:00:00Z', '13'], // April 1st
                ['2023-05-20T00:00:00Z', '20'], // May 20th
                ['2023-06-30T00:00:00Z', '26'], // June 30th
                ['2023-07-14T00:00:00Z', '28'], // July 14th
                ['2023-08-25T00:00:00Z', '34'], // August 25th
                ['2023-09-10T00:00:00Z', '36'], // September 10th
                ['2023-10-31T00:00:00Z', '44'], // October 31st
                ['2023-11-15T00:00:00Z', '46'], // November 15th
                ['2023-12-24T00:00:00Z', '51'], // December 24th
                ['2023-12-31T00:00:00Z', '52'], // Last week of the year
                ['2024-01-01T00:00:00Z', '01'], // First week of the next year (2024 is a leap year)
                ['2024-01-07T00:00:00Z', '01'], // January 7th, still week 1
                ['2024-02-29T00:00:00Z', '09'], // Leap day
                ['2024-06-15T00:00:00Z', '24'], // Mid-year
                ['2024-12-30T00:00:00Z', '01'], // Last week spills into the first week of the next year
                ['2025-01-01T00:00:00Z', '01'], // First week of 2025
                ['2025-03-31T00:00:00Z', '14'], // March 31st, 2025
                ['2025-12-31T00:00:00Z', '01'], // Last day of 2025, spills into week 1 of 2026
                ['2026-12-31T00:00:00Z', '53'], // End of 2026, which has 53 weeks
            ]) {
                assert.equal(format(new Date(el[0]), 'WW'), el[1]);
                assert.equal(format(el[0], 'WW'), el[1]);
            }
        });
    });

    describe('token:W', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2023-01-01T00:00:00Z', '52'],
                ['2023-01-02T00:00:00Z', '1'],
                ['2023-02-01T00:00:00Z', '5'],
                ['2023-03-15T00:00:00Z', '11'],
                ['2023-04-01T00:00:00Z', '13'],
                ['2023-05-20T00:00:00Z', '20'],
                ['2023-06-30T00:00:00Z', '26'],
                ['2023-07-14T00:00:00Z', '28'],
                ['2023-08-25T00:00:00Z', '34'],
                ['2023-09-10T00:00:00Z', '36'],
                ['2023-10-31T00:00:00Z', '44'],
                ['2023-11-15T00:00:00Z', '46'],
                ['2023-12-24T00:00:00Z', '51'],
                ['2023-12-31T00:00:00Z', '52'],
                ['2024-01-01T00:00:00Z', '1'],
                ['2024-01-07T00:00:00Z', '1'],
                ['2024-02-29T00:00:00Z', '9'],
                ['2024-06-15T00:00:00Z', '24'],
                ['2024-12-30T00:00:00Z', '1'],
                ['2025-01-01T00:00:00Z', '1'],
                ['2025-03-31T00:00:00Z', '14'],
                ['2025-12-31T00:00:00Z', '1'],
                ['2026-12-31T00:00:00Z', '53'],
            ]) {
                assert.equal(format(new Date(el[0]), 'W'), el[1]);
                assert.equal(format(el[0], 'W'), el[1]);
            }
        });
    });

    describe('token:WW sow:sun', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2023-01-01T00:00:00Z', '01'], // Jan 1st, 2023 is Sunday, so week 1
                ['2023-01-07T00:00:00Z', '01'], // Jan 7th, 2023 is still in week 1
                ['2023-01-08T00:00:00Z', '02'], // Jan 8th, 2023 is Sunday, start of week 2
                ['2023-02-01T00:00:00Z', '05'], // Feb 1st, 2023 is in week 5
                ['2023-03-15T00:00:00Z', '11'], // Mar 15th, 2023 is in week 11
                ['2023-04-01T00:00:00Z', '13'], // Apr 1st, 2023 is in week 13
                ['2023-05-20T00:00:00Z', '20'], // May 20th, 2023 is in week 20
                ['2023-06-30T00:00:00Z', '26'], // Jun 30th, 2023 is in week 26
                ['2023-07-14T00:00:00Z', '28'], // Jul 14th, 2023 is in week 28
                ['2023-08-25T00:00:00Z', '34'], // Aug 25th, 2023 is in week 34
                ['2023-09-10T00:00:00Z', '37'], // Sep 10th, 2023 is in week 37
                ['2023-10-31T00:00:00Z', '44'], // Oct 31st, 2023 is in week 44
                ['2023-11-15T00:00:00Z', '46'], // Nov 15th, 2023 is in week 46
                ['2023-12-24T00:00:00Z', '52'], // Dec 24th, 2023 is Sunday, start of week 52
                ['2023-12-31T00:00:00Z', '53'], // Dec 31st, 2023 is Sunday, start of week 53
                ['2024-01-01T00:00:00Z', '01'], // Jan 1st, 2024 is in week 1
                ['2024-01-07T00:00:00Z', '02'], // Jan 7th, 2024 is in week 2
                ['2024-01-08T00:00:00Z', '02'], // Jan 8th, 2024 is in week 2
                ['2024-02-29T00:00:00Z', '09'], // Feb 29th, 2024 is in week 9 (leap year)
                ['2024-06-15T00:00:00Z', '24'], // Jun 15th, 2024 is in week 24
                ['2024-12-30T00:00:00Z', '53'], // Dec 30th, 2024 is in week 53
                ['2024-01-02T00:00:00Z', '01'], // Jan 2nd, 2024 is in week 1 (Leap Year)
                ['2024-12-28T00:00:00Z', '52'], // Dec 28th, 2024 is in week 52 (End of Leap Year)
                ['2024-12-29T00:00:00Z', '53'], // Dec 29th, 2024 is in week 53 (End of Leap Year)
                ['2024-12-26T00:00:00Z', '52'], // Dec 26th, 2024 is in week 52 (Thursday)
                ['2024-12-01T00:00:00Z', '49'], // Dec 1st, 2024 is in week 48
                ['2023-12-30T00:00:00Z', '52'], // Dec 30th, 2023 is in week 52
            ]) {
                assert.equal(format(new Date(el[0]), 'WW', 'en', 'Europe/Brussels', 'sun'), el[1]);
                assert.equal(format(el[0], 'WW', 'en', 'Europe/Brussels', 'sun'), el[1]);
            }
        });
    });

    describe('token:W sow:sun', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2023-01-01T00:00:00Z', '1'], // Jan 1st, 2023 is Sunday, so week 1
                ['2023-01-07T00:00:00Z', '1'], // Jan 7th, 2023 is still in week 1
                ['2023-01-08T00:00:00Z', '2'], // Jan 8th, 2023 is Sunday, start of week 2
                ['2023-02-01T00:00:00Z', '5'], // Feb 1st, 2023 is in week 5
                ['2023-03-15T00:00:00Z', '11'], // Mar 15th, 2023 is in week 11
                ['2023-04-01T00:00:00Z', '13'], // Apr 1st, 2023 is in week 13
                ['2023-05-20T00:00:00Z', '20'], // May 20th, 2023 is in week 20
                ['2023-06-30T00:00:00Z', '26'], // Jun 30th, 2023 is in week 26
                ['2023-07-14T00:00:00Z', '28'], // Jul 14th, 2023 is in week 28
                ['2023-08-25T00:00:00Z', '34'], // Aug 25th, 2023 is in week 34
                ['2023-09-10T00:00:00Z', '37'], // Sep 10th, 2023 is in week 37
                ['2023-10-31T00:00:00Z', '44'], // Oct 31st, 2023 is in week 44
                ['2023-11-15T00:00:00Z', '46'], // Nov 15th, 2023 is in week 46
                ['2023-12-24T00:00:00Z', '52'], // Dec 24th, 2023 is Sunday, start of week 52
                ['2023-12-31T00:00:00Z', '53'], // Dec 31st, 2023 is Sunday, start of week 53
                ['2024-01-01T00:00:00Z', '1'], // Jan 1st, 2024 is in week 1
                ['2024-01-07T00:00:00Z', '2'], // Jan 7th, 2024 is in week 2
                ['2024-01-08T00:00:00Z', '2'], // Jan 8th, 2024 is in week 2
                ['2024-02-29T00:00:00Z', '9'], // Feb 29th, 2024 is in week 9 (leap year)
                ['2024-06-15T00:00:00Z', '24'], // Jun 15th, 2024 is in week 24
                ['2024-12-30T00:00:00Z', '53'], // Dec 30th, 2024 is in week 53
                ['2024-01-02T00:00:00Z', '1'], // Jan 2nd, 2024 is in week 1 (Leap Year)
                ['2024-12-28T00:00:00Z', '52'], // Dec 28th, 2024 is in week 52 (End of Leap Year)
                ['2024-12-29T00:00:00Z', '53'], // Dec 29th, 2024 is in week 53 (End of Leap Year)
                ['2024-12-26T00:00:00Z', '52'], // Dec 26th, 2024 is in week 52 (Thursday)
                ['2024-12-01T00:00:00Z', '49'], // Dec 1st, 2024 is in week 48
                ['2023-12-30T00:00:00Z', '52'], // Dec 30th, 2023 is in week 52
            ]) {
                assert.equal(format(new Date(el[0]), 'W', 'en', 'Europe/Brussels', 'sun'), el[1]);
                assert.equal(format(el[0], 'W', 'en', 'Europe/Brussels', 'sun'), el[1]);
            }
        });
    });

    describe('token:WW sow:sat', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2023-01-01T00:00:00Z', '01'], // Jan 1st, 2023 is Sunday, still in week 1 (week started on Dec 31st, 2022)
                ['2023-01-07T00:00:00Z', '02'], // Jan 7th, 2023 is Saturday, week 2 starts
                ['2023-01-08T00:00:00Z', '02'], // Jan 8th, 2023 is in week 2
                ['2023-02-01T00:00:00Z', '05'], // Feb 1st, 2023 is in week 5
                ['2023-03-15T00:00:00Z', '11'], // Mar 15th, 2023 is in week 11
                ['2023-04-01T00:00:00Z', '14'], // Apr 1st, 2023 is in week 14
                ['2023-05-20T00:00:00Z', '21'], // May 20th, 2023 is in week 21 (week starts on May 13th)
                ['2023-06-30T00:00:00Z', '26'], // Jun 30th, 2023 is in week 27
                ['2023-07-14T00:00:00Z', '28'], // Jul 14th, 2023 is in week 28
                ['2023-08-25T00:00:00Z', '34'], // Aug 25th, 2023 is in week 34
                ['2023-09-10T00:00:00Z', '37'], // Sep 10th, 2023 is in week 37
                ['2023-10-31T00:00:00Z', '44'], // Oct 31st, 2023 is in week 44
                ['2023-11-15T00:00:00Z', '46'], // Nov 15th, 2023 is in week 46
                ['2023-12-24T00:00:00Z', '52'], // Dec 24th, 2023 is in week 52
                ['2023-12-31T00:00:00Z', '53'], // Dec 31st, 2023 is in week 53
                ['2024-01-01T00:00:00Z', '01'], // Jan 1st, 2024 is in week 1
                ['2024-01-07T00:00:00Z', '02'],  // Jan 7th, 2024 is in week 2
                ['2024-01-08T00:00:00Z', '02'],  // Jan 8th, 2024 is in week 2
                ['2024-02-29T00:00:00Z', '09'],  // Feb 29th, 2024 is in week 9
                ['2024-06-15T00:00:00Z', '25'], // Jun 15th, 2024 is in week 25
                ['2024-12-30T00:00:00Z', '53'], // Dec 30th, 2024 is in week 53
                ['2024-01-02T00:00:00Z', '01'], // Jan 2nd, 2024 is in week 1
                ['2024-12-28T00:00:00Z', '53'], // Dec 28th, 2024 is in week 53
                ['2024-12-29T00:00:00Z', '53'], // Dec 29th, 2024 is in week 53
                ['2024-12-26T00:00:00Z', '52'], // Dec 26th, 2024 is in week 52
                ['2024-12-01T00:00:00Z', '49'], // Dec 1st, 2024 is in week 49
                ['2023-12-30T00:00:00Z', '53'], // Dec 30th, 2023 is in week 53
            ]) {
                assert.equal(format(new Date(el[0]), 'WW', 'en', 'Europe/Brussels', 'sat'), el[1]);
                assert.equal(format(el[0], 'WW', 'en', 'Europe/Brussels', 'sat'), el[1]);
            }
        });
    });

    describe('token:W sow:sat', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2023-01-01T00:00:00Z', '1'], // Jan 1st, 2023 is Sunday, still in week 1 (week started on Dec 31st, 2022)
                ['2023-01-07T00:00:00Z', '2'], // Jan 7th, 2023 is Saturday, week 2 starts
                ['2023-01-08T00:00:00Z', '2'], // Jan 8th, 2023 is in week 2
                ['2023-02-01T00:00:00Z', '5'], // Feb 1st, 2023 is in week 5
                ['2023-03-15T00:00:00Z', '11'], // Mar 15th, 2023 is in week 11
                ['2023-04-01T00:00:00Z', '14'], // Apr 1st, 2023 is in week 14
                ['2023-05-20T00:00:00Z', '21'], // May 20th, 2023 is in week 21 (week starts on May 13th)
                ['2023-06-30T00:00:00Z', '26'], // Jun 30th, 2023 is in week 27
                ['2023-07-14T00:00:00Z', '28'], // Jul 14th, 2023 is in week 28
                ['2023-08-25T00:00:00Z', '34'], // Aug 25th, 2023 is in week 34
                ['2023-09-10T00:00:00Z', '37'], // Sep 10th, 2023 is in week 37
                ['2023-10-31T00:00:00Z', '44'], // Oct 31st, 2023 is in week 44
                ['2023-11-15T00:00:00Z', '46'], // Nov 15th, 2023 is in week 46
                ['2023-12-24T00:00:00Z', '52'], // Dec 24th, 2023 is in week 52
                ['2023-12-31T00:00:00Z', '53'], // Dec 31st, 2023 is in week 53
                ['2024-01-01T00:00:00Z', '1'], // Jan 1st, 2024 is in week 1
                ['2024-01-07T00:00:00Z', '2'],  // Jan 7th, 2024 is in week 2
                ['2024-01-08T00:00:00Z', '2'],  // Jan 8th, 2024 is in week 2
                ['2024-02-29T00:00:00Z', '9'],  // Feb 29th, 2024 is in week 9
                ['2024-06-15T00:00:00Z', '25'], // Jun 15th, 2024 is in week 25
                ['2024-12-30T00:00:00Z', '53'], // Dec 30th, 2024 is in week 53
                ['2024-01-02T00:00:00Z', '1'], // Jan 2nd, 2024 is in week 1
                ['2024-12-28T00:00:00Z', '53'], // Dec 28th, 2024 is in week 53
                ['2024-12-29T00:00:00Z', '53'], // Dec 29th, 2024 is in week 53
                ['2024-12-26T00:00:00Z', '52'], // Dec 26th, 2024 is in week 52
                ['2024-12-01T00:00:00Z', '49'], // Dec 1st, 2024 is in week 49
                ['2023-12-30T00:00:00Z', '53'], // Dec 30th, 2023 is in week 53
            ]) {
                assert.equal(format(new Date(el[0]), 'W', 'en', 'Europe/Brussels', 'sat'), el[1]);
                assert.equal(format(el[0], 'W', 'en', 'Europe/Brussels', 'sat'), el[1]);
            }
        });
    });

    describe('token:DD', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', '01'],
                ['2019-02-02T05:20:19+02:00', '02'],
                ['2019-02-03T05:20:19+02:00', '03'],
                ['2019-02-04T05:20:19+02:00', '04'],
                ['2019-02-05T05:20:19+02:00', '05'],
                ['2019-02-06T05:20:19+02:00', '06'],
                ['2019-02-07T05:20:19+02:00', '07'],
                ['2019-02-08T05:20:19+02:00', '08'],
                ['2019-02-09T05:20:19+02:00', '09'],
                ['2019-02-10T05:20:19+02:00', '10'],
                ['2019-02-11T05:20:19+02:00', '11'],
                ['2019-02-12T05:20:19+02:00', '12'],
                ['2019-02-13T05:20:19+02:00', '13'],
                ['2019-02-14T05:20:19+02:00', '14'],
                ['2019-02-15T05:20:19+02:00', '15'],
                ['2019-02-16T05:20:19+02:00', '16'],
                ['2019-02-17T05:20:19+02:00', '17'],
                ['2019-02-18T05:20:19+02:00', '18'],
                ['2019-02-19T05:20:19+02:00', '19'],
                ['2019-02-20T05:20:19+02:00', '20'],
                ['2019-02-21T05:20:19+02:00', '21'],
                ['2019-02-22T05:20:19+02:00', '22'],
                ['2019-02-23T05:20:19+02:00', '23'],
                ['2019-02-24T05:20:19+02:00', '24'],
                ['2019-02-25T05:20:19+02:00', '25'],
                ['2019-02-26T05:20:19+02:00', '26'],
                ['2019-02-27T05:20:19+02:00', '27'],
                ['2019-02-28T05:20:19+02:00', '28'],
                ['2019-02-29T05:20:19+02:00', '01'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', '29'],
                ['2007-12-31T23:59:59+02:00', '31'],
                ['2007-12-31T23:59:59-02:00', '01'],
                ['2023-04-23T12:23:34', '23'],
                ['2023-08-23T12:23:34', '23'],
                ['2009-10-01T08:40:42', '01'],
                ['2023-09-23T12:23:34', '23'],
                ['2023-11-05T23:23:34', '05'],
            ]) {
                assert.equal(format(el[0], 'DD'), el[1]);
                assert.equal(format(new Date(el[0]), 'DD'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', '01'],
                ['2019-02-02T05:20:19+02:00', '02'],
                ['2019-02-03T05:20:19+02:00', '03'],
                ['2019-02-04T05:20:19+02:00', '04'],
                ['2019-02-05T05:20:19+02:00', '05'],
                ['2019-02-06T05:20:19+02:00', '06'],
                ['2019-02-07T05:20:19+02:00', '07'],
                ['2019-02-08T05:20:19+02:00', '08'],
                ['2019-02-09T05:20:19+02:00', '09'],
                ['2019-02-10T05:20:19+02:00', '10'],
                ['2019-02-11T05:20:19+02:00', '11'],
                ['2019-02-12T05:20:19+02:00', '12'],
                ['2019-02-13T05:20:19+02:00', '13'],
                ['2019-02-14T05:20:19+02:00', '14'],
                ['2019-02-15T05:20:19+02:00', '15'],
                ['2019-02-16T05:20:19+02:00', '16'],
                ['2019-02-17T05:20:19+02:00', '17'],
                ['2019-02-18T05:20:19+02:00', '18'],
                ['2019-02-19T05:20:19+02:00', '19'],
                ['2019-02-20T05:20:19+02:00', '20'],
                ['2019-02-21T05:20:19+02:00', '21'],
                ['2019-02-22T05:20:19+02:00', '22'],
                ['2019-02-23T05:20:19+02:00', '23'],
                ['2019-02-24T05:20:19+02:00', '24'],
                ['2019-02-25T05:20:19+02:00', '25'],
                ['2019-02-26T05:20:19+02:00', '26'],
                ['2019-02-27T05:20:19+02:00', '27'],
                ['2019-02-28T05:20:19+02:00', '28'],
                ['2019-02-29T05:20:19+02:00', '01'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', '29'],
                ['2007-12-31T23:59:59+02:00', '31'],
                ['2007-12-31T23:59:59-02:00', '01'],
                ['2023-04-23T12:23:34', '23'],
                ['2023-08-23T12:23:34', '23'],
                ['2009-10-01T08:40:42', '01'],
                ['2023-09-23T12:23:34', '23'],
                ['2023-11-05T23:23:34', '05'],
            ]) {
                assert.equal(format(el[0], 'DD', 'fr'), el[1]);
                assert.equal(format(new Date(el[0]), 'DD', 'fr'), el[1]);
            }
        });
    });

    describe('token:D', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', '1'],
                ['2019-02-02T05:20:19+02:00', '2'],
                ['2019-02-03T05:20:19+02:00', '3'],
                ['2019-02-04T05:20:19+02:00', '4'],
                ['2019-02-05T05:20:19+02:00', '5'],
                ['2019-02-06T05:20:19+02:00', '6'],
                ['2019-02-07T05:20:19+02:00', '7'],
                ['2019-02-08T05:20:19+02:00', '8'],
                ['2019-02-09T05:20:19+02:00', '9'],
                ['2019-02-10T05:20:19+02:00', '10'],
                ['2019-02-11T05:20:19+02:00', '11'],
                ['2019-02-12T05:20:19+02:00', '12'],
                ['2019-02-13T05:20:19+02:00', '13'],
                ['2019-02-14T05:20:19+02:00', '14'],
                ['2019-02-15T05:20:19+02:00', '15'],
                ['2019-02-16T05:20:19+02:00', '16'],
                ['2019-02-17T05:20:19+02:00', '17'],
                ['2019-02-18T05:20:19+02:00', '18'],
                ['2019-02-19T05:20:19+02:00', '19'],
                ['2019-02-20T05:20:19+02:00', '20'],
                ['2019-02-21T05:20:19+02:00', '21'],
                ['2019-02-22T05:20:19+02:00', '22'],
                ['2019-02-23T05:20:19+02:00', '23'],
                ['2019-02-24T05:20:19+02:00', '24'],
                ['2019-02-25T05:20:19+02:00', '25'],
                ['2019-02-26T05:20:19+02:00', '26'],
                ['2019-02-27T05:20:19+02:00', '27'],
                ['2019-02-28T05:20:19+02:00', '28'],
                ['2019-02-29T05:20:19+02:00', '1'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', '29'],
                ['2007-12-31T23:59:59+02:00', '31'],
                ['2007-12-31T23:59:59-02:00', '1'],
                ['2023-04-23T12:23:34', '23'],
                ['2023-08-23T12:23:34', '23'],
                ['2009-10-01T08:40:42', '1'],
                ['2023-09-23T12:23:34', '23'],
                ['2023-11-05T23:23:34', '5'],
            ]) {
                assert.equal(format(el[0], 'D'), el[1]);
                assert.equal(format(new Date(el[0]), 'D'), el[1]);
            }
        });

        it('Should not take locale into account', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', '1'],
                ['2019-02-02T05:20:19+02:00', '2'],
                ['2019-02-03T05:20:19+02:00', '3'],
                ['2019-02-04T05:20:19+02:00', '4'],
                ['2019-02-05T05:20:19+02:00', '5'],
                ['2019-02-06T05:20:19+02:00', '6'],
                ['2019-02-07T05:20:19+02:00', '7'],
                ['2019-02-08T05:20:19+02:00', '8'],
                ['2019-02-09T05:20:19+02:00', '9'],
                ['2019-02-10T05:20:19+02:00', '10'],
                ['2019-02-11T05:20:19+02:00', '11'],
                ['2019-02-12T05:20:19+02:00', '12'],
                ['2019-02-13T05:20:19+02:00', '13'],
                ['2019-02-14T05:20:19+02:00', '14'],
                ['2019-02-15T05:20:19+02:00', '15'],
                ['2019-02-16T05:20:19+02:00', '16'],
                ['2019-02-17T05:20:19+02:00', '17'],
                ['2019-02-18T05:20:19+02:00', '18'],
                ['2019-02-19T05:20:19+02:00', '19'],
                ['2019-02-20T05:20:19+02:00', '20'],
                ['2019-02-21T05:20:19+02:00', '21'],
                ['2019-02-22T05:20:19+02:00', '22'],
                ['2019-02-23T05:20:19+02:00', '23'],
                ['2019-02-24T05:20:19+02:00', '24'],
                ['2019-02-25T05:20:19+02:00', '25'],
                ['2019-02-26T05:20:19+02:00', '26'],
                ['2019-02-27T05:20:19+02:00', '27'],
                ['2019-02-28T05:20:19+02:00', '28'],
                ['2019-02-29T05:20:19+02:00', '1'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', '29'],
                ['2007-12-31T23:59:59+02:00', '31'],
                ['2007-12-31T23:59:59-02:00', '1'],
                ['2023-04-23T12:23:34', '23'],
                ['2023-08-23T12:23:34', '23'],
                ['2009-10-01T08:40:42', '1'],
                ['2023-09-23T12:23:34', '23'],
                ['2023-11-05T23:23:34', '5'],
            ]) {
                assert.equal(format(el[0], 'D', 'fr'), el[1]);
                assert.equal(format(new Date(el[0]), 'D', 'fr'), el[1]);
            }
        });
    });

    describe('token:dddd', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'Friday'],
                ['2019-02-02T05:20:19+02:00', 'Saturday'],
                ['2019-02-03T05:20:19+02:00', 'Sunday'],
                ['2019-02-04T05:20:19+02:00', 'Monday'],
                ['2019-02-05T05:20:19+02:00', 'Tuesday'],
                ['2019-02-06T05:20:19+02:00', 'Wednesday'],
                ['2019-02-07T05:20:19+02:00', 'Thursday'],
                ['2019-02-08T05:20:19+02:00', 'Friday'],
                ['2019-02-09T05:20:19+02:00', 'Saturday'],
                ['2019-02-10T05:20:19+02:00', 'Sunday'],
                ['2019-02-11T05:20:19+02:00', 'Monday'],
                ['2019-02-12T05:20:19+02:00', 'Tuesday'],
                ['2019-02-13T05:20:19+02:00', 'Wednesday'],
                ['2019-02-14T05:20:19+02:00', 'Thursday'],
                ['2019-02-15T05:20:19+02:00', 'Friday'],
                ['2019-02-16T05:20:19+02:00', 'Saturday'],
                ['2019-02-17T05:20:19+02:00', 'Sunday'],
                ['2019-02-18T05:20:19+02:00', 'Monday'],
                ['2019-02-19T05:20:19+02:00', 'Tuesday'],
                ['2019-02-20T05:20:19+02:00', 'Wednesday'],
                ['2019-02-21T05:20:19+02:00', 'Thursday'],
                ['2019-02-22T05:20:19+02:00', 'Friday'],
                ['2019-02-23T05:20:19+02:00', 'Saturday'],
                ['2019-02-24T05:20:19+02:00', 'Sunday'],
                ['2019-02-25T05:20:19+02:00', 'Monday'],
                ['2019-02-26T05:20:19+02:00', 'Tuesday'],
                ['2019-02-27T05:20:19+02:00', 'Wednesday'],
                ['2019-02-28T05:20:19+02:00', 'Thursday'],
                ['2019-02-29T05:20:19+02:00', 'Friday'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', 'Thursday'],
                ['2007-12-31T23:59:59+02:00', 'Monday'],
                ['2007-12-31T23:59:59-02:00', 'Tuesday'],
                ['2023-04-23T12:23:34', 'Sunday'],
                ['2023-08-23T12:23:34', 'Wednesday'],
                ['2009-10-01T08:40:42', 'Thursday'],
                ['2023-09-23T12:23:34', 'Saturday'],
                ['2023-11-05T23:23:34', 'Sunday'],
            ]) {
                assert.equal(format(el[0], 'dddd'), el[1]);
                assert.equal(format(new Date(el[0]), 'dddd'), el[1]);
            }
        });

        it('Should take locale into account', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'vendredi'],
                ['2019-02-02T05:20:19+02:00', 'samedi'],
                ['2019-02-03T05:20:19+02:00', 'dimanche'],
                ['2019-02-04T05:20:19+02:00', 'lundi'],
                ['2019-02-05T05:20:19+02:00', 'mardi'],
                ['2019-02-06T05:20:19+02:00', 'mercredi'],
                ['2019-02-07T05:20:19+02:00', 'jeudi'],
                ['2019-02-08T05:20:19+02:00', 'vendredi'],
                ['2019-02-09T05:20:19+02:00', 'samedi'],
                ['2019-02-10T05:20:19+02:00', 'dimanche'],
                ['2019-02-11T05:20:19+02:00', 'lundi'],
                ['2019-02-12T05:20:19+02:00', 'mardi'],
                ['2019-02-13T05:20:19+02:00', 'mercredi'],
                ['2019-02-14T05:20:19+02:00', 'jeudi'],
                ['2019-02-15T05:20:19+02:00', 'vendredi'],
                ['2019-02-16T05:20:19+02:00', 'samedi'],
                ['2019-02-17T05:20:19+02:00', 'dimanche'],
                ['2019-02-18T05:20:19+02:00', 'lundi'],
                ['2019-02-19T05:20:19+02:00', 'mardi'],
                ['2019-02-20T05:20:19+02:00', 'mercredi'],
                ['2019-02-21T05:20:19+02:00', 'jeudi'],
                ['2019-02-22T05:20:19+02:00', 'vendredi'],
                ['2019-02-23T05:20:19+02:00', 'samedi'],
                ['2019-02-24T05:20:19+02:00', 'dimanche'],
                ['2019-02-25T05:20:19+02:00', 'lundi'],
                ['2019-02-26T05:20:19+02:00', 'mardi'],
                ['2019-02-27T05:20:19+02:00', 'mercredi'],
                ['2019-02-28T05:20:19+02:00', 'jeudi'],
                ['2019-02-29T05:20:19+02:00', 'vendredi'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', 'jeudi'],
                ['2007-12-31T23:59:59+02:00', 'lundi'],
                ['2007-12-31T23:59:59-02:00', 'mardi'],
                ['2023-04-23T12:23:34', 'dimanche'],
                ['2023-08-23T12:23:34', 'mercredi'],
                ['2009-10-01T08:40:42', 'jeudi'],
                ['2023-09-23T12:23:34', 'samedi'],
                ['2023-11-05T23:23:34', 'dimanche'],
            ]) {
                assert.equal(format(el[0], 'dddd', 'fr'), el[1]);
                assert.equal(format(new Date(el[0]), 'dddd', 'fr'), el[1]);
            }

            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'vrijdag'],
                ['2019-02-02T05:20:19+02:00', 'zaterdag'],
                ['2019-02-03T05:20:19+02:00', 'zondag'],
                ['2019-02-04T05:20:19+02:00', 'maandag'],
                ['2019-02-05T05:20:19+02:00', 'dinsdag'],
                ['2019-02-06T05:20:19+02:00', 'woensdag'],
                ['2019-02-07T05:20:19+02:00', 'donderdag'],
                ['2019-02-08T05:20:19+02:00', 'vrijdag'],
                ['2019-02-09T05:20:19+02:00', 'zaterdag'],
                ['2019-02-10T05:20:19+02:00', 'zondag'],
                ['2019-02-11T05:20:19+02:00', 'maandag'],
                ['2019-02-12T05:20:19+02:00', 'dinsdag'],
                ['2019-02-13T05:20:19+02:00', 'woensdag'],
                ['2019-02-14T05:20:19+02:00', 'donderdag'],
                ['2019-02-15T05:20:19+02:00', 'vrijdag'],
                ['2019-02-16T05:20:19+02:00', 'zaterdag'],
                ['2019-02-17T05:20:19+02:00', 'zondag'],
                ['2019-02-18T05:20:19+02:00', 'maandag'],
                ['2019-02-19T05:20:19+02:00', 'dinsdag'],
                ['2019-02-20T05:20:19+02:00', 'woensdag'],
                ['2019-02-21T05:20:19+02:00', 'donderdag'],
                ['2019-02-22T05:20:19+02:00', 'vrijdag'],
                ['2019-02-23T05:20:19+02:00', 'zaterdag'],
                ['2019-02-24T05:20:19+02:00', 'zondag'],
                ['2019-02-25T05:20:19+02:00', 'maandag'],
                ['2019-02-26T05:20:19+02:00', 'dinsdag'],
                ['2019-02-27T05:20:19+02:00', 'woensdag'],
                ['2019-02-28T05:20:19+02:00', 'donderdag'],
                ['2019-02-29T05:20:19+02:00', 'vrijdag'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', 'donderdag'],
                ['2007-12-31T23:59:59+02:00', 'maandag'],
                ['2007-12-31T23:59:59-02:00', 'dinsdag'],
                ['2023-04-23T12:23:34', 'zondag'],
                ['2023-08-23T12:23:34', 'woensdag'],
                ['2009-10-01T08:40:42', 'donderdag'],
                ['2023-09-23T12:23:34', 'zaterdag'],
                ['2023-11-05T23:23:34', 'zondag'],
            ]) {
                assert.equal(format(el[0], 'dddd', 'nl'), el[1]);
                assert.equal(format(new Date(el[0]), 'dddd', 'nl'), el[1]);
            }

            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'sexta-feira'],
                ['2019-02-02T05:20:19+02:00', 'sábado'],
                ['2019-02-03T05:20:19+02:00', 'domingo'],
                ['2019-02-04T05:20:19+02:00', 'segunda-feira'],
                ['2019-02-05T05:20:19+02:00', 'terça-feira'],
                ['2019-02-06T05:20:19+02:00', 'quarta-feira'],
                ['2019-02-07T05:20:19+02:00', 'quinta-feira'],
                ['2019-02-08T05:20:19+02:00', 'sexta-feira'],
                ['2019-02-09T05:20:19+02:00', 'sábado'],
                ['2019-02-10T05:20:19+02:00', 'domingo'],
                ['2019-02-11T05:20:19+02:00', 'segunda-feira'],
                ['2019-02-12T05:20:19+02:00', 'terça-feira'],
                ['2019-02-13T05:20:19+02:00', 'quarta-feira'],
                ['2019-02-14T05:20:19+02:00', 'quinta-feira'],
                ['2019-02-15T05:20:19+02:00', 'sexta-feira'],
                ['2019-02-16T05:20:19+02:00', 'sábado'],
                ['2019-02-17T05:20:19+02:00', 'domingo'],
                ['2019-02-18T05:20:19+02:00', 'segunda-feira'],
                ['2019-02-19T05:20:19+02:00', 'terça-feira'],
                ['2019-02-20T05:20:19+02:00', 'quarta-feira'],
                ['2019-02-21T05:20:19+02:00', 'quinta-feira'],
                ['2019-02-22T05:20:19+02:00', 'sexta-feira'],
                ['2019-02-23T05:20:19+02:00', 'sábado'],
                ['2019-02-24T05:20:19+02:00', 'domingo'],
                ['2019-02-25T05:20:19+02:00', 'segunda-feira'],
                ['2019-02-26T05:20:19+02:00', 'terça-feira'],
                ['2019-02-27T05:20:19+02:00', 'quarta-feira'],
                ['2019-02-28T05:20:19+02:00', 'quinta-feira'],
                ['2019-02-29T05:20:19+02:00', 'sexta-feira'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', 'quinta-feira'],
                ['2007-12-31T23:59:59+02:00', 'segunda-feira'],
                ['2007-12-31T23:59:59-02:00', 'terça-feira'],
                ['2023-04-23T12:23:34', 'domingo'],
                ['2023-08-23T12:23:34', 'quarta-feira'],
                ['2009-10-01T08:40:42', 'quinta-feira'],
                ['2023-09-23T12:23:34', 'sábado'],
                ['2023-11-05T23:23:34', 'domingo'],
            ]) {
                assert.equal(format(el[0], 'dddd', 'pt'), el[1]);
                assert.equal(format(new Date(el[0]), 'dddd', 'pt'), el[1]);
            }
        });
    });

    describe('token:ddd', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'Fri'],
                ['2019-02-02T05:20:19+02:00', 'Sat'],
                ['2019-02-03T05:20:19+02:00', 'Sun'],
                ['2019-02-04T05:20:19+02:00', 'Mon'],
                ['2019-02-05T05:20:19+02:00', 'Tue'],
                ['2019-02-06T05:20:19+02:00', 'Wed'],
                ['2019-02-07T05:20:19+02:00', 'Thu'],
                ['2019-02-08T05:20:19+02:00', 'Fri'],
                ['2019-02-09T05:20:19+02:00', 'Sat'],
                ['2019-02-10T05:20:19+02:00', 'Sun'],
                ['2019-02-11T05:20:19+02:00', 'Mon'],
                ['2019-02-12T05:20:19+02:00', 'Tue'],
                ['2019-02-13T05:20:19+02:00', 'Wed'],
                ['2019-02-14T05:20:19+02:00', 'Thu'],
                ['2019-02-15T05:20:19+02:00', 'Fri'],
                ['2019-02-16T05:20:19+02:00', 'Sat'],
                ['2019-02-17T05:20:19+02:00', 'Sun'],
                ['2019-02-18T05:20:19+02:00', 'Mon'],
                ['2019-02-19T05:20:19+02:00', 'Tue'],
                ['2019-02-20T05:20:19+02:00', 'Wed'],
                ['2019-02-21T05:20:19+02:00', 'Thu'],
                ['2019-02-22T05:20:19+02:00', 'Fri'],
                ['2019-02-23T05:20:19+02:00', 'Sat'],
                ['2019-02-24T05:20:19+02:00', 'Sun'],
                ['2019-02-25T05:20:19+02:00', 'Mon'],
                ['2019-02-26T05:20:19+02:00', 'Tue'],
                ['2019-02-27T05:20:19+02:00', 'Wed'],
                ['2019-02-28T05:20:19+02:00', 'Thu'],
                ['2019-02-29T05:20:19+02:00', 'Fri'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', 'Thu'],
                ['2007-12-31T23:59:59+02:00', 'Mon'],
                ['2007-12-31T23:59:59-02:00', 'Tue'],
                ['2023-04-23T12:23:34', 'Sun'],
                ['2023-08-23T12:23:34', 'Wed'],
                ['2009-10-01T08:40:42', 'Thu'],
                ['2023-09-23T12:23:34', 'Sat'],
                ['2023-11-05T23:23:34', 'Sun'],
            ]) {
                assert.equal(format(el[0], 'ddd'), el[1]);
                assert.equal(format(new Date(el[0]), 'ddd'), el[1]);
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
                ['2019-02-01T05:20:19+02:00', 'ven.'],
                ['2019-02-02T05:20:19+02:00', 'sam.'],
                ['2019-02-03T05:20:19+02:00', 'dim.'],
                ['2019-02-04T05:20:19+02:00', 'lun.'],
                ['2019-02-05T05:20:19+02:00', 'mar.'],
                ['2019-02-06T05:20:19+02:00', 'mer.'],
                ['2019-02-07T05:20:19+02:00', 'jeu.'],
                ['2019-02-08T05:20:19+02:00', 'ven.'],
                ['2019-02-09T05:20:19+02:00', 'sam.'],
                ['2019-02-10T05:20:19+02:00', 'dim.'],
                ['2019-02-11T05:20:19+02:00', 'lun.'],
                ['2019-02-12T05:20:19+02:00', 'mar.'],
                ['2019-02-13T05:20:19+02:00', 'mer.'],
                ['2019-02-14T05:20:19+02:00', 'jeu.'],
                ['2019-02-15T05:20:19+02:00', 'ven.'],
                ['2019-02-16T05:20:19+02:00', 'sam.'],
                ['2019-02-17T05:20:19+02:00', 'dim.'],
                ['2019-02-18T05:20:19+02:00', 'lun.'],
                ['2019-02-19T05:20:19+02:00', 'mar.'],
                ['2019-02-20T05:20:19+02:00', 'mer.'],
                ['2019-02-21T05:20:19+02:00', 'jeu.'],
                ['2019-02-22T05:20:19+02:00', 'ven.'],
                ['2019-02-23T05:20:19+02:00', 'sam.'],
                ['2019-02-24T05:20:19+02:00', 'dim.'],
                ['2019-02-25T05:20:19+02:00', 'lun.'],
                ['2019-02-26T05:20:19+02:00', 'mar.'],
                ['2019-02-27T05:20:19+02:00', 'mer.'],
                ['2019-02-28T05:20:19+02:00', 'jeu.'],
                ['2019-02-29T05:20:19+02:00', 'ven.'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', 'jeu.'],
                ['2007-12-31T23:59:59+02:00', 'lun.'],
                ['2007-12-31T23:59:59-02:00', 'mar.'],
                ['2023-04-23T12:23:34', 'dim.'],
                ['2023-08-23T12:23:34', 'mer.'],
                ['2009-10-01T08:40:42', 'jeu.'],
                ['2023-09-23T12:23:34', 'sam.'],
                ['2023-11-05T23:23:34', 'dim.'],
            ]) {
                assert.equal(format(new Date(el[0]), 'ddd', 'fr'), el[1]);
                assert.equal(format(el[0], 'ddd', 'fr'), el[1]);
            }

            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'vr'],
                ['2019-02-02T05:20:19+02:00', 'za'],
                ['2019-02-03T05:20:19+02:00', 'zo'],
                ['2019-02-04T05:20:19+02:00', 'ma'],
                ['2019-02-05T05:20:19+02:00', 'di'],
                ['2019-02-06T05:20:19+02:00', 'wo'],
                ['2019-02-07T05:20:19+02:00', 'do'],
                ['2019-02-08T05:20:19+02:00', 'vr'],
                ['2019-02-09T05:20:19+02:00', 'za'],
                ['2019-02-10T05:20:19+02:00', 'zo'],
                ['2019-02-11T05:20:19+02:00', 'ma'],
                ['2019-02-12T05:20:19+02:00', 'di'],
                ['2019-02-13T05:20:19+02:00', 'wo'],
                ['2019-02-14T05:20:19+02:00', 'do'],
                ['2019-02-15T05:20:19+02:00', 'vr'],
                ['2019-02-16T05:20:19+02:00', 'za'],
                ['2019-02-17T05:20:19+02:00', 'zo'],
                ['2019-02-18T05:20:19+02:00', 'ma'],
                ['2019-02-19T05:20:19+02:00', 'di'],
                ['2019-02-20T05:20:19+02:00', 'wo'],
                ['2019-02-21T05:20:19+02:00', 'do'],
                ['2019-02-22T05:20:19+02:00', 'vr'],
                ['2019-02-23T05:20:19+02:00', 'za'],
                ['2019-02-24T05:20:19+02:00', 'zo'],
                ['2019-02-25T05:20:19+02:00', 'ma'],
                ['2019-02-26T05:20:19+02:00', 'di'],
                ['2019-02-27T05:20:19+02:00', 'wo'],
                ['2019-02-28T05:20:19+02:00', 'do'],
                ['2019-02-29T05:20:19+02:00', 'vr'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', 'do'],
                ['2007-12-31T23:59:59+02:00', 'ma'],
                ['2007-12-31T23:59:59-02:00', 'di'],
                ['2023-04-23T12:23:34', 'zo'],
                ['2023-08-23T12:23:34', 'wo'],
                ['2009-10-01T08:40:42', 'do'],
                ['2023-09-23T12:23:34', 'za'],
                ['2023-11-05T23:23:34', 'zo'],
            ]) {
                assert.equal(format(new Date(el[0]), 'ddd', 'nl'), el[1]);
                assert.equal(format(el[0], 'ddd', 'nl'), el[1]);
            }

            for (const el of [
                ['2019-02-01T05:20:19+02:00', 'sex.'],
                ['2019-02-02T05:20:19+02:00', 'sáb.'],
                ['2019-02-03T05:20:19+02:00', 'dom.'],
                ['2019-02-04T05:20:19+02:00', 'seg.'],
                ['2019-02-05T05:20:19+02:00', 'ter.'],
                ['2019-02-06T05:20:19+02:00', 'qua.'],
                ['2019-02-07T05:20:19+02:00', 'qui.'],
                ['2019-02-08T05:20:19+02:00', 'sex.'],
                ['2019-02-09T05:20:19+02:00', 'sáb.'],
                ['2019-02-10T05:20:19+02:00', 'dom.'],
                ['2019-02-11T05:20:19+02:00', 'seg.'],
                ['2019-02-12T05:20:19+02:00', 'ter.'],
                ['2019-02-13T05:20:19+02:00', 'qua.'],
                ['2019-02-14T05:20:19+02:00', 'qui.'],
                ['2019-02-15T05:20:19+02:00', 'sex.'],
                ['2019-02-16T05:20:19+02:00', 'sáb.'],
                ['2019-02-17T05:20:19+02:00', 'dom.'],
                ['2019-02-18T05:20:19+02:00', 'seg.'],
                ['2019-02-19T05:20:19+02:00', 'ter.'],
                ['2019-02-20T05:20:19+02:00', 'qua.'],
                ['2019-02-21T05:20:19+02:00', 'qui.'],
                ['2019-02-22T05:20:19+02:00', 'sex.'],
                ['2019-02-23T05:20:19+02:00', 'sáb.'],
                ['2019-02-24T05:20:19+02:00', 'dom.'],
                ['2019-02-25T05:20:19+02:00', 'seg.'],
                ['2019-02-26T05:20:19+02:00', 'ter.'],
                ['2019-02-27T05:20:19+02:00', 'qua.'],
                ['2019-02-28T05:20:19+02:00', 'qui.'],
                ['2019-02-29T05:20:19+02:00', 'sex.'], /* Not a leap year */
                ['2024-02-29T05:20:19+02:00', 'qui.'],
                ['2007-12-31T23:59:59+02:00', 'seg.'],
                ['2007-12-31T23:59:59-02:00', 'ter.'],
                ['2023-04-23T12:23:34', 'dom.'],
                ['2023-08-23T12:23:34', 'qua.'],
                ['2009-10-01T08:40:42', 'qui.'],
                ['2023-09-23T12:23:34', 'sáb.'],
                ['2023-11-05T23:23:34', 'dom.'],
            ]) {
                assert.equal(format(new Date(el[0]), 'ddd', 'pt'), el[1]);
                assert.equal(format(el[0], 'ddd', 'pt'), el[1]);
            }
        });
    });

    describe('token:HH', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2022-03-06T08:30:45Z', '09'],
                ['2022-03-06T12:45:00Z', '13'],
                ['2022-03-06T19:15:30Z', '20'],
                ['2022-03-06T03:00:00Z', '04'],
                ['2022-03-06T00:00:00Z', '01'],
                ['2022-03-06T23:59:59Z', '00'],
                ['2022-03-06T00:30:45+02:00', '23'],
                ['2022-03-06T23:30:45-07:00', '07'],
            ]) {
                assert.equal(format(new Date(el[0]), 'HH'), el[1]);
                assert.equal(format(el[0], 'HH'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45+00:00'), 'HH', 'en', 'Europe/Paris'), '09');
            assert.equal(format(new Date('2022-03-06T08:30:45+00:00'), 'HH', 'en', 'America/New_York'), '03');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 'HH', 'en', 'UTC'), '22');
            assert.equal(format(new Date('2022-03-06T23:30:45-07:00'), 'HH', 'en', 'UTC'), '06');
            assert.equal(format('2022-03-06T08:30:45+00:00', 'HH', 'en', 'Europe/Paris'), '09');
            assert.equal(format('2022-03-06T08:30:45+00:00', 'HH', 'en', 'America/New_York'), '03');
            assert.equal(format('2022-03-06T00:30:45+02:00', 'HH', 'en', 'UTC'), '22');
            assert.equal(format('2022-03-06T23:30:45-07:00', 'HH', 'en', 'UTC'), '06');
        });
    });

    describe('token:H', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2022-03-06T08:30:45Z', '9'],
                ['2022-03-06T12:45:00Z', '13'],
                ['2022-03-06T19:15:30Z', '20'],
                ['2022-03-06T03:00:00Z', '4'],
                ['2022-03-06T00:00:00Z', '1'],
                ['2022-03-06T23:59:59Z', '0'],
                ['2022-03-06T00:30:45+02:00', '23'],
                ['2022-03-06T23:30:45-07:00', '7'],
            ]) {
                assert.equal(format(new Date(el[0]), 'H'), el[1]);
                assert.equal(format(el[0], 'H'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'H', 'en', 'Europe/Paris'), '9');
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'H', 'en', 'America/New_York'), '3');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 'H', 'en', 'UTC'), '22');
            assert.equal(format(new Date('2022-03-06T23:30:45-07:00'), 'H', 'en', 'UTC'), '6');
            assert.equal(format('2022-03-06T08:30:45Z', 'H', 'en', 'Europe/Paris'), '9');
            assert.equal(format('2022-03-06T08:30:45Z', 'H', 'en', 'America/New_York'), '3');
            assert.equal(format('2022-03-06T00:30:45+02:00', 'H', 'en', 'UTC'), '22');
            assert.equal(format('2022-03-06T23:30:45-07:00', 'H', 'en', 'UTC'), '6');
        });
    });

    describe('token:hh', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2022-03-06T08:30:45Z', '09'],
                ['2022-03-06T12:45:00Z', '01'],
                ['2022-03-06T19:15:30Z', '08'],
                ['2022-03-06T03:00:00Z', '04'],
                ['2022-03-06T00:00:00Z', '01'],
                ['2022-03-06T23:59:59Z', '12'],
                ['2022-03-06T00:30:45+02:00', '11'],
                ['2022-03-06T23:30:45-07:00', '07'],
            ]) {
                assert.equal(format(new Date(el[0]), 'hh'), el[1]);
                assert.equal(format(el[0], 'hh'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'hh', 'en', 'Europe/Paris'), '09');
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'hh', 'en', 'America/New_York'), '03');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 'hh', 'en', 'UTC'), '10');
            assert.equal(format(new Date('2022-03-06T23:30:45-07:00'), 'hh', 'en', 'UTC'), '06');
            assert.equal(format('2022-03-06T08:30:45Z', 'hh', 'en', 'Europe/Paris'), '09');
            assert.equal(format('2022-03-06T08:30:45Z', 'hh', 'en', 'America/New_York'), '03');
            assert.equal(format('2022-03-06T00:30:45+02:00', 'hh', 'en', 'UTC'), '10');
            assert.equal(format('2022-03-06T23:30:45-07:00', 'hh', 'en', 'UTC'), '06');
        });

        it('Should handle AM/PM properly', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'hh A'), '09 AM');
            assert.equal(format(new Date('2022-03-06T15:45:00Z'), 'hh A'), '04 PM');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 'hh A'), '11 PM');
            assert.equal(format(new Date('2022-03-06T23:30:45-07:00'), 'hh A'), '07 AM');
            assert.equal(format('2022-03-06T08:30:45Z', 'hh A'), '09 AM');
            assert.equal(format('2022-03-06T15:45:00Z', 'hh A'), '04 PM');
            assert.equal(format('2022-03-06T00:30:45+02:00', 'hh A'), '11 PM');
            assert.equal(format('2022-03-06T23:30:45-07:00', 'hh A'), '07 AM');
        });
    });

    describe('token:h', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2022-03-06T08:30:45Z', '9'],
                ['2022-03-06T12:45:00Z', '1'],
                ['2022-03-06T19:15:30Z', '8'],
                ['2022-03-06T03:00:00Z', '4'],
                ['2022-03-06T00:00:00Z', '1'],
                ['2022-03-06T23:59:59Z', '12'],
                ['2022-03-06T00:30:45+02:00', '11'],
                ['2022-03-06T23:30:45-07:00', '7'],
            ]) {
                assert.equal(format(new Date(el[0]), 'h'), el[1]);
                assert.equal(format(el[0], 'h'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'h', 'en', 'Europe/Paris'), '9');
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'h', 'en', 'America/New_York'), '3');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 'h', 'en', 'UTC'), '10');
            assert.equal(format(new Date('2022-03-06T23:30:45-07:00'), 'h', 'en', 'UTC'), '6');
            assert.equal(format('2022-03-06T08:30:45Z', 'h', 'en', 'Europe/Paris'), '9');
            assert.equal(format('2022-03-06T08:30:45Z', 'h', 'en', 'America/New_York'), '3');
            assert.equal(format('2022-03-06T00:30:45+02:00', 'h', 'en', 'UTC'), '10');
            assert.equal(format('2022-03-06T23:30:45-07:00', 'h', 'en', 'UTC'), '6');
        });

        it('Should handle AM/PM properly', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'h A'), '9 AM');
            assert.equal(format(new Date('2022-03-06T15:45:00Z'), 'h A'), '4 PM');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 'h A'), '11 PM');
            assert.equal(format(new Date('2022-03-06T23:30:45-07:00'), 'h A'), '7 AM');
            assert.equal(format('2022-03-06T08:30:45Z', 'h A'), '9 AM');
            assert.equal(format('2022-03-06T15:45:00Z', 'h A'), '4 PM');
            assert.equal(format('2022-03-06T00:30:45+02:00', 'h A'), '11 PM');
            assert.equal(format('2022-03-06T23:30:45-07:00', 'h A'), '7 AM');
        });
    });

    describe('token:mm', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2022-03-06T08:30:45Z', '30'],
                ['2022-03-06T12:45:00Z', '45'],
                ['2022-03-06T19:15:30Z', '15'],
                ['2022-03-06T03:00:00Z', '00'],
                ['2022-03-06T00:00:00Z', '00'],
                ['2022-03-06T23:59:59Z', '59'],
                ['2022-03-06T00:30:45+02:00', '30'],
                ['2022-03-06T23:30:45-07:00', '30'],
            ]) {
                assert.equal(format(new Date(el[0]), 'mm'), el[1]);
                assert.equal(format(el[0], 'mm'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'mm', 'en', 'Europe/Paris'), '30');
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'mm', 'en', 'America/New_York'), '30');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 'mm', 'en', 'UTC'), '30');
            assert.equal(format(new Date('2022-03-06T23:30:45-07:00'), 'mm', 'en', 'UTC'), '30');
            assert.equal(format(new Date('2022-03-06T00:30:45+05:30'), 'mm', 'en', 'Europe/Brussels'), '00'); /* Eg: India: UTC +5:30 */
            assert.equal(format('2022-03-06T08:30:45Z', 'mm', 'en', 'Europe/Paris'), '30');
            assert.equal(format('2022-03-06T08:30:45Z', 'mm', 'en', 'America/New_York'), '30');
            assert.equal(format('2022-03-06T00:30:45+02:00', 'mm', 'en', 'UTC'), '30');
            assert.equal(format('2022-03-06T23:30:45-07:00', 'mm', 'en', 'UTC'), '30');
            assert.equal(format('2022-03-06T00:30:45+05:30', 'mm', 'en', 'Europe/Brussels'), '00'); /* Eg: India: UTC +5:30 */
        });
    });

    describe('token:m', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2022-03-06T08:30:45Z', '30'],
                ['2022-03-06T12:45:00Z', '45'],
                ['2022-03-06T19:15:30Z', '15'],
                ['2022-03-06T03:00:00Z', '0'],
                ['2022-03-06T00:00:00Z', '0'],
                ['2022-03-06T23:59:59Z', '59'],
                ['2022-03-06T00:30:45+02:00', '30'],
                ['2022-03-06T23:30:45-07:00', '30'],
            ]) {
                assert.equal(format(new Date(el[0]), 'm'), el[1]);
                assert.equal(format(el[0], 'm'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'm', 'en', 'Europe/Paris'), '30');
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'm', 'en', 'America/New_York'), '30');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 'm', 'en', 'UTC'), '30');
            assert.equal(format(new Date('2022-03-06T23:30:45-07:00'), 'm', 'en', 'UTC'), '30');
            assert.equal(format('2022-03-06T08:30:45Z', 'm', 'en', 'Europe/Paris'), '30');
            assert.equal(format('2022-03-06T08:30:45Z', 'm', 'en', 'America/New_York'), '30');
            assert.equal(format('2022-03-06T00:30:45+02:00', 'm', 'en', 'UTC'), '30');
            assert.equal(format('2022-03-06T23:30:45-07:00', 'm', 'en', 'UTC'), '30');
        });
    });

    describe('token:ss', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2022-03-06T08:30:45Z', '45'],
                ['2022-03-06T12:45:30Z', '30'],
                ['2022-03-06T19:15:00Z', '00'],
                ['2022-03-06T03:00:15Z', '15'],
                ['2022-03-06T00:00:59Z', '59'],
                ['2022-03-06T23:59:00Z', '00'],
                ['2022-03-06T00:30:45+02:00', '45'],
                ['2022-03-06T23:30:15-07:00', '15'],
            ]) {
                assert.equal(format(new Date(el[0]), 'ss'), el[1]);
                assert.equal(format(el[0], 'ss'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'ss', 'en', 'Europe/Paris'), '45');
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'ss', 'en', 'America/New_York'), '45');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 'ss', 'en', 'UTC'), '45');
            assert.equal(format(new Date('2022-03-06T23:30:15-07:00'), 'ss', 'en', 'UTC'), '15');
            assert.equal(format('2022-03-06T08:30:45Z', 'ss', 'en', 'Europe/Paris'), '45');
            assert.equal(format('2022-03-06T08:30:45Z', 'ss', 'en', 'America/New_York'), '45');
            assert.equal(format('2022-03-06T00:30:45+02:00', 'ss', 'en', 'UTC'), '45');
            assert.equal(format('2022-03-06T23:30:15-07:00', 'ss', 'en', 'UTC'), '15');
        });
    });

    describe('token:s', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2022-03-06T08:30:45Z', '45'],
                ['2022-03-06T12:45:30Z', '30'],
                ['2022-03-06T19:15:00Z', '0'],
                ['2022-03-06T03:00:15Z', '15'],
                ['2022-03-06T00:00:59Z', '59'],
                ['2022-03-06T23:59:00Z', '0'],
                ['2022-03-06T00:30:45+02:00', '45'],
                ['2022-03-06T23:30:15-07:00', '15'],
            ]) {
                assert.equal(format(new Date(el[0]), 's'), el[1]);
                assert.equal(format(el[0], 's'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 's', 'en', 'Europe/Paris'), '45');
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 's', 'en', 'America/New_York'), '45');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 's', 'en', 'UTC'), '45');
            assert.equal(format(new Date('2022-03-06T23:30:15-07:00'), 's', 'en', 'UTC'), '15');
            assert.equal(format('2022-03-06T08:30:45Z', 's', 'en', 'Europe/Paris'), '45');
            assert.equal(format('2022-03-06T08:30:45Z', 's', 'en', 'America/New_York'), '45');
            assert.equal(format('2022-03-06T00:30:45+02:00', 's', 'en', 'UTC'), '45');
            assert.equal(format('2022-03-06T23:30:15-07:00', 's', 'en', 'UTC'), '15');
        });
    });

    describe('token:SSS', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2022-03-06T08:30:45Z', '000'],
                ['2022-03-06T12:45:30.123Z', '123'],
                ['2022-03-06T19:15:00.999Z', '999'],
                ['2022-03-06T03:00:15Z', '000'],
                ['2022-03-06T00:00:59.456Z', '456'],
                ['2022-03-06T23:59:00.789Z', '789'],
                ['2022-03-06T00:30:45.987+02:00', '987'],
                ['2022-03-06T23:30:15.001-07:00', '001'],
            ]) {
                assert.equal(format(new Date(el[0]), 'SSS'), el[1]);
                assert.equal(format(el[0], 'SSS'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'SSS', 'en', 'Europe/Paris'), '000');
            assert.equal(format(new Date('2022-03-06T08:30:45.010Z'), 'SSS', 'en', 'Europe/Paris'), '010');
            assert.equal(format(new Date('2022-03-06T08:30:45.123Z'), 'SSS', 'en', 'America/New_York'), '123');
            assert.equal(format(new Date('2022-03-06T00:30:45.987+02:00'), 'SSS', 'en', 'UTC'), '987');
            assert.equal(format(new Date('2022-03-06T23:30:15.001-07:00'), 'SSS', 'en', 'UTC'), '001');
            assert.equal(format('2022-03-06T08:30:45Z', 'SSS', 'en', 'Europe/Paris'), '000');
            assert.equal(format('2022-03-06T08:30:45.123Z', 'SSS', 'en', 'America/New_York'), '123');
            assert.equal(format('2022-03-06T00:30:45.987+02:00', 'SSS', 'en', 'UTC'), '987');
            assert.equal(format('2022-03-06T23:30:15.001-07:00', 'SSS', 'en', 'UTC'), '001');
        });
    });

    describe('token:A', () => {
        it('Should be correct', () => {
            for (const el of [
                ['2022-03-06T08:30:45Z', 'AM'],
                ['2022-03-06T12:45:00Z', 'PM'],
                ['2022-03-06T19:15:30Z', 'PM'],
                ['2022-03-06T03:00:00Z', 'AM'],
                ['2022-03-06T00:00:00Z', 'AM'],
                ['2022-03-06T23:59:59Z', 'AM'],
                ['2022-03-06T00:30:45+02:00', 'PM'],
                ['2022-03-06T23:30:45-07:00', 'AM'],
            ]) {
                assert.equal(format(new Date(el[0]), 'A'), el[1]);
                assert.equal(format(el[0], 'A'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'A', 'en', 'Europe/Paris'), 'AM');
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'A', 'en', 'America/New_York'), 'AM');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 'A', 'en', 'UTC'), 'PM');
            assert.equal(format(new Date('2022-03-06T23:30:45-07:00'), 'A', 'en', 'UTC'), 'AM');
            assert.equal(format('2022-03-06T08:30:45Z', 'A', 'en', 'Europe/Paris'), 'AM');
            assert.equal(format('2022-03-06T08:30:45Z', 'A', 'en', 'America/New_York'), 'AM');
            assert.equal(format('2022-03-06T00:30:45+02:00', 'A', 'en', 'UTC'), 'PM');
            assert.equal(format('2022-03-06T23:30:45-07:00', 'A', 'en', 'UTC'), 'AM');
        });
    });

    describe('token:a', () => {
        it('Should be correct', () => {
            for (const el of [
                [new Date('2022-03-06T08:30:45Z'), 'am'],
                [new Date('2022-03-06T12:45:00Z'), 'pm'],
                [new Date('2022-03-06T19:15:30Z'), 'pm'],
                [new Date('2022-03-06T03:00:00Z'), 'am'],
                [new Date('2022-03-06T00:00:00Z'), 'am'],
                [new Date('2022-03-06T23:59:59Z'), 'am'],
                [new Date('2022-03-06T00:30:45+02:00'), 'pm'],
                [new Date('2022-03-06T23:30:45-07:00'), 'am'],
            ]) {
                assert.equal(format(new Date(el[0]), 'a'), el[1]);
                assert.equal(format(el[0], 'a'), el[1]);
            }
        });

        it('Should take zone into account', () => {
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'a', 'en', 'Europe/Paris'), 'am');
            assert.equal(format(new Date('2022-03-06T08:30:45Z'), 'a', 'en', 'America/New_York'), 'am');
            assert.equal(format(new Date('2022-03-06T00:30:45+02:00'), 'a', 'en', 'UTC'), 'pm');
            assert.equal(format(new Date('2022-03-06T23:30:45-07:00'), 'a', 'en', 'UTC'), 'am');
            assert.equal(format('2022-03-06T08:30:45Z', 'a', 'en', 'Europe/Paris'), 'am');
            assert.equal(format('2022-03-06T08:30:45Z', 'a', 'en', 'America/New_York'), 'am');
            assert.equal(format('2022-03-06T00:30:45+02:00', 'a', 'en', 'UTC'), 'pm');
            assert.equal(format('2022-03-06T23:30:45-07:00', 'a', 'en', 'UTC'), 'am');
        });
    });

    describe('token:l', () => {
        it('Should format the date correctly in different locales', () => {
            for (const el of [
                {d: '2024-07-15T10:28:00Z', o: '15/07/2024', locale: 'nl-BE'},
                {d: '2024-07-15T10:28:00Z', o: '7/15/24', locale: 'en-US'},
                {d: '2023-12-25T00:00:00Z', o: '25.12.23', locale: 'de-DE'},
                {d: '2023-12-25T00:00:00Z', o: '25/12/2023', locale: 'fr-FR'},
                {d: '2022-01-01T12:00:00Z', o: '1/1/22', locale: 'es-ES'},
                {d: '2023-03-17T17:30:00Z', o: '17/03/23', locale: 'it-IT'},
                {d: '2024-11-23T08:45:00Z', o: '23/11/2024', locale: 'pt-BR'},
                {d: '2022-06-30T20:15:00Z', o: '30-06-2022', locale: 'nl-NL'},
            ]) {
                assert.equal(format(new Date(el.d), 'l', el.locale), el.o);
                assert.equal(format(el.d, 'l', el.locale), el.o);
            }
        });
    });

    describe('token:L', () => {
        it('Should format the date correctly in different locales', () => {
            for (const el of [
                {d: '2024-07-15T00:00:00Z', o: '15 jul 2024', locale: 'nl-BE'},
                {d: '2024-07-15T00:00:00Z', o: 'Jul 15, 2024', locale: 'en-US'},
                {d: '2023-12-25T00:00:00Z', o: '25 déc. 2023', locale: 'fr-BE'},
                {d: '2022-01-01T00:00:00Z', o: '1 ene 2022', locale: 'es-ES'},
                {d: '2023-03-17T00:00:00Z', o: '17 mar 2023', locale: 'it-IT'},
                {d: '2024-11-23T00:00:00Z', o: '23 de nov. de 2024', locale: 'pt-BR'},
                {d: '2022-06-30T00:00:00Z', o: '30 jun 2022', locale: 'nl-NL'},
                {d: '2024-04-05T00:00:00Z', o: '5 Apr 2024', locale: 'en-GB'},
                {d: '2023-11-11T00:00:00Z', o: '11 nov 2023', locale: 'it-CH'},
            ]) {
                assert.equal(format(new Date(el.d), 'L', el.locale), el.o);
                assert.equal(format(el.d, 'L', el.locale), el.o);
            }
        });
    });

    describe('token:t', () => {
        it('Should format the time correctly in different locales', () => {
            for (const el of [
                {d: '2024-07-15T10:28:00Z', o: '10:28', locale: 'nl-BE'},
                {d: '2024-07-15T10:28:00Z', o: '10:28 AM', locale: 'en-US'},
                {d: '2023-12-25T14:45:00Z', o: '14:45', locale: 'de-DE'},
                {d: '2023-12-25T22:10:00Z', o: '22:10', locale: 'fr-FR'},
                {d: '2022-01-01T06:30:00Z', o: '6:30', locale: 'es-ES'},
                {d: '2023-03-17T23:59:00Z', o: '23:59', locale: 'it-IT'},
                {d: '2024-11-23T16:20:00Z', o: '16:20', locale: 'pt-BR'},
                {d: '2022-06-30T11:05:00Z', o: '11:05', locale: 'nl-NL'},
            ]) {
                assert.equal(format(new Date(el.d), 't', el.locale, 'UTC'), el.o);
                assert.equal(format(el.d, 't', el.locale, 'UTC'), el.o);
            }
        });
    });

    describe('token:T', () => {
        it('Should format the time with seconds correctly in different locales', () => {
            for (const el of [
                {d: '2024-07-15T10:28:30Z', o: '10:28:30', locale: 'nl-BE'},
                {d: '2024-07-15T10:28:30Z', o: '10:28:30 AM', locale: 'en-US'},
                {d: '2023-12-25T14:45:59Z', o: '14:45:59', locale: 'de-DE'},
                {d: '2023-12-25T22:10:15Z', o: '22:10:15', locale: 'fr-FR'},
                {d: '2022-01-01T06:30:45Z', o: '6:30:45', locale: 'es-ES'},
                {d: '2023-03-17T23:59:59Z', o: '23:59:59', locale: 'it-IT'},
                {d: '2024-11-23T16:20:20Z', o: '16:20:20', locale: 'pt-BR'},
                {d: '2022-06-30T11:05:10Z', o: '11:05:10', locale: 'nl-NL'},
            ]) {
                assert.equal(format(new Date(el.d), 'T', el.locale, 'UTC'), el.o);
                assert.equal(format(el.d, 'T', el.locale, 'UTC'), el.o);
            }
        });
    });
});
