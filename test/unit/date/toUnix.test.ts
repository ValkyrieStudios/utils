import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import toUnix from '../../../lib/date/toUnix';

describe('Date - toUnix', () => {
    it('Throw when passed a non-date for var', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            expect(() => toUnix(el)).toThrowError(new TypeError('toUnix requires a date object'));
        }
    });

    it('Return a date in unix as seconds', () => {
        const date = new Date('2023-05-01T12:04:27+02:00');
        expect(toUnix(date)).toBe(1682935467);

        const date2 = new Date('2023-05-01T10:04:27.000Z');
        expect(toUnix(date2)).toBe(1682935467);
    });

    it('Not touch on the passed date', () => {
        const date = new Date('14 Jun 2017 00:00:00 PDT');
        expect(toUnix(date)).toBe(1497423600);

        date.setHours(20);
        expect(toUnix(date)).toBe(1497463200);
        expect(date.toJSON()).toBe('2017-06-14T18:00:00.000Z');
    });
});
