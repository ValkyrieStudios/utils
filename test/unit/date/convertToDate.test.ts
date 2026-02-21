import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import convertToDate from '../../../lib/date/convertToDate';

describe('Date - convertToDate', () => {
    it('Return null when passing nothing', () => {
        // @ts-ignore
        expect(convertToDate()).toBeNull();
    });

    it('Return null when passed a non date value', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            if (Number.isFinite(el)) continue;
            expect(convertToDate(el)).toBeNull();
        }
    });

    it('Return the date when passed a date value', () => {
        for (const el of CONSTANTS.IS_DATE) {
            expect(convertToDate(el)).toEqual(el);
        }
    });

    it('Return the date when passed a date string value', () => {
        const testDates = [
            '2019-02-01T05:20:19+02:00',
            '2019-02-02T05:20:19+02:00',
            '2019-02-03T05:20:19+02:00',
            '2019-02-04T05:20:19+02:00',
            '2019-02-05T05:20:19+02:00',
            '2019-02-06T05:20:19+02:00',
            '2019-02-07T05:20:19+02:00',
            '2019-02-08T05:20:19+02:00',
            '2019-02-09T05:20:19+02:00',
            '2019-02-10T05:20:19+02:00',
            '2019-02-11T05:20:19+02:00',
            '2019-02-12T05:20:19+02:00',
            '2019-02-13T05:20:19+02:00',
            '2019-02-14T05:20:19+02:00',
            '2019-02-15T05:20:19+02:00',
            '2019-02-16T05:20:19+02:00',
            '2019-02-17T05:20:19+02:00',
            '2019-02-18T05:20:19+02:00',
            '2019-02-19T05:20:19+02:00',
            '2019-02-20T05:20:19+02:00',
            '2019-02-21T05:20:19+02:00',
            '2019-02-22T05:20:19+02:00',
            '2019-02-23T05:20:19+02:00',
            '2019-02-24T05:20:19+02:00',
            '2019-02-25T05:20:19+02:00',
            '2019-02-26T05:20:19+02:00',
            '2019-02-27T05:20:19+02:00',
            '2019-02-28T05:20:19+02:00',
            '2019-02-29T05:20:19+02:00',
            '2024-02-29T05:20:19+02:00',
            '2007-12-31T23:59:59+02:00',
            '2007-12-31T23:59:59-02:00',
            '2023-04-23T12:23:34',
            '2023-08-23T12:23:34',
            '2009-10-01T08:40:42',
            '2023-09-23T12:23:34',
            '2023-11-05T23:23:34',
        ];

        for (const el of testDates) {
            expect(convertToDate(el)).toEqual(new Date(el));
        }
    });

    it('Return null when passed an invalid date string', () => {
        // This tests your `d.getTime() === d.getTime()` check for strings
        expect(convertToDate('not-a-valid-date')).toBeNull();
        expect(convertToDate('2023-13-45T25:99:99')).toBeNull();
    });

    it('Return the date when passed a valid number (unix timestamp)', () => {
        const testTimestamps = [
            0, // Epoch start
            1682899200000, // Recent date
            -1682899200000, // Past date
        ];

        for (const el of testTimestamps) {
            expect(convertToDate(el)).toEqual(new Date(el));
        }
    });

    it('Return null when passed NaN or out-of-bounds numbers', () => {
        expect(convertToDate(NaN)).toBeNull();

        // JS Dates max out at exactly 8,640,000,000,000,000 milliseconds from epoch
        const MAX_DATE_MS = 8.64e15;
        expect(convertToDate(MAX_DATE_MS + 1)).toBeNull();
    });
});
