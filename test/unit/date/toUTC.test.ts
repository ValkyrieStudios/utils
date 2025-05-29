import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import toUTC from '../../../lib/date/toUTC';

describe('Date - toUTC', () => {
    it('Throw when passed a non-date for var', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            expect(() => toUTC(el)).toThrowError(new TypeError('toUTC requires a date object'));
        }
    });

    it('Return a date in UTC', () => {
        const date = new Date('2023-05-01T12:04:27+02:00');
        expect(toUTC(date)).toEqual(new Date('2023-05-01T10:04:27+00:00'));
        expect(toUTC(date).toISOString()).toBe('2023-05-01T10:04:27.000Z');
        expect(date.toJSON()).toBe('2023-05-01T10:04:27.000Z');
    });

    it('Not touch on the passed date', () => {
        const date = new Date('14 Jun 2017 00:00:00 PDT');
        const utc_date = toUTC(date);
        expect(utc_date.toJSON()).toBe('2017-06-14T07:00:00.000Z');

        date.setHours(20);
        expect(date.toJSON()).toBe('2017-06-14T18:00:00.000Z');
        expect(utc_date.toJSON()).toBe('2017-06-14T07:00:00.000Z');
    });
});
