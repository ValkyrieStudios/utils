import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import setTimeUTC from '../../../lib/date/setTimeUTC';

describe('Date - setTimeUTC', () => {
    it('Throw when passed a non-date for var', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            expect(
                () => setTimeUTC(el, {hour: 10})
            ).toThrowError(/setTimeUTC requires a date object/);
        }
    });

    describe('dateObject', () => {
        it('Should return the same date if passed empty props', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            /* @ts-ignore */
            expect(setTimeUTC(date)).toEqual(date);
        });

        it('Should correctly set a combination of parameters', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            const out = setTimeUTC(date, {
                hour: 9,
                minute: 30,
                second: 24,
                millisecond: 567,
            });
            expect(out).toEqual(new Date('2022-10-05T09:30:24.567Z'));
        });

        it('Should correctly set a combination of parameters and not set invalid ones', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            const out = setTimeUTC(date, {
                /* @ts-ignore */
                hour: false,
                minute: 30,
                /* @ts-ignore */
                second: true,
                millisecond: 567,
            });
            expect(out).toEqual(new Date('2022-10-05T13:30:11.567+02:00'));
        });

        describe('hour', () => {
            it('Should correctly set', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (let i = 0; i <= 23; i++) {
                    expect(setTimeUTC(date, {hour: i}).getUTCHours()).toEqual(i);
                }
            });

            it('Should not set if passed a non-integer value', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of CONSTANTS.NOT_INTEGER) {
                    expect(setTimeUTC(date, {hour: el}).getUTCHours()).toEqual(11);
                }
            });

            it('Should not set if passed a below zero value', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of [-1, -2, -19]) {
                    expect(setTimeUTC(date, {hour: el}).getUTCHours()).toEqual(11);
                }
            });

            it('Should not set if passed a value above 23', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of [24, 99, 100]) {
                    expect(setTimeUTC(date, {hour: el}).getUTCHours()).toEqual(11);
                }
            });
        });

        describe('minute', () => {
            it('Should correctly set', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (let i = 0; i <= 59; i++) {
                    expect(setTimeUTC(date, {minute: i}).getUTCMinutes()).toEqual(i);
                }
            });

            it('Should not set if passed a non-integer value', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of CONSTANTS.NOT_INTEGER) {
                    expect(setTimeUTC(date, {minute: el}).getUTCMinutes()).toEqual(12);
                }
            });

            it('Should not set if passed a below zero value', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of [-1, -2, -19]) {
                    expect(setTimeUTC(date, {minute: el}).getUTCMinutes()).toEqual(12);
                }
            });

            it('Should not set if passed a value above 59', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of [60, 62, 919]) {
                    expect(setTimeUTC(date, {minute: el}).getUTCMinutes()).toEqual(12);
                }
            });
        });

        describe('second', () => {
            it('Should correctly set', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (let i = 0; i <= 59; i++) {
                    expect(setTimeUTC(date, {second: i}).getUTCSeconds()).toEqual(i);
                }
            });

            it('Should not set if passed a non-integer value', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of CONSTANTS.NOT_INTEGER) {
                    expect(setTimeUTC(date, {second: el}).getUTCSeconds()).toEqual(11);
                }
            });

            it('Should not set if passed a below zero value', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of [-1, -2, -19]) {
                    expect(setTimeUTC(date, {second: el}).getUTCSeconds()).toEqual(11);
                }
            });

            it('Should not set if passed a value above 59', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of [60, 62, 919]) {
                    expect(setTimeUTC(date, {second: el}).getUTCSeconds()).toEqual(11);
                }
            });
        });

        describe('millisecond', () => {
            it('Should correctly set', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (let i = 0; i <= 999; i++) {
                    expect(setTimeUTC(date, {millisecond: i}).getUTCMilliseconds()).toEqual(i);
                }
            });

            it('Should not set if passed a non-integer value', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of CONSTANTS.NOT_INTEGER) {
                    expect(setTimeUTC(date, {millisecond: el}).getUTCMilliseconds()).toEqual(0);
                }
            });

            it('Should not set if passed a below zero value', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of [-1, -2, -19]) {
                    expect(setTimeUTC(date, {millisecond: el}).getUTCMilliseconds()).toEqual(0);
                }
            });

            it('Should not set if passed a value above 999', () => {
                const date = new Date('2022-10-05T13:12:11+02:00');
                for (const el of [1000, 10002, 1919]) {
                    expect(setTimeUTC(date, {millisecond: el}).getUTCMilliseconds()).toEqual(0);
                }
            });
        });
    });

    describe('dateString', () => {
        it('Should return the same date if passed empty props', () => {
            const date = '2022-10-05T13:12:11+02:00';
            /* @ts-ignore */
            expect(setTimeUTC(date)).toEqual(new Date(date));
        });

        it('Should correctly set a combination of parameters', () => {
            const date = '2022-10-05T13:12:11+02:00';
            const out = setTimeUTC(date, {
                hour: 9,
                minute: 30,
                second: 24,
                millisecond: 567,
            });
            expect(out).toEqual(new Date('2022-10-05T09:30:24.567Z'));
        });

        it('Should correctly set a combination of parameters and not set invalid ones', () => {
            const date = '2022-10-05T13:12:11+02:00';
            const out = setTimeUTC(date, {
                /* @ts-ignore */
                hour: false,
                minute: 30,
                /* @ts-ignore */
                second: true,
                millisecond: 567,
            });
            expect(out).toEqual(new Date('2022-10-05T13:30:11.567+02:00'));
        });

        describe('hour', () => {
            it('Should correctly set', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (let i = 0; i <= 23; i++) {
                    expect(setTimeUTC(date, {hour: i}).getUTCHours()).toEqual(i);
                }
            });

            it('Should not set if passed a non-integer value', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of CONSTANTS.NOT_INTEGER) {
                    expect(setTimeUTC(date, {hour: el}).getUTCHours()).toEqual(11);
                }
            });

            it('Should not set if passed a below zero value', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of [-1, -2, -19]) {
                    expect(setTimeUTC(date, {hour: el}).getUTCHours()).toEqual(11);
                }
            });

            it('Should not set if passed a value above 23', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of [24, 99, 100]) {
                    expect(setTimeUTC(date, {hour: el}).getUTCHours()).toEqual(11);
                }
            });
        });

        describe('minute', () => {
            it('Should correctly set', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (let i = 0; i <= 59; i++) {
                    expect(setTimeUTC(date, {minute: i}).getUTCMinutes()).toEqual(i);
                }
            });

            it('Should not set if passed a non-integer value', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of CONSTANTS.NOT_INTEGER) {
                    expect(setTimeUTC(date, {minute: el}).getUTCMinutes()).toEqual(12);
                }
            });

            it('Should not set if passed a below zero value', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of [-1, -2, -19]) {
                    expect(setTimeUTC(date, {minute: el}).getUTCMinutes()).toEqual(12);
                }
            });

            it('Should not set if passed a value above 59', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of [60, 62, 919]) {
                    expect(setTimeUTC(date, {minute: el}).getUTCMinutes()).toEqual(12);
                }
            });
        });

        describe('second', () => {
            it('Should correctly set', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (let i = 0; i <= 59; i++) {
                    expect(setTimeUTC(date, {second: i}).getUTCSeconds()).toEqual(i);
                }
            });

            it('Should not set if passed a non-integer value', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of CONSTANTS.NOT_INTEGER) {
                    expect(setTimeUTC(date, {second: el}).getUTCSeconds()).toEqual(11);
                }
            });

            it('Should not set if passed a below zero value', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of [-1, -2, -19]) {
                    expect(setTimeUTC(date, {second: el}).getUTCSeconds()).toEqual(11);
                }
            });

            it('Should not set if passed a value above 59', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of [60, 62, 919]) {
                    expect(setTimeUTC(date, {second: el}).getUTCSeconds()).toEqual(11);
                }
            });
        });

        describe('millisecond', () => {
            it('Should correctly set', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (let i = 0; i <= 999; i++) {
                    expect(setTimeUTC(date, {millisecond: i}).getUTCMilliseconds()).toEqual(i);
                }
            });

            it('Should not set if passed a non-integer value', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of CONSTANTS.NOT_INTEGER) {
                    expect(setTimeUTC(date, {millisecond: el}).getUTCMilliseconds()).toEqual(0);
                }
            });

            it('Should not set if passed a below zero value', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of [-1, -2, -19]) {
                    expect(setTimeUTC(date, {millisecond: el}).getUTCMilliseconds()).toEqual(0);
                }
            });

            it('Should not set if passed a value above 999', () => {
                const date = '2022-10-05T13:12:11+02:00';
                for (const el of [1000, 10002, 1919]) {
                    expect(setTimeUTC(date, {millisecond: el}).getUTCMilliseconds()).toEqual(0);
                }
            });
        });
    });
});
