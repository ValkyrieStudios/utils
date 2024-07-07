import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import setTimeUTC       from '../../../lib/date/setTimeUTC';

describe('Date - setTimeUTC', () => {
    it('Throw when passed a non-date for var', () => {
        for (const el of CONSTANTS.NOT_DATE) {
            assert.throws(
                () => setTimeUTC(el, {hour: 10}),
                new TypeError('setTimeUTC requires a date object')
            );
        }
    });

    it('Should correctly set a combination of parameters', () => {
        const date = new Date('2022-10-05T13:12:11+02:00');
        const out = setTimeUTC(date, {
            hour: 9,
            minute: 30,
            second: 24,
            millisecond: 567,
        });
        assert.deepEqual(out, new Date('2022-10-05T09:30:24.567Z'));
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
        assert.deepEqual(out, new Date('2022-10-05T13:30:11.567+02:00'));
    });

    describe('hour', () => {
        it('Should correctly set', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (let i = 0; i <= 23; i++) {
                assert.deepEqual(setTimeUTC(date, {hour: i}).getUTCHours(), i);
            }
        });

        it('Should not set if passed a non-integer value', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of CONSTANTS.NOT_INTEGER) {
                assert.deepEqual(setTimeUTC(date, {hour: el}).getUTCHours(), 11);
            }
        });

        it('Should not set if passed a below zero value', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of [-1, -2, -19]) {
                assert.deepEqual(setTimeUTC(date, {hour: el}).getUTCHours(), 11);
            }
        });

        it('Should not set if passed a value above 23', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of [24, 99, 100]) {
                assert.deepEqual(setTimeUTC(date, {hour: el}).getUTCHours(), 11);
            }
        });
    });

    describe('minute', () => {
        it('Should correctly set', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (let i = 0; i <= 59; i++) {
                assert.deepEqual(setTimeUTC(date, {minute: i}).getUTCMinutes(), i);
            }
        });

        it('Should not set if passed a non-integer value', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of CONSTANTS.NOT_INTEGER) {
                assert.deepEqual(setTimeUTC(date, {minute: el}).getUTCMinutes(), 12);
            }
        });

        it('Should not set if passed a below zero value', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of [-1, -2, -19]) {
                assert.deepEqual(setTimeUTC(date, {minute: el}).getUTCMinutes(), 12);
            }
        });

        it('Should not set if passed a value above 59', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of [60, 62, 919]) {
                assert.deepEqual(setTimeUTC(date, {minute: el}).getUTCMinutes(), 12);
            }
        });
    });

    describe('second', () => {
        it('Should correctly set', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (let i = 0; i <= 59; i++) {
                assert.deepEqual(setTimeUTC(date, {second: i}).getUTCSeconds(), i);
            }
        });

        it('Should not set if passed a non-integer value', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of CONSTANTS.NOT_INTEGER) {
                assert.deepEqual(setTimeUTC(date, {second: el}).getUTCSeconds(), 11);
            }
        });

        it('Should not set if passed a below zero value', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of [-1, -2, -19]) {
                assert.deepEqual(setTimeUTC(date, {second: el}).getUTCSeconds(), 11);
            }
        });

        it('Should not set if passed a value above 59', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of [60, 62, 919]) {
                assert.deepEqual(setTimeUTC(date, {second: el}).getUTCSeconds(), 11);
            }
        });
    });

    describe('millisecond', () => {
        it('Should correctly set', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (let i = 0; i <= 999; i++) {
                assert.deepEqual(setTimeUTC(date, {millisecond: i}).getUTCMilliseconds(), i);
            }
        });

        it('Should not set if passed a non-integer value', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of CONSTANTS.NOT_INTEGER) {
                assert.deepEqual(setTimeUTC(date, {millisecond: el}).getUTCMilliseconds(), 0);
            }
        });

        it('Should not set if passed a below zero value', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of [-1, -2, -19]) {
                assert.deepEqual(setTimeUTC(date, {millisecond: el}).getUTCMilliseconds(), 0);
            }
        });

        it('Should not set if passed a value above 999', () => {
            const date = new Date('2022-10-05T13:12:11+02:00');
            for (const el of [1000, 10002, 1919]) {
                assert.deepEqual(setTimeUTC(date, {millisecond: el}).getUTCMilliseconds(), 0);
            }
        });
    });
});
